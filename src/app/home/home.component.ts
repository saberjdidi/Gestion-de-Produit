import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produit = {};
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getProduit().subscribe(res => {
      console.log(res.json())
      this.produit = res.json()
    });
  }

  logoutBtn(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
