import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, collectionData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  deleteDoc, setDoc, getDoc, DocumentData, DocumentSnapshot, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  constructor(private firestore: Firestore, private auth: Auth) { }

  private receiverId: string | null = null;

  // Método para establecer el receiverId
  setReceiverId(receiverId: string): void {
    this.receiverId = receiverId;
  }

  // Método para enviar mensajes
  async sendMessage(conversationId: string, message: any): Promise<void> {
    const user = this.auth.currentUser;
  
    if (user && this.receiverId) {
      const senderMessageRef = collection(this.firestore, `usuarios/${user.uid}/mensajes/${conversationId}/mensajes`);
      await addDoc(senderMessageRef, { ...message, senderId: user.uid, isRead: false });
  
      const receiverMessageRef = collection(this.firestore, `usuarios/${this.receiverId}/mensajes/${conversationId}/mensajes`);
      await addDoc(receiverMessageRef, { ...message, senderId: user.uid, isRead: false });
    }
  }

  async sendMessageToAdmin(conversationId: string, message: any, adminId: string): Promise<void> {
    const user = this.auth.currentUser;

    if (user) {
      const senderMessageRef = collection(this.firestore, `usuarios/${user.uid}/mensajes/${conversationId}/mensajes`);
      await addDoc(senderMessageRef, { ...message, senderId: user.uid, isRead: false });

      const adminMessageRef = collection(this.firestore, `usuarios/${adminId}/mensajes/${conversationId}/mensajes`);
      await addDoc(adminMessageRef, { ...message, senderId: user.uid, isRead: false });
    }
  }

  // Obtener mensajes de una conversación específica
  getMessages(conversationId: string): Observable<any[]> {
    const user = this.auth.currentUser;
    const messagesRef = collection(this.firestore, `usuarios/${user!.uid}/mensajes/${conversationId}/mensajes`);
    
    return collectionData(messagesRef, { idField: 'id' }).pipe(
      map((messages: any[]) => {
        // Marcar los mensajes como leídos al recibirlos
        messages.forEach((message) => {
          message.isRead = true;  // Aquí debes determinar si el mensaje se ha leído o no, según tu lógica
        });
  
        return messages;
      })
    ) as Observable<any[]>;
  }

  markMessageAsRead(conversationId: string, messageId: string): void {
    const user = this.auth.currentUser;
  
    if (user) {
      const messageRef = doc(this.firestore, `usuarios/${user.uid}/mensajes/${conversationId}/mensajes/${messageId}`);
      
      // Actualizar el estado isRead en la base de datos
      updateDoc(messageRef, { isRead: true });
    }
  }


  iniciarConversacion(conversationId: string): void {
    // Puedes realizar acciones adicionales aquí si es necesario antes de iniciar la conversación
    console.log(`Iniciando conversación con ID: ${conversationId}`);
  }
}