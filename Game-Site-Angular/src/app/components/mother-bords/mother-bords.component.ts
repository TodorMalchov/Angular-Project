import { Component, OnInit } from '@angular/core';
import { MotherBoard } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-mother-bords',
  templateUrl: './mother-bords.component.html',
  styleUrls: ['./mother-bords.component.css']
})
export class MotherBordsComponent implements OnInit{
  user$ = this.userService.user$
components: MotherBoard[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getMotherBoards().subscribe(res =>{
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
