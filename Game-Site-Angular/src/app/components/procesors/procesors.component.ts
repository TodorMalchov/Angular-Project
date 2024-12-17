import { Component, OnInit } from '@angular/core';
import { Procesor } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-procesors',
  templateUrl: './procesors.component.html',
  styleUrls: ['./procesors.component.css']
})
export class ProcesorsComponent implements OnInit{
  user$ = this.userService.user$
components: Procesor[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getProcesors().subscribe(res =>{
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