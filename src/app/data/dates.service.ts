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
    return moment(toDate, 'YYYY-MM-DD').isBefore(moment(fromDate, 'YYYY-MM-DD'));;
  }
}
