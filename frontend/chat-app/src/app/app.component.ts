import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username = 'username';
  message : '' ;
  messages :any[] = [];

  placeholder = "start typing"
  constructor(private http : HttpClient){

  }



  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('4256ba19385c508b9e4c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data : any)=>this.messages.push(data));
  }

 
    handleReload = (event : any) => {
      event.preventDefault() ; 
    }


  submit():void{
    this.http.post('http://localhost:8081/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = ''
    )
    // event.preventDefault(),
  }
}
