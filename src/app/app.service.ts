import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "http://localhost:8081/v1/restaurantes"

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.baseUrl, {
      headers: {
        "Authorization": "Bearer beff2d85-a407-4976-a6c0-9b2f98d6b699"
      }
    })
  }

}
