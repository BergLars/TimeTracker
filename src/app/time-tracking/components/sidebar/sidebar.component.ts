import { Component, OnInit, Input } from '@angular/core';
import { ITimeTrackingEntry, IStatistics, RegistryService, TimespentService } from '../../../data';
import { EntriesService } from '../entries/entries.service';
import moment from 'moment/src/moment';
import { elementAt } from 'rxjs/operator/elementAt';

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
  @Input() totalTimeSpent: any;
  public total: string;

  private sscanf = require('scanf').sscanf;
  private sprintf = require("sprintf-js").sprintf;

  constructor(private entriesService: EntriesService, public registryService: RegistryService, public timespentService: TimespentService) {
    this.registryService.sidebarComponent = this;
  }
  ngOnInit() {
    this.total = 'Total';
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
      this.totalHoursWorkedWeek(results);
      this.totalHoursWorkedMonth(results);
      this.totalTimeSpent = this.entriesService.totalTimeSpent;
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
    let hours = 0;
    let minutes = 0;
    timeSpents.forEach(element => {
      let timeComponents = this.sscanf(element, "%d:%d");
      hours += timeComponents[0];
      minutes += timeComponents[1];
    });
    let result = this.sprintf("%02d:%02d", hours + Math.abs(minutes / 60), minutes % 60);
    return this.totalHoursWorkedW = result;
  }

  // Calcul total time spent of the current Month
  public totalTimeSpentMonth(timeSpents) {
    let hours = 0;
    let minutes = 0;
    timeSpents.forEach(element => {
      let timeComponents = this.sscanf(element, "%d:%d");
      hours += timeComponents[0];
      minutes += timeComponents[1];
    });
    let result = this.sprintf("%02d:%02d", hours + Math.round(minutes / 60), minutes % 60);
    return this.totalHoursWorkedM = result;
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
