import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserData } from '../../models/entities/user/user-data-dto.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public actualPlayer: UserData = new UserData("");
  private lastStep: boolean = true;
  private isFirstStep: boolean = true;
  
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _userService: UserService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params : ParamMap)=> {
      this.actualPlayer.name = params.get("name")!;      
      this.actualPlayer.score = Number(params.get("score")!);
      this.actualPlayer.maxScore = Number(params.get("maxScore")!);
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.actualPlayer.maxScore = this.actualPlayer.score > this.actualPlayer.maxScore ? this.actualPlayer.score : this.actualPlayer.maxScore;
    this._userService.updateUser(this.actualPlayer);
  }

  public step(step: boolean) {
    if (this.isFirstStep || this.lastStep !== step) {
      this.addPoint();
    } else {
      this.removePoint();
    }
    this._userService.updateUser(this.actualPlayer);
    this.lastStep = step;
    this.isFirstStep = false;
  }

  private addPoint(): void {
    this.actualPlayer.score = this.actualPlayer.score + 1;    
  }

  private removePoint(): void {
    this.actualPlayer.score = this.actualPlayer.score - 1;    
  }

}
