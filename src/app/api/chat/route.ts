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

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

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
