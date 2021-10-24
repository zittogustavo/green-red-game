import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public userName: string = "";
  public score: number = 0;
  public maxScore: number = 0;

  constructor(private readonly _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params : ParamMap)=> {  
      this.userName = params.get("name")!;
      this.score = Number(params.get("score")!);
      this.maxScore = Number(params.get("maxScore")!);
    })
  }

}
