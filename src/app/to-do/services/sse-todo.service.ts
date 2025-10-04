import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface ServerEvent {
  message: string;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SseTodoService {
  private eventSource: EventSource | null = null;
  private eventsSubject = new Subject<ServerEvent>();
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  // private eventCountSubject = new BehaviorSubject<number>(0);

  constructor() {}

  connect(): void {
    if (this.eventSource) {
      this.disconnect();
    }

    try {
      this.eventSource = new EventSource('http://localhost:3000/events'); //TODO: variable de entorno

      this.eventSource.onopen = () => {
        console.log('Conexión SSE establecida'); //TODO: eliminar
        this.connectionStatusSubject.next(true);
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Evento recibido:', data);

        } catch (error) {
          console.error('Error al parsear evento SSE:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error('Error en conexión SSE:', error);
        this.connectionStatusSubject.next(false);

        setTimeout(() => {
          if (this.eventSource?.readyState === EventSource.CLOSED) {
            console.log('Reintentando conexión SSE...'); //TODO: eliminar
            this.connect();
          }
        }, 5000);
      };

    } catch (error) {
      console.error('Error al establecer conexión SSE:', error);
      this.connectionStatusSubject.next(false);
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.connectionStatusSubject.next(false);
      console.log('Conexión SSE cerrada');
    }
  }

  getEvents(): Observable<ServerEvent> {
    return this.eventsSubject.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatusSubject.asObservable();
  }

  isConnected(): boolean {
    return this.connectionStatusSubject.value;
  }
}
