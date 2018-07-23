import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';
import { IUser, RegistryService } from '../data';

@Injectable()
export class DatesService {

  constructor(
    public registryService: RegistryService) { }

  public currentDateValue(value: any) {
    var validDate = moment(value._selected).format('L');
    return validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
  }

  public isValidDate(inputFromDate, inputToDate) {
    return this.registryService.dateRequirement.test(inputFromDate) && this.registryService.dateRequirement.test(inputToDate) ? true : false;
  }

  public isValidDatePeriod(fromDate, toDate) {
    return moment(fromDate, 'YYYY-MM-DD').isSameOrBefore(moment(toDate, 'YYYY-MM-DD'));;
  }

  public convertDaysToHours(fromDate, toDate) {
    var fromDateDay = +fromDate.substring(0, 2);
    var toDateDay = +toDate.substring(0, 2);
    var numberOfdays = toDateDay - fromDateDay;
    var numberOfHours = numberOfdays * 24;
    return numberOfHours;
  }
}
