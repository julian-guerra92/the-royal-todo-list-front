// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
// import { SseService, ServerEvent } from './services/sse.service';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit, OnDestroy {
//   title = 'the-royal-todo-list-front';

//   // Propiedades para manejar los eventos SSE
//   eventCount = 0;
//   isConnected = false;
//   lastMessage = '';
//   events: ServerEvent[] = [];

//   private subscriptions = new Subscription();

//   constructor(private sseService: SseService) {}

//   ngOnInit(): void {
//     this.connectToSSE();
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//     this.sseService.disconnect();
//   }

//   connectToSSE(): void {
//     this.sseService.connect();
//   }


//   // disconnectFromSSE(): void {
//   //   this.sseService.disconnect();
//   // }

//   // reconnect(): void {
//   //   this.sseService.disconnect();
//   //   setTimeout(() => {
//   //     this.sseService.connect();
//   //   }, 1000);
//   // }
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // title = 'the-royal-todo-list-app';
}
