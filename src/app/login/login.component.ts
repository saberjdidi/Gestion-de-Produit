import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  message = '';
  constructor(private router:Router, private apiService : ApiService) { }

  ngOnInit() {
     this.loginForm = new FormGroup({
       email : new FormControl('', [Validators.email, Validators.required]),
       password: new FormControl('', [Validators.required])
     });

  }

  loginBtn(){
    if(this.loginForm.valid){
      this.message='';
      this.apiService.loginApi(this.loginForm.value).subscribe(res => {
        console.log(res.json());
        if(res.json().message == 'ok'){
          localStorage.setItem('token', res.json().usertoken)

          const token = localStorage.getItem('token');
          const roles = jwt_decode(token).data.role;

          if(roles == 'admin'){
            this.router.navigateByUrl('/dashboard')
          }
          if(roles == 'client') {
            this.router.navigateByUrl('/home')
          }
          if(roles == 'fournisseur'){
            this.router.navigateByUrl('/fournisseur')
          }

          console.log(this.loginForm.value);
          
        }
      });
    }
  }
}
