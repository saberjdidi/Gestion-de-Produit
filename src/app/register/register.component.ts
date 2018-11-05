import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  message = '';

  constructor(private router:Router, private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
  }
  registerBtn(){
    if(this.registerForm.valid){
      this.message='';
      this.apiService.registerApi(this.registerForm.value).subscribe(res => {
        console.log(res.json());
        if(res.json()._id){
          this.router.navigateByUrl('/login')
        }else{
          this.message = res.json().message
        }
      });
    }
  }

}
