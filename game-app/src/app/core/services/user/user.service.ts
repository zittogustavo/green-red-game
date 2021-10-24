import { Injectable } from "@angular/core";
import { UserData } from "../../models/entities/user/user-data-dto.model";

// array in local storage for registered users
const usersKey = 'users-list';
let users = JSON.parse(localStorage.getItem(usersKey)!);


@Injectable({
	providedIn: 'root',
})

export class UserService {
    private _user!: UserData;

    public register(userName: string): UserData {    
        users = users.length? users : [];
        if (this.exist(userName)) {
            this.user = this.exist(userName);
        } else {
            this.user = new UserData(userName);
            users.push(this.user);
            localStorage.setItem(usersKey, JSON.stringify(users));  
        }

        return this.user;
    }

    public updateUser() {
        // let params = body;
        // let user = users.find(x => x.id === idFromUrl());

        // // update and save user
        // Object.assign(user, params);
        // localStorage.setItem(usersKey, JSON.stringify(users));
    }

    /** Getter user property */
	public get user(): UserData {
		return this._user;
	}

	/** Setter user property */
	public set user(user: UserData) {
		this._user = user;
	}

    private exist(userName: string): UserData {
        return users.find((x: UserData) => x.name === userName);
    }
}