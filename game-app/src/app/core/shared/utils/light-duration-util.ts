import { Injectable } from "@angular/core";
import { COMMOMS } from "../const/common.const";
import { UserData } from "../../models/entities/user/user-data-dto.model";

@Injectable({
	providedIn: 'root',
})
export class LightDurationUtil {

    //Set counter for traffic light
    static getLightCounter(lightCounter: number, player: UserData, currentColor : string): number {
        return currentColor == 'red' ? COMMOMS.RED_DEFAULT_TIME : (player.score < 1 ? COMMOMS.GREEN_MAX_TIME : this.greenDuration(player, lightCounter));
    }

    //Only get the duration that can have the green traffic light
    static greenDuration(player: UserData, lightCounter: number): number {
        const duration = lightCounter <= COMMOMS.GREEN_MIN_TIME ? 
        COMMOMS.GREEN_MIN_TIME : 
        Math.max(COMMOMS.GREEN_MAX_TIME - player.score * 100, COMMOMS.GREEN_MIN_TIME) + this.getCustomVariation();   

        //check duration again cause customVariation can return less time than GREEN_MIN_TIME
        return duration >= COMMOMS.GREEN_MIN_TIME ? duration : COMMOMS.GREEN_MIN_TIME;
    }

    static getCustomVariation(): number {
        return (Math.random() * (-COMMOMS.RAND_VARIATION_TIME - COMMOMS.RAND_VARIATION_TIME + 1) - COMMOMS.RAND_VARIATION_TIME)
    }
}