import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  loginApi(form){
    return this.http.post('http://localhost:3000/auth/login', form)
  }
  registerApi(form){
    return this.http.post('http://localhost:3000/auth/register', form)
  }

  addCategorie(form){
    return this.http.post('http://localhost:3000/produit/categorie', form)
  }
  getCategorie(){
    return this.http.get('http://localhost:3000/produit/categorie')
  }
  getCategorieById(id){
    return this.http.get('http://localhost:3000/produit/categorie/' + id)
  }
  deleteCategorie(id){
    return this.http.delete('http://localhost:3000/produit/categorie/' + id)
  }
  editCategorie(id, categorie){
    return this.http.put('http://localhost:3000/produit/categorie/' + id, categorie)
  }

  addProduit(form){
    return this.http.post('http://localhost:3000/produit/produits' , form)
  }
  getProduit(){
    return this.http.get('http://localhost:3000/produit/produits')
  }
  getProduitById(id){
    return this.http.get('http://localhost:3000/produit/produits/' + id)
  }
  deleteProduit(id){
    return this.http.delete('http://localhost:3000/produit/produits/' + id)
  }
  editProduit(id, produit){
    return this.http.put('http://localhost:3000/produit/produits/' + id, produit)
  }

  addClient(form){
    return this.http.post('http://localhost:3000/auth/register', form)
  }
  getClient(){
    return this.http.get('http://localhost:3000/auth/client')
  }
  deleteClient(id){
    return this.http.delete('http://localhost:3000/auth/client/' + id)
  }
  editClient(id, client){
    return this.http.put('http://localhost:3000/auth/client/' + id, client)
  }

  addCommande( form){
    return this.http.post('http://localhost:3000/produit/commande', form)
  }
  getCommande(){
    return this.http.get('http://localhost:3000/produit/commande')
  }
  deleteCommande(id){
    return this.http.delete('http://localhost:3000/produit/commande/' + id)
  }
  editCommande(id, commande){
    return this.http.put('http://localhost:3000/produit/commande/' +id, commande)
  }

  addContact(form){
    return this.http.post('http://localhost:3000/produit/contact', form)
  }
  getContact(){
    return this.http.get('http://localhost:3000/produit/contact')
  }
  deleteContact(id){
    return this.http.delete('http://localhost:3000/produit/contact/' + id)
  }
  editContact(id, contact){
    return this.http.put('http://localhost:3000/produit/contact/' + id, contact)
  }
  
}
