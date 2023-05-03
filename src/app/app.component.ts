import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';

interface Restaurants {
  nome: String;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-client-algafood';

  authorizationLink = "http://localhost:8082/oauth/authorize?response_type=code&client_id=food-analytics&state"
  token: any;
  restaurantObj: any;
  restaurantes: Restaurants[] = [];


  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if(Object.keys(params).length) {
        this.generateToken(params["code"])
      }
    })
  }

  getRestaurants() {
    try {
      this.appService.getData().subscribe((response) => {
        this.restaurantObj = response;
        this.restaurantes = this.restaurantObj._embedded.restaurantes;
      })
    } catch(err) {
      alert("Por favor, realize o login!")
    }
  }

  redirectToLoginView(){
    const state = nanoid(Math.random() * 50);
    window.location.href = `${this.authorizationLink}=${state}`;
  }

  generateToken(code: string) {
    this.appService.postData(code)
  }
}
