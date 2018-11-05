import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categorie = {};
  produit = {};
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getCategorie().subscribe(res => {
      this.categorie = res.json();
      console.log(res.json());
    });

    this.apiService.getProduit().subscribe(res => {
      console.log(res.json())
      this.produit = res.json()
    });

    for(let i = 0 ; i<this.produit ; i++){
       if(this.produit[i].description.length > 5){
         this.produit[i].description = this.produit[i].description.substring(0,4) + '...';
       }
    }
  }

  logoutBtn(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
