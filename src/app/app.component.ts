import { Component } from '@angular/core';
import { AppService } from './app.service';

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

  restaurantObj: any;
  restaurantes: Restaurants[] = []
  

  constructor(private appService: AppService) {}


  getRestaurants() {
    this.appService.getData().subscribe((response) => {
      this.restaurantObj = response;
      this.restaurantes = this.restaurantObj._embedded.restaurantes;
    })
  }


}
