/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {parseCronExpression} from "cron-schedule";
import {TimerBasedCronScheduler as scheduler} from "cron-schedule/schedulers/timer-based.js";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

 // Julia custom

// At 19:00, turn on night
const cronStartNight = parseCronExpression('0 19 * * *');
scheduler.setInterval(cronStartNight, () => {
    WA.room.showLayer("night");
    WA.room.showLayer("light");
});

// At 7:00, turn on day
const cronStartDay = parseCronExpression('0 7 * * *');
scheduler.setInterval(cronStartDay, () => {
    WA.room.hideLayer("night");
    WA.room.hideLayer("light");
});

// If the player enters the room between 19:00 and 7:00, turn on night
const date = new Date();
const startNight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0, 0);
const startDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
if (date < startNight || date > startDay) {
    console.log(startDay)
    console.log(startNight)
    console.log(date)
    console.log(date < startNight)
    console.log(date > startDay)
    WA.room.hideLayer("night");
    WA.room.hideLayer("light");
    console.log(date < startNight || date > startDay)
}

    WA.room.onEnterLayer("floor").subscribe(() => {
        WA.room.hideLayer("roof");
        WA.room.hideLayer("sign");
        WA.room.hideLayer("walls-bg-front")
      });
      
    WA.room.onLeaveLayer("floor").subscribe(() => {
        WA.room.showLayer("roof");
        WA.room.showLayer("sign");
        WA.room.showLayer("walls-bg-front")
      });

          WA.room.onEnterLayer("rooms_floor").subscribe(() => {
        WA.room.hideLayer("facade");
        WA.room.hideLayer("facade-furniture-fg");
        WA.room.hideLayer("facade-furniture-bg");
      });
      
    WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
        WA.room.showLayer("facade");
        WA.room.showLayer("facade-furniture-fg");
        WA.room.showLayer("facade-furniture-bg")
      });
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
