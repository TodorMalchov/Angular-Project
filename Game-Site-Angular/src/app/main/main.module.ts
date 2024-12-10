import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AddConfigurationComponent } from './add-configuration/add-configuration.component';
import { MainRoutingModule } from './main-routing.module';




@NgModule({
  declarations: [
    MainComponent,
    AddConfigurationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }
