import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  addForm:FormGroup;
 categorie = {};
 updateCategorie = null;
  constructor(private router:Router, private apiService:ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    this.apiService.getCategorie().subscribe(res => {
      this.categorie = res.json();
      console.log(res.json());
    });
  }
  categorieBtn(){
    if(this.addForm.valid){
      this.apiService.addCategorie(this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.toastr.success('Categorie added!', 'Success!');
        this.ngOnInit()
      });
    }
  }
  deleteBtn(id){
    if(confirm('are you sure to delete this categorie') == true){
      this.apiService.deleteCategorie(id).subscribe(res => {
        this.toastr.warning('delete categorie', 'Alert!');
        console.log(res.json())
        this.ngOnInit()
      });
    }
  }
  updateBtn(){
   this.apiService.editCategorie(this.updateCategorie._id, this.updateCategorie).subscribe(res => {
     this.updateCategorie = null;
     this.toastr.info('updated of categorie');
     this.ngOnInit();
     console.log(res.json())
   });
  }

}
