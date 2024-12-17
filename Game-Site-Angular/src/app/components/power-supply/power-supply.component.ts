import { Component, OnInit } from '@angular/core';
import { PowerSupply } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-power-supply',
  templateUrl: './power-supply.component.html',
  styleUrls: ['./power-supply.component.css']
})
export class PowerSupplyComponent implements OnInit{
  user$ = this.userService.user$
components: PowerSupply[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getPowerSupply().subscribe(res =>{
      this.components = res.map((e: any) =>{
        const data = e.payload.doc.data()
        data.id = e.payload.doc.id
        console.log(data)
        return data
      })
    },err=>{
      alert('Нещо се обърка, опитай отново!')
    })
  }
}
