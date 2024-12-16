import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesorsComponent } from './procesors/procesors.component';
import { MotherBordsComponent } from './mother-bords/mother-bords.component';
import { VideoCardsComponent } from './video-cards/video-cards.component';
import { RamComponent } from './ram/ram.component';
import { MemoriesComponent } from './memories/memories.component';
import { PowerSupplyComponent } from './power-supply/power-supply.component';
import { CasesComponent } from './cases/cases.component';
import { CoolingComponent } from './cooling/cooling.component';
import { ComponentsRoutingModul } from './components-routing.module';
import { AddCaseComponent } from './cases/add-case/add-case.component';
import { UpdateCaseComponent } from './cases/update-case/update-case.component';
import { UpdateCoolingComponent } from './cooling/update-cooling/update-cooling.component';
import { AddCoolingComponent } from './cooling/add-cooling/add-cooling.component';
import { AddMemoriesComponent } from './memories/add-memories/add-memories.component';
import { UpdateMemoriesComponent } from './memories/update-memories/update-memories.component';
import { AddPowerSupplyComponent } from './power-supply/add-power-supply/add-power-supply.component';
import { UpdatePowerSupplyComponent } from './power-supply/update-power-supply/update-power-supply.component';
import { AddMotherBoardComponent } from './mother-bords/add-mother-board/add-mother-board.component';
import { UpdateMotherBoardComponent } from './mother-bords/update-mother-board/update-mother-board.component';
import { UpdateProcesorsComponent } from './procesors/update-procesors/update-procesors.component';
import { AddProcesorsComponent } from './procesors/add-procesors/add-procesors.component';
import { AddRamComponent } from './ram/add-ram/add-ram.component';
import { UpdateRamComponent } from './ram/update-ram/update-ram.component';
import { UpdateVideoCardsComponent } from './video-cards/update-video-cards/update-video-cards.component';
import { AddVideoCardsComponent } from './video-cards/add-video-cards/add-video-cards.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProcesorsComponent,
    MotherBordsComponent,
    VideoCardsComponent,
    RamComponent,
    MemoriesComponent,
    PowerSupplyComponent,
    CasesComponent,
    CoolingComponent,
    AddCaseComponent,
    UpdateCaseComponent,
    UpdateCoolingComponent,
    AddCoolingComponent,
    AddMemoriesComponent,
    UpdateMemoriesComponent,
    AddPowerSupplyComponent,
    UpdatePowerSupplyComponent,
    AddMotherBoardComponent,
    UpdateMotherBoardComponent,
    UpdateProcesorsComponent,
    AddProcesorsComponent,
    AddRamComponent,
    UpdateRamComponent,
    UpdateVideoCardsComponent,
    AddVideoCardsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModul,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
