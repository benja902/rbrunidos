import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres asesor experto de RBR Cúpulas Geodésicas en Perú.
Recomienda domos según:
- número de personas
- tipo de uso
- clima o ubicación
No inventes precios.
Si falta info, haz máximo 2 preguntas.
Formato:
1) Recomendación
2) Justificación
3) Siguiente paso.`;

// Simple in-memory rate limit: max 20 requests per IP por ventana de 1 minuto
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting por IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta en un momento." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Validaciones de entrada
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
    }
    if (messages.length > 40) {
      return NextResponse.json(
        { error: "Historial demasiado largo" },
        { status: 400 }
      );
    }
    for (const msg of messages) {
      if (!["user", "assistant"].includes(msg.role)) {
        return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
      }
      if (typeof msg.content !== "string" || msg.content.length > 2000) {
        return NextResponse.json(
          { error: "Mensaje demasiado largo" },
          { status: 400 }
        );
      }
    }

    const token = process.env.GITHUB_MODELS_TOKEN;
    const model = process.env.GITHUB_MODELS_MODEL || "openai/gpt-4o-mini";

    if (!token) {
      return NextResponse.json(
        { error: "Token no configurado" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 600,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub Models error:", errorText);
      return NextResponse.json(
        { error: "Error al contactar la IA" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
