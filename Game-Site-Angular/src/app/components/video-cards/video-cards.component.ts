import { Component, OnInit } from '@angular/core';
import { VideoCard } from 'src/app/shared/types/components';
import { GetComponentsService } from '../get-components.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-video-cards',
  templateUrl: './video-cards.component.html',
  styleUrls: ['./video-cards.component.css']
})
export class VideoCardsComponent implements OnInit{
  user$ = this.userService.user$
components: VideoCard[] = []
  constructor(private getComponentService : GetComponentsService, private userService: UserService){}
  ngOnInit(): void {
    this.getComponentService.getVideoCards().subscribe(res =>{
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