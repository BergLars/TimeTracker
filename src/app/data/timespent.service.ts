import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';

@Injectable()
export class TimespentService {
  public itemTotalTimeSpent: any;
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
    let endTimeH: number = 0;
    let endTimeMin: number = 0;
    let hour: number = 0;
    let timeSpent: any;
    entries.forEach(entry => {
      endTimeH = endTimeH + parseInt(entry.timeSpent.substring(0, 2));
      endTimeMin = endTimeMin + parseInt(entry.timeSpent.substring(3, 5));
    });

    //Handle conversion Minute over 60mn to 1h
    if (endTimeMin > 60) {
      hour = Math.floor(endTimeMin / 60);
      endTimeH = endTimeH + hour;
      endTimeMin = Math.abs(endTimeMin - (60 * hour));
      if ((endTimeH.toString()).length < 2 && (endTimeMin.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':0' + endTimeMin;
      }
      else if ((endTimeH.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':' + endTimeMin;
      }
      else if ((endTimeMin.toString()).length < 2) {
        timeSpent = endTimeH + ':0' + endTimeMin;
      } else {
        timeSpent = endTimeH + ':' + endTimeMin;
      }
      return timeSpent;
    }
    // Handle Minute below 60mn
    else {
      if ((endTimeH.toString()).length < 2 && (endTimeMin.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':0' + endTimeMin;
      }
      else if ((endTimeH.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':' + endTimeMin;
      }
      else if ((endTimeMin.toString()).length < 2) {
        timeSpent = endTimeH + ':0' + endTimeMin;
      } else {
        timeSpent = endTimeH + ':' + endTimeMin;
      }
      return timeSpent;
    }
  }

  // calculate timeSpent for each entry in items and format it correctly
  entryTimeSPent(items) {
    items.forEach(function (entry) {
      let ms = moment(entry.entryDate + ' ' + entry.startTime, "DD.MM.YYYY HH:mm").diff(moment(entry.endDate + ' ' + entry.endTime, "DD.MM.YYYY HH:mm"));
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

  // Map projectName, taskDescription, clientName and entryDate of each entry for Filter
  public mapEntryValue(items) {
    items.forEach(function (entry) {
      entry.projectName = entry.project.projectName;
      entry.taskDescription = entry.task.taskDescription;
      entry.clientName = entry.client.clientName;
      entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
      entry.startTime = entry.startDateTime.substring(11, 16);
      entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
      entry.endTime = entry.endDateTime.substring(11, 16);
    }).then(results => {
      this.entryTimeSPent(results);
      this.itemTotalTimeSpent = this.totalTimeSpent(results);
    });
  }

  // Map timeSpent of each entry for Sidebar
  public mapCurrentWeekMonthEntryValue(items) {
    items.forEach(function (entry) {
      entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
      entry.startTime = entry.startDateTime.substring(11, 16);
      entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
      entry.endTime = entry.endDateTime.substring(11, 16);
    });
    this.entryTimeSPent(items);
  }

  // Map projectName, taskDescription, clientName and entryDate of each entry for loading entries
  public mapEntryValueToSetColor(items) {
    items.forEach(function (entry) {
      entry.projectName = entry.project.projectName;
      entry.taskDescription = entry.task.taskDescription;
      entry.clientName = entry.client.clientName;
      entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
      entry.startTime = entry.startDateTime.substring(11, 16);
      entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
      entry.endTime = entry.endDateTime.substring(11, 16);
    });
    this.entryTimeSPent(items);
    this.itemTotalTimeSpent = this.totalTimeSpent(items);
    this.setColor(items);
  }

  // Set orange color of an entry over 1 day
  setColor(items) {
    items.forEach(function (entry) {
      let startDateTime = moment().format(entry.startDateTime, 'yyyy-MM-dd HH:mm:ss');
      let endDateTime = moment().format(entry.endDateTime, 'yyyy-MM-dd HH:mm:ss');

      // Split to catch the startDate and endDate
      let start = startDateTime.split(" ");
      let end = endDateTime.split(" ");

      // Compare start and endDate are not the same
      if (moment(start[0], 'YYYY-MM-DD').isBefore(moment(end[0], 'YYYY-MM-DD'))) {
        entry.isColored = true;
      }
      else {
        entry.isColored = false;
      }
    });
  }
}
