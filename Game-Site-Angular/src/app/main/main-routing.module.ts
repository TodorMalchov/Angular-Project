import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { AddConfigurationComponent } from "./add-configuration/add-configuration.component";
import { ConfigurationComponent } from "./configuration/configuration.component";

const routes: Routes = [
    {path: 'main', component: MainComponent},
    {path: 'create-configuration', component: AddConfigurationComponent},
    {path: 'main-configuraton', component: ConfigurationComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule { }