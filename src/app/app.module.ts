import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from "@angular/forms"; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubirP66Service } from './services/subir-p66.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    FotosComponent,
    CargaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp({"projectId":"login-p66-2e412","appId":"1:30812688980:web:bf8bc2d03f7fe918acd3c1","storageBucket":"login-p66-2e412.firebasestorage.app","apiKey":"AIzaSyB65HfpOj_wk1rlwxoOLhKWhTxNpPGgL-k","authDomain":"login-p66-2e412.firebaseapp.com","messagingSenderId":"30812688980"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() =>getStorage()), 
    SubirP66Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }