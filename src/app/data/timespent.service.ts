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
      worktime = this.addCorrectTimeFormat(worktime);
      traveltime = this.addCorrectTimeFormat(traveltime);
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
    hours = sprintf("%02d", hours);
    minutes = sprintf("%02d", minutes);

    let numberOfDays = Math.floor(hours / 24);
    let hoursEndTime = hours % 24;
    let longEndDate = moment(row.startDateTime, 'YYYY-MM-DD HH:mm').add(numberOfDays, 'd');
    let validFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');

    hours = sprintf("%02d", hoursEndTime);
    let endTime = hours + ':' + minutes;
    row.startDateTime = row.startDateTime;
    row.endDateTime = validFormatEndDate + ' ' + endTime;
    row.endTime = moment(row.endDateTime).format('HH:mm');
    row.endDate = validFormatEndDate.substring(8, 10) + '.' + validFormatEndDate.substring(5, 7) + '.' + validFormatEndDate.substring(0, 4);
    row.timeSpent = event.target.value;
    row.worktime.value = this.calculateWorktime(event.target.value, row.traveltime.value);
  }

  // Set work time value on editing time spent
  calculateWorktime(timespent, traveltime) {
    let hourTimespent = 0;
    let minuteTimespent = 0;
    let hourTraveltime = 0;
    let minuteTraveltime = 0;

    // Get time spent value
    hourTimespent += +timespent.substring(0, 2);
    minuteTimespent += +timespent.substring(3, 6);

    // Get travel time value
    traveltime = this.addCorrectTimeFormat(traveltime);

    hourTraveltime += +traveltime.substring(0, 2)
    minuteTraveltime += +traveltime.substring(3, 6);

    // Compare time spent and travel time minute values
    if (minuteTimespent < minuteTraveltime && hourTimespent < hourTraveltime) {
      return;
    }
    return (minuteTimespent < minuteTraveltime) ?
      sprintf("%02d:%02d", hourTimespent - hourTraveltime - 1, 60 + minuteTimespent - minuteTraveltime) :
      sprintf("%02d:%02d", hourTimespent - hourTraveltime, minuteTimespent - minuteTraveltime);
  }

  calculateWorktimeBetweenDates(startDateTime, endDateTime) {
    var start = new moment(startDateTime);
    var end = new moment(endDateTime);
    var durationMS = moment.duration(end.diff(start));
    var durationD = durationMS._data.days;
    var durationDtoH;
    if (durationD  > 0) {
      durationDtoH = durationD  * 24;
    } else {
      durationDtoH = 0;
    }
    var durationH = durationMS._data.hours + durationDtoH;
    var durationMin = durationMS._data.minutes;
    if (durationH < 10) {
      durationH = "0" + durationH;
    }
    if (durationMin < 10) {
      durationMin = "0" + durationMin;
    }
    var workTime = durationH + ":" + durationMin;

    return workTime;
  }

  addCorrectTimeFormat(term) {
    return term.length < 5 ? '0' + term : term;
  }

  calculateTotalTimeSpent(entries) {
    let hours = 0;
    let minutes = 0;
    entries.forEach(element => {
      hours += +element.timeSpent.substring(0, 2);
      minutes += +element.timeSpent.substring(3, 6);
    });
    let timeSpents = sprintf("%02d:%02d", (hours + Math.floor(minutes / 60)), minutes % 60);
    return timeSpents;
  }

  // Calcul total time spent of the current Month, week 4 past days and today
  public sidebarTotalTimeSpent(timeSpents) {
    let hours = 0;
    let minutes = 0;
    timeSpents.forEach(element => {
      hours += +element.substring(0, 2);
      minutes += +element.substring(3, 6);
    });
    let result = sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return result;
  }

  isValidTimePeriod(starttime, endtime) {
    return moment(starttime, 'HH:mm').isSameOrBefore(moment(endtime, 'HH:mm'));;
  }
}
