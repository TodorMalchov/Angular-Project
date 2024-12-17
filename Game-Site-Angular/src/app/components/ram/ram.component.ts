import { Component, OnInit } from '@angular/core';
import { Ram } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit{
  user$ = this.userService.user$
components: Ram[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getRam().subscribe(res =>{
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
