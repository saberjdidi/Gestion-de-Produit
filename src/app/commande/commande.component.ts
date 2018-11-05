import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
   addForm:FormGroup;
   commande = {};
   produitId = '';
   produit = {};
   user = [];
  constructor(private router:Router, private apiService:ApiService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.produitId = params.idproduit
    })
   }

  ngOnInit() {
      this.apiService.getProduitById(this.produitId).subscribe( res => {
        this.produit = res.json();
        console.log(res.json())
      });

    this.addForm = new FormGroup({
      qteprod : new FormControl('', [Validators.required])
    });

    this.apiService.getProduit().subscribe(res => {
      // this.produit = res.json();
      console.log(res.json());
     });
    this.apiService.getCommande().subscribe(res => {
      this.commande = res.json()
      console.log(res.json())
    });
    //afficher user 
    const token = localStorage.getItem('token');
    let Data = jwt_decode(token).data;
    this.user = Data;
  }
  commandeBtn(){
      if(this.addForm.valid){
        const token = localStorage.getItem('token');
        const userId = jwt_decode(token).data._id;
        const commandeObj = {
          "qteprod" : this.addForm.value.qteprod,
          "num_client" : userId,
          "num_prod" : this.produitId
        }
        this.apiService.addCommande(commandeObj).subscribe(res => {
          console.log(res.json());
          this.ngOnInit();
        })
      }
  }

}
