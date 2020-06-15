import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: any): Observable<any> {
    return this.http.post(`${environment.apiServer.url}/orders`, order);
  }
}
