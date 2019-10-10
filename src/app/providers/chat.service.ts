import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interface/message.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) {
  }

  public chats: Message[] = [];
  private itemsCollection: AngularFirestoreCollection<Message>;

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map( (messages: Message[]) => {
        this.chats = [];
        for (const message of messages) {
          this.chats.unshift(message);
        }
        return this.chats;
      }));
  }

  addMessage(text: string) {
    const message: Message = {
      name: 'JorgeDemo',
      message: text,
      date: new Date().getTime(),
      uid: ''
    };
    return this.itemsCollection.add( message );
  }
}
