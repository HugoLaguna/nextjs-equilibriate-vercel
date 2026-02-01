import { Message, CompactedBlock, COMPACTION_THRESHOLD } from "@/types/chat";

export function shouldCompact(messages: Message[]): boolean {
  // Excluir el primer mensaje (mensaje inicial del asistente)
  const messagesWithoutInitial = messages.slice(1);
  return messagesWithoutInitial.length >= COMPACTION_THRESHOLD;
}

export function compactMessages(
  messages: Message[],
  existingBlocks: CompactedBlock[]
): { remainingMessages: Message[]; newBlock: CompactedBlock | null } {
  if (!shouldCompact(messages)) {
    return { remainingMessages: messages, newBlock: null };
  }

  // Mantener el primer mensaje (mensaje inicial)
  const initialMessage = messages[0];

  // Mensajes a compactar (excluir el inicial y los últimos 5 para mantener contexto reciente)
  const messagesToCompact = messages.slice(1, -5);
  const remainingMessages = [initialMessage, ...messages.slice(-5)];

  if (messagesToCompact.length === 0) {
    return { remainingMessages: messages, newBlock: null };
  }

  // Crear resumen del bloque compactado
  const summary = generateSummary(messagesToCompact);

  const newBlock: CompactedBlock = {
    id: `block-${Date.now()}`,
    messageCount: messagesToCompact.length,
    summary,
    originalMessages: messagesToCompact,
    timestamp: new Date(),
  };

  return { remainingMessages, newBlock };
}

function generateSummary(messages: Message[]): string {
  const userMessages = messages.filter((m) => m.role === "user").length;
  const assistantMessages = messages.filter((m) => m.role === "assistant").length;

  return `Bloque compactado: ${userMessages} mensajes de usuario y ${assistantMessages} respuestas del asistente`;
}

export function getActiveMessagesForAPI(
  messages: Message[],
  compactedBlocks: CompactedBlock[]
): Message[] {
  // Si hay bloques compactados, agregar un mensaje de contexto
  if (compactedBlocks.length > 0) {
    const contextMessage: Message = {
      id: "compaction-context",
      role: "assistant",
      content: `[Contexto de conversación anterior compactado: ${compactedBlocks.reduce((sum, block) => sum + block.messageCount, 0)} mensajes anteriores]`,
      timestamp: new Date(),
      isCompacted: true,
    };

    return [messages[0], contextMessage, ...messages.slice(1)];
  }

  return messages;
}
