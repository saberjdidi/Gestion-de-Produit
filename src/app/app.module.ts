import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {RouterModule, Routes} from'@angular/router';
import {HttpModule} from'@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProduitComponent } from './produit/produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CommandeComponent } from './commande/commande.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';

import { FileUploadModule } from 'ng2-file-upload';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { TodoComponent } from './todo/todo.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
//toastr
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

const routes : Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard, RoleGuard], data : {roles: ['admin']} },
  {path : 'home', component : HomeComponent, canActivate : [AuthGuard]},
  {path : 'produit', component : ProduitComponent, canActivate: [AuthGuard]},
  {path : 'categorie', component : CategorieComponent},
  {path : 'commande', component : CommandeComponent},
  {path: 'client', component : ClientComponent},
  {path : 'produit/:idproduit', component : CommandeComponent},
  {path: 'listcommande', component: ListCommandeComponent},
  {path: 'listcontact', component: ListContactComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'fournisseur', component: FournisseurComponent, canActivate: [RoleGuard], data: {roles : ['fournisseur']}},
  {path: 'fournisseur/:idfournisseur', component: TodoComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'add-produit', component: AddProduitComponent},
  {path : '', pathMatch: 'full', redirectTo: 'login'}
 

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProduitComponent,
    CategorieComponent,
    CommandeComponent,
    ClientComponent,
    ListCommandeComponent,
    ContactComponent,
    ListContactComponent,
    FournisseurComponent,
    TodoComponent,
    AddProduitComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    //ngx-toastr
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
