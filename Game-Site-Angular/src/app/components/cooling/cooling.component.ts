import { Component, OnInit } from '@angular/core';
import { GetComponentsService } from '../get-components.service';
import { Cooling } from 'src/app/shared/types/components';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-cooling',
  templateUrl: './cooling.component.html',
  styleUrls: ['./cooling.component.css']
})
export class CoolingComponent implements OnInit{
  user$ = this.userService.user$
 components: Cooling[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getCooling().subscribe(res =>{
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
