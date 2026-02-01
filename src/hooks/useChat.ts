import { useState, useEffect, useCallback } from "react";
import {
  ChatState,
  Conversation,
  Message,
  MAX_MESSAGE_LENGTH,
} from "@/types/chat";
import {
  loadChatState,
  saveChatState,
  createNewConversation,
  addMessageToConversation,
  getActiveConversation,
} from "@/services/conversationService";
import { getActiveMessagesForAPI } from "@/lib/messageCompaction";

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    conversations: [],
    activeConversationId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar estado inicial
  useEffect(() => {
    const state = loadChatState();

    if (state.conversations.length === 0) {
      // Crear conversación inicial si no hay ninguna
      const newConv = createNewConversation();
      const newState = {
        conversations: [newConv],
        activeConversationId: newConv.id,
      };
      setChatState(newState);
      saveChatState(newState);
    } else {
      setChatState(state);
    }
  }, []);

  // Guardar estado cuando cambie
  useEffect(() => {
    if (chatState.conversations.length > 0) {
      saveChatState(chatState);
    }
  }, [chatState]);

  const activeConversation = getActiveConversation(chatState);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversation) {
        setError("No hay conversación activa");
        return;
      }

      // Validar longitud
      if (content.length > MAX_MESSAGE_LENGTH) {
        setError(
          `El mensaje excede el límite de ${MAX_MESSAGE_LENGTH} caracteres. Tu mensaje tiene ${content.length} caracteres.`
        );
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Crear mensaje del usuario
        const userMessage: Message = {
          id: `msg-${Date.now()}`,
          role: "user",
          content,
          timestamp: new Date(),
        };

        // Agregar mensaje del usuario a la conversación
        const updatedConv = addMessageToConversation(
          activeConversation,
          userMessage
        );

        // Actualizar estado localmente
        setChatState((prev) => ({
          ...prev,
          conversations: prev.conversations.map((c) =>
            c.id === updatedConv.id ? updatedConv : c
          ),
        }));

        // Obtener mensajes para enviar a la API
        const apiMessages = getActiveMessagesForAPI(
          updatedConv.messages,
          updatedConv.compactedBlocks
        );

        // Crear mensaje del asistente vacío
        const assistantMessageId = `msg-${Date.now() + 1}`;
        const assistantMessage: Message = {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        // Agregar mensaje vacío del asistente
        let streamingConv = addMessageToConversation(
          updatedConv,
          assistantMessage
        );

        setChatState((prev) => ({
          ...prev,
          conversations: prev.conversations.map((c) =>
            c.id === streamingConv.id ? streamingConv : c
          ),
        }));

        // Llamar a la API con streaming
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: apiMessages,
            systemPrompt: updatedConv.systemPrompt,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al enviar mensaje");
        }

        // Leer el stream
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";
        let buffer = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Actualizar con cualquier contenido restante en el buffer
              if (buffer) {
                fullContent += buffer;
                setChatState((prev) => ({
                  ...prev,
                  conversations: prev.conversations.map((conv) => {
                    if (conv.id !== streamingConv.id) return conv;

                    return {
                      ...conv,
                      messages: conv.messages.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: fullContent }
                          : msg
                      ),
                    };
                  }),
                }));
              }
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Procesar carácter por carácter con delay
            while (buffer.length > 0) {
              const char = buffer[0];
              buffer = buffer.slice(1);
              fullContent += char;

              // Actualizar el mensaje progresivamente
              setChatState((prev) => ({
                ...prev,
                conversations: prev.conversations.map((conv) => {
                  if (conv.id !== streamingConv.id) return conv;

                  return {
                    ...conv,
                    messages: conv.messages.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: fullContent }
                        : msg
                    ),
                  };
                }),
              }));

              // Delay de 20ms entre cada carácter
              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al enviar mensaje"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversation]
  );

  const createConversation = useCallback((title?: string) => {
    const newConv = createNewConversation(title);
    setChatState((prev) => ({
      conversations: [...prev.conversations, newConv],
      activeConversationId: newConv.id,
    }));
  }, []);

  const setActiveConversation = useCallback((conversationId: string) => {
    setChatState((prev) => ({
      ...prev,
      activeConversationId: conversationId,
    }));
  }, []);

  return {
    conversation: activeConversation,
    conversations: chatState.conversations,
    sendMessage,
    createConversation,
    setActiveConversation,
    isLoading,
    error,
  };
}
