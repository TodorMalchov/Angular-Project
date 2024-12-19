import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProcesorsComponent } from "./procesors/procesors.component";
import { VideoCardsComponent } from "./video-cards/video-cards.component";
import { MotherBordsComponent } from "./mother-bords/mother-bords.component";
import { RamComponent } from "./ram/ram.component";
import { MemoriesComponent } from "./memories/memories.component";
import { PowerSupplyComponent } from "./power-supply/power-supply.component";
import { CasesComponent } from "./cases/cases.component";
import { CoolingComponent } from "./cooling/cooling.component";
import { AddProcesorsComponent } from "./procesors/add-procesors/add-procesors.component";
import { AddVideoCardsComponent } from "./video-cards/add-video-cards/add-video-cards.component";
import { AddMotherBoardComponent } from "./mother-bords/add-mother-board/add-mother-board.component";
import { AddRamComponent } from "./ram/add-ram/add-ram.component";
import { AddMemoriesComponent } from "./memories/add-memories/add-memories.component";
import { AddPowerSupplyComponent } from "./power-supply/add-power-supply/add-power-supply.component";
import { AddCaseComponent } from "./cases/add-case/add-case.component";
import { AddCoolingComponent } from "./cooling/add-cooling/add-cooling.component";
import { CurrentCoolingComponent } from "./cooling/current-cooling/current-cooling.component";
import { CurrentCaseComponent } from "./cases/current-case/current-case.component";
import { CurrentPowerSupplyComponent } from "./power-supply/current-power-supply/current-power-supply.component";
import { CurrentMemoComponent } from "./memories/current-memo/current-memo.component";
import { CurrentRamComponent } from "./ram/current-ram/current-ram.component";
import { CurrentProcesorComponent } from "./procesors/current-procesor/current-procesor.component";
import { CurrentVideoCardComponent } from "./video-cards/current-video-card/current-video-card.component";
import { CurrentMotherBoardComponent } from "./mother-bords/current-mother-board/current-mother-board.component";


const routes: Routes = [
    {path: 'procesors', component: ProcesorsComponent},
    {path: 'video-cards', component: VideoCardsComponent},
    {path: 'mother-bords', component: MotherBordsComponent},
    {path: 'ram', component: RamComponent},
    {path: 'memories', component: MemoriesComponent},
    {path: 'power-supply', component: PowerSupplyComponent},
    {path: 'computer_case', component: CasesComponent},
    {path: 'cooling', component: CoolingComponent},

    {path: 'procesors/add-procesors', component: AddProcesorsComponent},
    {path: 'video-cards/add-video-card', component: AddVideoCardsComponent},
    {path: 'mother-bords/add-mother-board', component: AddMotherBoardComponent},
    {path: 'ram/add-ram', component: AddRamComponent},
    {path: 'memories/add-memories', component: AddMemoriesComponent},
    {path: 'power-supply/add-power-supply', component: AddPowerSupplyComponent},
    {path: 'computer_case/add-computer_case', component: AddCaseComponent},
    {path: 'cooling/add-cooling', component: AddCoolingComponent},

    {path: 'procesors/:id', component: CurrentProcesorComponent},
    {path: 'video-cards/:id', component: CurrentVideoCardComponent},
    {path: 'mother-bords/:id', component: CurrentMotherBoardComponent},
    {path: 'ram/:id', component: CurrentRamComponent},
    {path: 'memories/:id', component: CurrentMemoComponent},
    {path: 'power-supply/:id', component: CurrentPowerSupplyComponent},
    {path: 'computer_case/:id', component: CurrentCaseComponent},
    {path: 'cooling/:id', component: CurrentCoolingComponent},
    
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ComponentsRoutingModul { }