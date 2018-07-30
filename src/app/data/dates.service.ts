import { Injectable } from '@angular/core';
import moment from 'moment/src/moment';
import { RegistryService } from '../data';
import * as _ from 'lodash';

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
    fromDate = fromDate.substring(6, 10) + "-" + fromDate.substring(3, 5) + "-" + fromDate.substring(0, 2);
    toDate = toDate.substring(6, 10) + "-" + toDate.substring(3, 5) + "-" + toDate.substring(0, 2);
    return moment(fromDate, 'YYYY-MM-DD').isSameOrBefore(moment(toDate, 'YYYY-MM-DD'));;
  }

  public convertDaysToHours(fromDate, toDate) {
    var fromDateDay = +fromDate.substring(0, 2);
    var toDateDay = +toDate.substring(0, 2);
    var numberOfdays = toDateDay - fromDateDay;
    var numberOfHours = numberOfdays * 24;
    return numberOfHours;
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