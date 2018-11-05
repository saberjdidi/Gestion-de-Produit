import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  addForm : FormGroup;
  categorie : {};
 // userId = '';

  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl ('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price : new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });

    this.apiService.getCategorie().subscribe(res => {
      this.categorie = res.json();
    });
  }

  produitBtn(){
    if(this.addForm.valid){
     // const token = localStorage.getItem('token');
      //const userId = jwt_decode(token).data._id;
      this.apiService.addProduit(this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      });
      
    }
  }

}
