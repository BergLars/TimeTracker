import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';
import { sprintf } from 'sprintf-js';

@Injectable()
export class TimespentService {
  constructor() { }

  // calculate timeSpent for each entry in items and format it correctly
  calculateEntriesTimeSpent(items) {
    items.forEach(entry => {
      let worktime = entry.worktime.value;
      let traveltime = entry.traveltime.value;
      let hourWorktime = 0;
      let minuteWorktime = 0;
      let hourTraveltime = 0;
      let minuteTraveltime = 0;
      if (worktime.length < 5) {
        worktime = '0' + worktime;
      }
      if (traveltime.length < 5) {
        traveltime = '0' + traveltime;
      }
      hourWorktime += +worktime.substring(0, 2);
      minuteWorktime += +worktime.substring(3, 6);
      hourTraveltime += +traveltime.substring(0, 2)
      minuteTraveltime += +traveltime.substring(3, 6);
      let realTime = sprintf("%02d:%02d", Math.floor((hourWorktime + hourTraveltime) + Math.abs((minuteWorktime + minuteTraveltime) / 60)), (minuteWorktime + minuteTraveltime) % 60);
      entry.timeSpent = realTime;
    });
  }

  calculateEntryTimeSpent(event, cell, cellValue, row) {
    let decimalTime = parseFloat(moment.duration(event.target.value).asHours());
    let decimalStartTime = parseFloat(moment.duration(row.startTime).asHours());
    let totalDecimalEndTime = Number(decimalTime + decimalStartTime);
    totalDecimalEndTime = totalDecimalEndTime * 60 * 60;
    let hours: any = Math.floor((totalDecimalEndTime / (60 * 60)));
    totalDecimalEndTime = totalDecimalEndTime - (hours * 60 * 60);
    let minutes: any = Math.floor((totalDecimalEndTime / 60));

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let numberOfDays = Math.floor(hours / 24);
    let hoursEndTime = hours % 24;
    let longEndDate = moment(row.startDateTime, 'YYYY-MM-DD HH:mm').add(numberOfDays, 'd');
    let validFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');
    if (hoursEndTime < 10) {
      hours = "0" + hoursEndTime;
    }
    else {
      hours = hoursEndTime;
    }
    let endTime = hours + ':' + minutes;
    row.startDateTime = row.startDateTime;
    row.endDateTime = validFormatEndDate + ' ' + endTime;
    row.endTime = moment(row.endDateTime).format('HH:mm');
    row.endDate = validFormatEndDate.substring(8, 10) + '.' + validFormatEndDate.substring(5, 7) + '.' + validFormatEndDate.substring(0, 4);
    row.timeSpent = event.target.value;
    let hourTimespent = 0;
    let minuteTimespent = 0;
    let hourTraveltime = 0;
    let minuteTraveltime = 0;
    let realTime = null;
    hourTimespent += +event.target.value.substring(0, 2);
    minuteTimespent += +event.target.value.substring(3, 6);
    if (row.traveltime.value.length < 5) {
      row.traveltime.value = '0' + row.traveltime.value;
    }
    hourTraveltime += +row.traveltime.value.substring(0, 2)
    minuteTraveltime += +row.traveltime.value.substring(3, 6);
    if (minuteTimespent > minuteTraveltime) {
      realTime = sprintf("%02d:%02d", hourTimespent - hourTraveltime, minuteTimespent - minuteTraveltime);
      row.worktime.value = realTime;
    }
    else {
      if (minuteTimespent > minuteTraveltime) {
        realTime = sprintf("%02d:%02d", Math.floor((hourTimespent - hourTraveltime) + Math.abs((minuteTimespent + minuteTraveltime) / 60)), minuteTraveltime - (Math.abs((minuteTimespent - minuteTraveltime) % 60)));
        row.worktime.value = realTime;
      }
      else {
        let minutes = (60 + minuteTimespent) - minuteTraveltime;
        if (minutes > 59) {
          realTime = sprintf("%02d:%02d", Math.floor((hourTimespent - hourTraveltime) + Math.abs((minuteTimespent + minuteTraveltime) / 60)), ((60 + minuteTimespent) - minuteTraveltime) % 60);
          row.worktime.value = realTime;
        }
        else {
          realTime = sprintf("%02d:%02d", Math.floor((hourTimespent - hourTraveltime) - 1), (60 + minuteTimespent) - minuteTraveltime);
          row.worktime.value = realTime;
        }
      }
    }
  }

  public calculateTotalTimeSpent(entries) {
    let hours = 0;
    let minutes = 0;
    entries.forEach(element => {
      hours += +element.timeSpent.substring(0, 2);
      minutes += +element.timeSpent.substring(3, 6);

    });
    let timeSpents = sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return timeSpents;
  }

  // Calcul total time spent of the current Week
  public totalTimeSpentW(timeSpents) {
    let hours = 0;
    let minutes = 0;
    timeSpents.forEach(element => {
      hours += +element.substring(0, 2);
      minutes += +element.substring(3, 6);
    });
    let result = sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return result;
  }

  // Calcul total time spent of the current Month
  public totalTimeSpentMonth(timeSpents) {
    let hours = 0;
    let minutes = 0;
    timeSpents.forEach(element => {
      hours += +element.substring(0, 2);
      minutes += +element.substring(3, 6);
    });
    let result = sprintf("%02d:%02d", hours + Math.round(minutes / 60), minutes % 60);
    return result;
  }
}
