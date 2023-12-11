export interface Message {
    id: string;
    text: string;
    timestamp: any;
    senderId: string;
    isRead?: boolean;
  }