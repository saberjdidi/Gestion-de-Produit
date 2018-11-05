import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FileUploader } from 'ng2-file-upload';
//toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  addForm : FormGroup;
  produit = {};
  categorie = {};
  updateProduit = null;

  URL : '/assets/image.jpg';
  
  constructor(private router:Router, private apiService:ApiService, private toastr: ToastrService) {
   
   }
  // file:FileUploader = new FileUploader({url: this.URL});
  file: FileUploader = new FileUploader({ url: this.URL, removeAfterUpload: false, autoUpload: true });

  ngOnInit() {
    
    this.addForm = new FormGroup({
      file : new FormControl(''),
      name : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      price : new FormControl('', [Validators.required]),
      category : new FormControl('', [Validators.required]),
    });

    this.apiService.getCategorie().subscribe(res => {
      this.categorie = res.json();
      console.log(res.json());
    });

    this.apiService.getProduit().subscribe(res => {
      console.log(res.json())
      this.produit = res.json()
    });
 
  }
  /*  
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.addForm.patchValue({image: file});
    this.addForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.addForm)
  } */

  produitBtn(){
     if(this.addForm.valid){
       this.apiService.addProduit(this.addForm.value).subscribe(res => {
        this.toastr.success('Produit added!', 'Success!');

         console.log(res.json());
         this.ngOnInit();
       });
     }
  }

  deleteBtn(id){
    if(confirm('are you sure to delete this product') == true){
      this.apiService.deleteProduit(id).subscribe(res => {
        this.toastr.warning('delete produit', 'Alert!');
        this.ngOnInit()
      });
    }
  }
  updateBtn(){
   this.apiService.editProduit(this.updateProduit._id , this.updateProduit).subscribe(res => {
     this.updateProduit = null;
     this.toastr.info('update produit', 'update !');
     this.ngOnInit();
   });
  }

  

}
