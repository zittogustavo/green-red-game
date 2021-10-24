import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NAVIGATION_PATH } from '../../const/navigation.const';
import { UserService } from '../../services/user/user.service';

const usersKey = 'users-list';
let users = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });
  public gameUrl = NAVIGATION_PATH.GAME;

  constructor(
    private readonly fb: FormBuilder,
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {

  }

  public onSubmit() {
    if (this.form.invalid) {
      alert("You need to provide a valid name to join the game");
    } else {
      const userName = this.form.get("name")?.value;      
      
      if (this._userService.register(userName)) {
        this._router.navigate([this.gameUrl, this._userService.user]);
      }

    }
  }

}
