import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber, TeardownLogic} from 'rxjs';

const URL_SERVER = 'http://localhost:9010/';
const URI_METER_READING = 'meter-reading/read-messages';

@Injectable({
  providedIn: 'root'
})
export class ServerSentEventService {

  public _firstConnect: boolean = true;
  public meterReading: Subject<any> = <Subject<any>>new Subject();

  constructor() { }

  updateData(observable: BehaviorSubject<string>, data: string): void
  {
    observable.next(data);
  }

  subscribeToSse(sub: Subscriber<string>): TeardownLogic {
    const url = `${URL_SERVER + URI_METER_READING}`;

    const es = new EventSource(url);

    // this.genericSseEvents(es);

    es.onmessage = (evt) => {
      console.log(evt.data);
      this.meterReading.next(evt.data);
      evt.data;
    };
    //
    // es.addEventListener(
    //   'message',
    //   (evt) => {sub.next(evt.data); this.updateData(this.meterReading, evt.data)},
    //   false
    // );

    // return () => {
    //   es.close();
    //   console.log('[SSE LOGGER] - SSE connexion Closed');
    // };
  }

  observeMessages(): Observable<string>
  {
    return new Observable<string>((sub: Subscriber<string>) => this.subscribeToSse(sub));
  }

  genericSseEvents(es) {
    es.onopen = () => {
      (!this.firstConnect) ? console.log('[SSE LOGGER] - SSE connexion Open') : this.firstConnect = false
    };

    es.onmessage = (evt) => {
      console.log(evt.data);
      this.meterReading.next(evt.data);
      evt.data;
    };

    es.onerror = () => {
      switch (es.readyState) {
        case EventSource.CONNECTING: {
          console.log('[SSE LOGGER] - SSE connexion In Progress');
          break;
        }
        case EventSource.OPEN: {
          console.log('[SSE LOGGER] - subscribeToSse');
          break;
        }
        case EventSource.CLOSED: {
          console.log('[SSE LOGGER] - SSE connexion Closed'); break;
        }
      }
    };
  }

  get firstConnect(): boolean {
    return this._firstConnect;
  }

  set firstConnect(value: boolean) {
    this._firstConnect = value;
  }
}
