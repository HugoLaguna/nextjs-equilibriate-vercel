export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isCompacted?: boolean;
}

export interface CompactedBlock {
  id: string;
  messageCount: number;
  summary: string;
  originalMessages: Message[];
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  compactedBlocks: CompactedBlock[];
  createdAt: Date;
  updatedAt: Date;
  systemPrompt: string;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
}

export const MAX_MESSAGE_LENGTH = 450;
export const COMPACTION_THRESHOLD = 15;
export const MAX_MESSAGES = 100;
