import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { COMMOMS } from '../../const/common.const';
import { NAVIGATION_PATH } from '../../const/navigation.const';
import { UserData } from '../../models/entities/user/user-data-dto.model';
import { UserService } from '../../services/user/user.service';
import { LightDurationUtil } from '../../shared/utils/light-duration-util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('light') light!: ElementRef<HTMLElement>;
  public actualPlayer: UserData = new UserData("");
  public NAVIGATION_PATH = NAVIGATION_PATH;

  private lastStep: boolean = true;
  private isFirstStep: boolean = true;
  private lightCounter: number = COMMOMS.RED_DEFAULT_TIME;
  
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

  ngAfterViewInit(): void {
    this.light.nativeElement.style.color = 'red';
    setTimeout(() => {
      this.setLight();
    }, COMMOMS.RED_DEFAULT_TIME);    
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.actualPlayer.maxScore = this.actualPlayer.score > this.actualPlayer.maxScore ? this.actualPlayer.score : this.actualPlayer.maxScore;
    this._userService.updateUser(this.actualPlayer);
  }

  public step(step: boolean) {
    //First step is used because player can start the game with left or right foot
    if (this.light.nativeElement.style.color == 'green' && (this.isFirstStep || this.lastStep !== step)) {
      this.addPoint();
    } else {
      this.light.nativeElement.style.color == 'red' ? this.actualPlayer.score = 0 : this.removePoint();
      
    }
    this.actualPlayer.maxScore = this.actualPlayer.score > this.actualPlayer.maxScore ? this.actualPlayer.score : this.actualPlayer.maxScore;
    this._userService.updateUser(this.actualPlayer);
    this.lastStep = step;
    this.isFirstStep = false;
  }

  private addPoint(): void {
    this.actualPlayer.score++;    
  }

  private removePoint(): void {
    //avoid negative score
    if (this.actualPlayer.score > 0) {
      this.actualPlayer.score--; 
    }       
  }

  private setLight(): void {
    this.light.nativeElement.style.color = this.light.nativeElement.style.color == 'red' ? 'green' : 'red';
    this.lightCounter = LightDurationUtil.getLightCounter(this.lightCounter, this.actualPlayer, this.light.nativeElement.style.color);
    
    //recursive
    setTimeout(() => {
      this.setLight();
    }, this.lightCounter);
  }

  

}

