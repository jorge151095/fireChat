import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { Message } from 'src/app/interface/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{
  constructor( public cs: ChatService) {
    this.cs.loadMessages().subscribe(
      (response) => {
        setTimeout( () => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
        this.chats = response;
      }
    );
  }

  public chats;
  public message = '';
  public element: any;
  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this.cs.addMessage( this.message ).then( () => {
      this.message = '';
    }).catch( () => { console.log('Error'); });

  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }
}
