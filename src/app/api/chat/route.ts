import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { Message, MAX_MESSAGE_LENGTH } from "@/types/chat";

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json();

    // Validación de entrada
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Mensajes inválidos" },
        { status: 400 }
      );
    }

    // Obtener el último mensaje del usuario
    const lastUserMessage = messages
      .filter((m: Message) => m.role === "user")
      .pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No se encontró mensaje del usuario" },
        { status: 400 }
      );
    }

    // Validar longitud del mensaje
    if (lastUserMessage.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: `El mensaje excede el límite de ${MAX_MESSAGE_LENGTH} caracteres. Tu mensaje tiene ${lastUserMessage.content.length} caracteres.`,
        },
        { status: 400 }
      );
    }

    // Configurar el modelo
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: systemPrompt,
    });

    // Convertir historial de mensajes al formato de Gemini
    // Excluir el último mensaje y mensajes compactados
    let historyMessages = messages
      .slice(0, -1)
      .filter((m: Message) => !m.isCompacted);

    // Si el primer mensaje es del asistente (mensaje de bienvenida), omitirlo
    // porque Gemini requiere que el historial comience con un mensaje del usuario
    if (historyMessages.length > 0 && historyMessages[0].role === "assistant") {
      historyMessages = historyMessages.slice(1);
    }

    const history = historyMessages.map((msg: Message) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Iniciar chat con historial
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Enviar el último mensaje con streaming
    const result = await chat.sendMessageStream(lastUserMessage.content);

    // Crear un stream para el cliente
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error en API de chat:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al procesar el mensaje",
      },
      { status: 500 }
    );
  }
}
