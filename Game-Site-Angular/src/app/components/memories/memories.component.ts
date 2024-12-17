import { Component, OnInit } from '@angular/core';
import { Memories } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css']
})
export class MemoriesComponent implements OnInit{
  user$ = this.userService.user$
components: Memories[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getMemories().subscribe(res =>{
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
