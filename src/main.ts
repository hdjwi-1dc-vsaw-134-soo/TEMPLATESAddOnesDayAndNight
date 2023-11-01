/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {parseCronExpression} from "cron-schedule";
import {TimerBasedCronScheduler as scheduler} from "cron-schedule/schedulers/timer-based.js";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    // Julia custom

    // At 19:00, turn on night
    const cronStartNight = parseCronExpression('0 10 * * *');
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
    const startNight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0, 0);
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


    }).catch(e => console.error(e));


export {};
