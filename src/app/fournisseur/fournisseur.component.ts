import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FournisseurServiceService } from '../fournisseur-service.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  addForm : FormGroup;
  fournisseur = {};
  
  constructor(private router:Router, private fournisseurApi:FournisseurServiceService) { 
    
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

   

    this.fournisseurApi.getFournisseur().subscribe(res => {
      this.fournisseur = res.json();
      console.log(res.json())
    });
  }

  fournisseurBtn(){
    if(this.addForm.valid){
      this.fournisseurApi.postFournisseur(this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      });
    }
  }

  logoutBtn(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
