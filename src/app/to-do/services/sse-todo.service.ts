import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SseEvent } from '../interfaces/sse-event.interface';


export type SSEEndpoint = 'cron-process/cursed-cleanup' | 'cron-process/great-reset';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SseTodoService {

  private eventSources = new Map<SSEEndpoint, EventSource>();
  private eventsSubject = new Subject<SseEvent>();

  constructor() {}

  connectToEndpoint(endpoint: SSEEndpoint): void {
    if (this.eventSources.has(endpoint)) {
      return;
    }

    const url = `${baseUrl}/${endpoint}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        this.eventsSubject.next({
          ...data,
          endpoint: endpoint
        });
      } catch (error) {
        console.error(`Error to parser event from SSE of ${endpoint}:`, error);
      }
    };

    eventSource.onerror = (error: Event) => {
      console.error(`Error to connection SSE of ${endpoint}:`, error);
    };

    this.eventSources.set(endpoint, eventSource);
  }

  disconnectFromEndpoint(endpoint: SSEEndpoint): void {
    const eventSource = this.eventSources.get(endpoint);
    if (eventSource) {
      eventSource.close();
      this.eventSources.delete(endpoint);
    }
  }

  connectToAll(): void {
    this.connectToEndpoint('cron-process/cursed-cleanup');
    this.connectToEndpoint('cron-process/great-reset');
  }

  disconnectAll(): void {
    this.eventSources.forEach((eventSource) => {
      eventSource.close();
    });
    this.eventSources.clear();
  }

  getEvents(): Observable<SseEvent> {
    return this.eventsSubject.asObservable();
  }
}
