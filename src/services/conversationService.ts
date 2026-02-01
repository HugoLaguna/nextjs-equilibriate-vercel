import { Conversation, ChatState, Message, MAX_MESSAGES } from "@/types/chat";
import { compactMessages } from "@/lib/messageCompaction";
import { ASSISTANT_PROMPT } from "@/data/prompts";

const STORAGE_KEY = "equilibriate-chat-state";

// Convertir fechas de strings a Date al cargar
function reviveDates(state: ChatState): ChatState {
  return {
    ...state,
    conversations: state.conversations.map((conv) => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      updatedAt: new Date(conv.updatedAt),
      messages: conv.messages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
      compactedBlocks: conv.compactedBlocks.map((block) => ({
        ...block,
        timestamp: new Date(block.timestamp),
        originalMessages: block.originalMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      })),
    })),
  };
}

export function loadChatState(): ChatState {
  if (typeof window === "undefined") {
    return { conversations: [], activeConversationId: null };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { conversations: [], activeConversationId: null };
    }

    const parsed = JSON.parse(stored);
    return reviveDates(parsed);
  } catch (error) {
    console.error("Error loading chat state:", error);
    return { conversations: [], activeConversationId: null };
  }
}

export function saveChatState(state: ChatState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving chat state:", error);
  }
}

export function createNewConversation(title?: string): Conversation {
  const initialMessage: Message = {
    id: `msg-${Date.now()}`,
    role: "assistant",
    content:
      "¡Hola! Soy tu asistente de Celion. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros productos, ayudarte con tu pedido o darte recomendaciones personalizadas.",
    timestamp: new Date(),
  };

  return {
    id: `conv-${Date.now()}`,
    title: title || `Conversación ${new Date().toLocaleDateString()}`,
    messages: [initialMessage],
    compactedBlocks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    systemPrompt: ASSISTANT_PROMPT,
  };
}

export function addMessageToConversation(
  conversation: Conversation,
  message: Message
): Conversation {
  const updatedMessages = [...conversation.messages, message];

  // Verificar límite máximo de mensajes
  if (updatedMessages.length > MAX_MESSAGES) {
    throw new Error(
      `Se alcanzó el límite máximo de ${MAX_MESSAGES} mensajes en esta conversación.`
    );
  }

  // Verificar si es necesario compactar
  const { remainingMessages, newBlock } = compactMessages(
    updatedMessages,
    conversation.compactedBlocks
  );

  return {
    ...conversation,
    messages: newBlock ? remainingMessages : updatedMessages,
    compactedBlocks: newBlock
      ? [...conversation.compactedBlocks, newBlock]
      : conversation.compactedBlocks,
    updatedAt: new Date(),
  };
}

export function deleteConversation(
  state: ChatState,
  conversationId: string
): ChatState {
  const conversations = state.conversations.filter(
    (c) => c.id !== conversationId
  );

  return {
    conversations,
    activeConversationId:
      state.activeConversationId === conversationId
        ? conversations[0]?.id || null
        : state.activeConversationId,
  };
}

export function getActiveConversation(state: ChatState): Conversation | null {
  if (!state.activeConversationId) return null;

  return (
    state.conversations.find((c) => c.id === state.activeConversationId) || null
  );
}
