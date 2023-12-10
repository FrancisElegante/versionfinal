import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, collectionData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Obtener mensajes de una conversación específica
  getMessages(conversationId: string): Observable<any[]> {
    const user = this.auth.currentUser;
    const messagesRef = collection(this.firestore, `usuarios/${user!.uid}/mensajes/${conversationId}/mensajes`);
    return collectionData(messagesRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Enviar un nuevo mensaje
  async sendMessage(conversationId: string, message: any): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const messageRef = collection(this.firestore, `usuarios/${user.uid}/mensajes/${conversationId}/mensajes`);
      await addDoc(messageRef, { ...message, senderId: user.uid });
    }
  }

  iniciarConversacion(conversationId: string): void {
    // Puedes realizar acciones adicionales aquí si es necesario antes de iniciar la conversación
    console.log(`Iniciando conversación con ID: ${conversationId}`);
  }
}