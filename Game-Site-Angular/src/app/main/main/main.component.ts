import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/posts/post.service';
import { Configurations } from 'src/app/shared/types/configurations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  configurations: Configurations[] = []

  constructor(private postService: PostService){}
  ngOnInit(): void {
    this.postService.getConfigurations().subscribe(res =>{
      this.configurations = res.map((e: any) =>{
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
