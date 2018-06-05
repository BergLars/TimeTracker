import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';
import { sscanf } from 'scanf';
import { sprintf } from 'sprintf-js';

@Injectable()
export class TimespentService {
  constructor() { }

  // Calculate total time spent
  public totalTimeSpent(entries) {
    let hours = 0;
    let minutes = 0;
    entries.forEach(element => {
      let timeComponents = sscanf(element, "%d:%d");
      hours += +timeComponents[0];
      minutes += +timeComponents[1];
    });

    let timeSpents = sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return timeSpents;
  }

  // calculate timeSpent for each entry in items and format it correctly
  calculateEntriesTimeSpent(items) {
    items.forEach(entry => {
      let hourWorktime = 0;
      let minuteWorktime = 0;
      let hourTraveltime = 0;
      let minuteTraveltime = 0;
      let worktime = entry.worktime.value;
      let traveltime = entry.traveltime.value;
      if (worktime.length < 5) {
        worktime = '0' + worktime;
      }
      if (traveltime.length < 5) {
        traveltime = '0' + traveltime;
      }
      if (traveltime === '00:00') {
        entry.timeSpent = worktime;
      } else {
        let workTime = sscanf(worktime, '%d:%d');
        hourWorktime += +workTime[0];
        minuteWorktime += +workTime[1];
        let travelTime = sscanf(traveltime, '%d:%d');
        hourTraveltime += +travelTime[0];
        minuteTraveltime += +travelTime[1];
        if (minuteWorktime < minuteTraveltime) {
          let realTime = sprintf('%02d:%02d', hourWorktime - hourTraveltime - 1, Math.abs(minuteWorktime - minuteTraveltime));
          entry.timeSpent = realTime;
        } else {
          let realTime = sprintf('%02d:%02d', hourWorktime - hourTraveltime, minuteWorktime - minuteTraveltime);
          entry.timeSpent = realTime;
        }
      }
    });
  }
}
