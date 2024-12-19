import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { UserModule } from './user/user.module';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from '../../src/environments/environment'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ComponentsModule } from './components/components.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { DirectivesModule } from './directives/directives.module';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MainModule,
    UserModule,
    ComponentsModule,
    DirectivesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [importProvidersFrom([provideFirebaseApp(()=> initializeApp(environment.firebase)),provideAuth(()=>getAuth())])],
  bootstrap: [AppComponent] 
})
export class AppModule { }
