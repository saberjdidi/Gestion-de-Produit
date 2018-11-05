import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contact = {};
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getContact().subscribe(res => {
      this.contact = res.json();
    })
  }

  deleteContactBtn(id){
    if(confirm('Delete Contact !!') == true){
      this.apiService.deleteContact(id).subscribe(res => {
        this.ngOnInit();
      })
    }
  }

}
