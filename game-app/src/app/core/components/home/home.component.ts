import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {

  }

  public onSubmit(): void {
    if (this.form.invalid) {
      alert("You need to provide a valid name to join the game");
    } else {
      const userName = this.form.get("name")?.value;      
      
      if (this._userService.register(userName)) {
        this._router.navigate([NAVIGATION_PATH.GAME, this._userService.user]);
      }

    }
  }

}
