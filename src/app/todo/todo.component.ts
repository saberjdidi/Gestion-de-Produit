import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FournisseurServiceService } from '../fournisseur-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  addForm : FormGroup;
  fournisseur = {};
  fournisseurId = '';
  //todo = [];
  updateTodo = null;

  constructor(private router:Router, private fournisseurApi:FournisseurServiceService, private route:ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.fournisseurId = params.idfournisseur
    });
   }

  ngOnInit() {

    this.addForm = new FormGroup({
      phone : new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      salary : new FormControl ('', [Validators.required])
    });

    this.fournisseurApi.getFournisseur().subscribe(res => {
      this.fournisseur = res.json();
      //console.log(res.json())
    });

   this.fournisseurApi.getTodo(this.fournisseurId).subscribe(res => {
     this.fournisseur = res.json();
     console.log(res.json());
   });

  }

  todoBtn(){
    if(this.addForm.valid){
      this.fournisseurApi.postTodo(this.fournisseurId, this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      });
    }
  }

  deleteTodoBtn(i){
    if(confirm('Delete Todo') == true){
      this.fournisseurApi.deleteTodo(this.fournisseurId, i).subscribe(res => {
        this.ngOnInit();
      });
    }
  }

  updateTodoBtn(i){
    this.fournisseurApi.editTodo(this.updateTodo._id, i, this.updateTodo).subscribe(res => {
      this.updateTodo = null;
      this.ngOnInit();
    })
  }

}
