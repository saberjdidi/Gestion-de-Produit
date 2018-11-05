import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurServiceService {

  constructor(private http: Http) { }

  postFournisseur(form){
    return this.http.post('http://localhost:3000/fournisseur', form)
  }
  loginFournisseur(form){
    return this.http.post('http://localhost:3000/fournisseur/login', form)
  }
  getFournisseur(){
    return this.http.get('http://localhost:3000/fournisseur')
  }
  deleteFournisseur(id){
    return this.http.delete('http://localhost:3000/fournisseur/' + id)
  }
  editFournisseur(id, fournisseur){
    return this.http.put('http://localhost:3000/fournisseur/' + id, fournisseur)
  }

  postTodo(id, form){
    return this.http.post('http://localhost:3000/fournisseur/' + id, form)
  }
  getTodo(id){
    return this.http.get('http://localhost:3000/fournisseur/' + id)
  }
  deleteTodo(id, i){
    return this.http.delete('http://localhost:3000/fournisseur/' + id + '/' + i )
  }
  editTodo(id, i, todo){
    return this.http.put('http://localhost:3000/fournisseur/' + id +'/' + i , todo)
  }
}
