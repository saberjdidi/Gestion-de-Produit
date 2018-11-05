import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  addForm:FormGroup;
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email, Validators.required]),
      title : new FormControl('', [Validators.required]),
      message : new FormControl('', [Validators.required]),
      etat : new FormControl('', [Validators.required]),
    });
  }
  contactBtn(){
    if(this.addForm.valid){
      this.apiService.addContact(this.addForm.value).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      })
    }
  }

}
