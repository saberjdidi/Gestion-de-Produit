import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  addForm : FormGroup;
  client = {};
  updateClient = null;

  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.apiService.getClient().subscribe(res => {
      this.client = res.json();
    });
  }

  clientBtn(){
    if(this.addForm.valid){
      this.apiService.addClient(this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      });
    }
  }
  deleteClient(id){
    if(confirm("Delete Client !!") == true){
      this.apiService.deleteClient(id).subscribe(res => {
        this.ngOnInit();
      });
    }
  }
  updateBtn(){
    this.apiService.editClient(this.updateClient._id, this.updateClient).subscribe(res => {
      this.updateClient = null;
      this.ngOnInit();
    });
  }

}
