import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';

@Injectable()
export class TimespentService {
  private sscanf = require('scanf').sscanf;
  private sprintf = require("sprintf-js").sprintf;
  constructor() { }

  // Calculate time spent on inline editing
  public calculateInlineFieldTimeSpent(row) {
    let timeSpent: string;
    let timeSpentH: number;
    let timeSpentMin: number;
    let startTimeH: number = parseInt(row.startTime.substring(0, 2));
    let startTimeMin: number = parseInt(row.startTime.substring(3, 5));

    let endTimeH: number = parseInt(row.endTime.substring(0, 2));
    let endTimeMin: number = parseInt(row.endTime.substring(3, 5));
    if (endTimeMin >= startTimeMin) {
      timeSpentMin = endTimeMin - startTimeMin;
      timeSpentH = endTimeH - startTimeH;
    } else {
      timeSpentMin = endTimeMin - startTimeMin + 60;
      timeSpentH = endTimeH - startTimeH - 1;
    }

    if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
      timeSpent = '0' + Math.abs(timeSpentH) + ':0' + timeSpentMin;
    }
    else if ((timeSpentH.toString()).length < 2) {
      timeSpent = '0' + Math.abs(timeSpentH) + ':' + timeSpentMin;
    }
    else if ((timeSpentMin.toString()).length < 2) {
      timeSpent = Math.abs(timeSpentH) + ':0' + timeSpentMin;
    } else {
      timeSpent = Math.abs(timeSpentH) + ':' + timeSpentMin;
    }
    return timeSpent;
  }

  // Calculate total time spent
  public totalTimeSpent(entries) {
    let hours = 0;
    let minutes = 0;
    entries.forEach(element => {
      let timeComponents = this.sscanf(element, "%d:%d");
      hours += timeComponents[0];
      minutes += timeComponents[1];
    });

    let timeSpents = this.sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return timeSpents;
  }

  // calculate timeSpent for each entry in items and format it correctly
  calculateEntriesTimeSpent(items) {
    items.forEach(entry => {
      let ms = moment(entry.startDateTime, "YYYY-MM-DD HH:mm").diff(moment(entry.endDateTime, "YYYY-MM-DD HH:mm"));
      let d = moment.duration(Math.abs(ms));
      let s = Math.floor(d.asHours()) + moment.utc(Math.abs(ms)).format(":mm");
      if (s.length < 5) {
        entry.timeSpent = '0' + s;
      }
      else {
        entry.timeSpent = s;
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
