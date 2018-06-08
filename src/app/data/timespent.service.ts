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

    public calculateTimeSpent(startTime: String, endTime: String, startDate: String, endDate: String) {
    let workTime: string;
    let timeSpentH: number;
    let timeSpentMin: number;
    let startTimeH: number = parseInt(startTime.substring(0, 2));
    let startTimeMin: number = parseInt(startTime.substring(3, 5));

    let endTimeH: number = parseInt(endTime.substring(0, 2));
    let endTimeMin: number = parseInt(endTime.substring(3, 5));
    // if (this.validTimePeriod) {
      if (endTimeMin >= startTimeMin) {
        timeSpentMin = endTimeMin - startTimeMin;
        timeSpentH = endTimeH - startTimeH;
      } else {
        timeSpentMin = endTimeMin - startTimeMin + 60;
        timeSpentH = endTimeH - startTimeH - 1;
      }

      if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
        workTime = '0' + timeSpentH + ':0' + timeSpentMin;
      } else if ((timeSpentH.toString()).length < 2) {
        workTime = '0' + timeSpentH + ':' + timeSpentMin;
      } else if ((timeSpentMin.toString()).length < 2) {
        workTime = timeSpentH + ':0' + timeSpentMin;
      } else {
        workTime = timeSpentH + ':' + timeSpentMin;
      }
    // // } else {
      if (startDate !==  endDate) {
      if (endTimeMin < startTimeMin) {
        timeSpentMin = (endTimeMin + 60) - startTimeMin;
        timeSpentH = (endTimeH + 23) - startTimeH;
      
      } else if (endTimeMin === startTimeMin) {
        timeSpentMin = endTimeMin - startTimeMin;
        timeSpentH = (endTimeH + 24) - startTimeH;
      } else {
        timeSpentH = ((endTimeH + 24) - startTimeH);
        timeSpentMin = endTimeMin - startTimeMin;
      } 
      if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
        workTime = '0' + timeSpentH + ':0' + timeSpentMin;
      } else if ((timeSpentH.toString()).length < 2) {
        workTime = '0' + timeSpentH + ':' + timeSpentMin;
      } else if ((timeSpentMin.toString()).length < 2) {
        workTime = timeSpentH + ':0' + timeSpentMin;
      } else {
        workTime = timeSpentH + ':' + timeSpentMin;
      }
    }
    return workTime;
  }
}
