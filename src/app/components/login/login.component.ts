import { Component, OnInit } from '@angular/core';
import { ChatService} from './../../providers/chat.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor( public cs: ChatService) { }

  login(provider: string) {
    this.cs.login(provider);
  }

}
