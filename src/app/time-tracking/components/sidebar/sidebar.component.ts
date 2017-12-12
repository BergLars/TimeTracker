import { Component, OnInit, Input } from '@angular/core';
import { ITimeTrackingEntry, IStatistics, RegistryService, TimespentService } from '../../../data';
import { EntriesService } from '../entries/entries.service';
import moment from 'moment/src/moment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() items: ITimeTrackingEntry[] = [];
  @Input() currentMonth: any;
  @Input() weekNumber: any;
  @Input() totalHoursWorkedW: any;
  @Input() totalHoursWorkedM: any;
  @Input() totalAvailableVacationDays: any;
  public startOfWeek: any;
  public endOfWeek: any;
  public startOfMonth: any;
  public endOfMonth: any;

  constructor(private entriesService: EntriesService, public registryService: RegistryService, public timespentService: TimespentService) {
    this.registryService.sidebarComponent = this;
  }
  ngOnInit() {
    this.getCurrentDayWeekMonth();
    this.displaySidebarData();
  }

  getCurrentDayWeekMonth() {
    this.currentMonth = moment().startOf("month").format('MMMM');
    this.startOfMonth = moment().startOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.endOfMonth = moment().endOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.startOfWeek = moment().startOf('week').format('DD.MM.YYYY');
    this.endOfWeek = moment().endOf('week').format('DD.MM.YYYY');
    const today = moment().format('DD.MM.YYYY');
    this.weekNumber = moment(today, 'DD.MM.YYYY').isoWeek();
    this.totalAvailableVacationDays = '*_*';
  }

  displaySidebarData() {
    this.entriesService.entriesAreLoaded().then(results => {
      this.timespentService.mapCurrentWeekMonthEntryValue(results);
      this.totalHoursWorkedWeek(results);
      this.totalHoursWorkedMonth(results);
    });
  }

  totalHoursWorkedWeek(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      // Check if entry date is between the start and the end of the current Week
      // If yes, add it to an array
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfWeek, 'DD.MM.YYYY'), moment(this.endOfWeek, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    this.totalTimeSpentW(timeSpents);
  }

  totalHoursWorkedMonth(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      // Check if entry date is between the start and the end of the current Month
      // If yes, add it to an array
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfMonth, 'DD.MM.YYYY'), moment(this.endOfMonth, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    this.totalTimeSpentMonth(timeSpents);
  }

  // Calcul total time spent of the current Week
  public totalTimeSpentW(timeSpents) {
    if (timeSpents.length > 0) {
      let endTimeH: number = 0;
      let endTimeMin: number = 0;
      let hour: number = 0;
      let timeSpent: any;
      for (let element of timeSpents) {
        endTimeH = endTimeH + parseInt(element.substring(0, 2));
        endTimeMin = endTimeMin + parseInt(element.substring(3, 5));
        // Handle conversion Minute over 60mn to 1h
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
          this.totalHoursWorkedW = timeSpent;
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
          this.totalHoursWorkedW = timeSpent;
        }
      }
    } else {
      this.totalHoursWorkedW = '00:00';
    }
    return this.totalHoursWorkedW;
  }

  // Calcul total time spent of the current Month
  public totalTimeSpentMonth(timeSpents) {
    if (timeSpents.length > 0) {
      let endTimeH: number = 0;
      let endTimeMin: number = 0;
      let hour: number = 0;
      let timeSpent: any;
      for (let element of timeSpents) {
        endTimeH = endTimeH + parseInt(element.substring(0, 2));
        endTimeMin = endTimeMin + parseInt(element.substring(3, 5));
        // Handle conversion Minute over 60mn to 1h
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
          this.totalHoursWorkedM = timeSpent;
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
          this.totalHoursWorkedM = timeSpent;
        }
      }
    } else {
      this.totalHoursWorkedM = '00:00';
    }
    return this.totalHoursWorkedM;
  }

  getNextWeekStart() {
    var today = moment();
    //edited part
    var daystoMonday = 0 - (today.isoWeekday() - 1) + 7;
    var nextMonday = today.subtract('days', daystoMonday);

    return nextMonday;
  }

  getNextWeekEnd() {
    var nextMonday = this.getNextWeekStart();
    var nextSunday = nextMonday.add('days', 6);

    return nextSunday;
  }

  getLastWeekStart() {
    var today = moment();
    var daystoLastMonday = 0 - (1 - today.isoWeekday()) + 7;

    var lastMonday = today.subtract('days', daystoLastMonday);

    return lastMonday;
  }

  getLastWeekEnd() {
    var lastMonday = this.getLastWeekStart();
    var lastSunday = lastMonday.add('days', 6);

    return lastSunday;
  }
}
