import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "http://localhost:8081/v1/restaurantes"
  generateTokenUrl = "http://localhost:8082/oauth/token"
  data: any;

  constructor(private http: HttpClient) {}

  getData() {
      return this.http.get(this.baseUrl, {
        headers: {
          "Authorization": `Bearer ${this.data["access_token"]}`
        }
      })
  }

  postData(code: string) {

    const body = new URLSearchParams();
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'http://localhost:4200');

   this.http.post(this.generateTokenUrl, body, {
      headers: {
        "Authorization": "Basic Zm9vZC1hbmFseXRpY3M6Zm9vZDEyMw==",
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).subscribe(response => {
      this.data = response;
      this.data['access_token']
    })
  }
}
