import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

  produit = {};
  commande = {};
  client = {};

  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getProduit().subscribe(res => {
      this.produit = res.json();
      console.log(res.json())
    });
    this.apiService.getCommande().subscribe(res => {
      this.commande = res.json();
      console.log(res.json())
    });
    this.apiService.getClient().subscribe( res => {
      this.client = res.json();
      console.log(res.json())
    });
  }

  deleteCommandeBtn(id){
    if(confirm('Do you like to delete this commande') == true){
      this.apiService.deleteCommande(id).subscribe(res => {
        this.ngOnInit()
      });
    }
  }

}
