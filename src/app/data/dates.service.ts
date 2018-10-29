import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';
import { RegistryService } from '../data';
import * as _ from 'lodash';

@Injectable()
export class DatesService {

  constructor(
    public registryService: RegistryService) { }


  public isValidDate(inputFromDate, inputToDate) {
    return this.registryService.dateRequirement.test(inputFromDate) && this.registryService.dateRequirement.test(inputToDate) ? true : false;
  }

  public isValidDatePeriod(fromDate, toDate) {
   
    return moment(fromDate).isSameOrBefore(toDate, 'YYYY-MM-DD', 'day');
  }


  public convertDaysToHours(fromDate, toDate) {
    var fromDateDay = +fromDate.substring(8, 10);
    var toDateDay = +toDate.substring(8, 10);
    var numberOfdays = toDateDay - fromDateDay;
    var numberOfHours = numberOfdays * 24;
    return numberOfHours;
  }

  public isSameDate(fromDate, toDate) {
    return moment(fromDate).isSame(toDate, 'day');
  }

  /**
    * Sort by Start date
    * @param a
    * @param b
    */

  public sortEntriesByStartDateAsc = (a, b) => {
    return moment(a, 'DD.MM.YYYY HH:mm').toDate() - moment(b, 'DD.MM.YYYY HH:mm').toDate();
  }

  public uniqValue(dates) {
    return _.uniqWith(dates, _.isEqual);
  }

  public sortBy(dates) {
    return _.sortBy(dates, function (dateObj) {
      return new Date(dateObj);
    });
  }

  public swissFormat(dates) {
    var swissDates = [];
    var count = 0;
    _.each(dates, function (value) {
      swissDates.push({ id: count++, key: moment(value).format('DD.MM.YYYY') });
    });
    swissDates.push({ id: 'All', key: 'All' });
    return swissDates.reverse();
  }
}