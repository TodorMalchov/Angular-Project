import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AddConfigurationComponent } from './add-configuration/add-configuration.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DirectivesModule } from '../directives/directives.module';




@NgModule({
  declarations: [
    MainComponent,
    AddConfigurationComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports:[
    // MainComponent,

  ]
})
export class MainModule { }
