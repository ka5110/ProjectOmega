import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './mock-customers';
import {Observable, of, pipe} from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  constructor() { }

  newID(): number {
    const hashId = uuidv4();
    return hashId;
  }

  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMERS)
  }

  createCustomerRecord(customer: Customer): Observable<any> {
    CUSTOMERS.push(customer);
    console.log(CUSTOMERS[CUSTOMERS.length - 1])
    return of(CUSTOMERS[CUSTOMERS.length - 1]);
  }

  updateCustomerRecord(idOrName: any, column: string, newEntry: string): Observable<any> {
    let i = 0;
    while (i < CUSTOMERS.length) { // scan customer records
      if (idOrName === CUSTOMERS[i].id && CUSTOMERS[i].hasOwnProperty(column)) { // check if the id exists + column is correct
        CUSTOMERS[i][column] = newEntry; // select record by array position then change property base on column
        return of(CUSTOMERS[i]); // observable return here
      }
      else if (idOrName === CUSTOMERS[i].name && CUSTOMERS[i].hasOwnProperty(column)) {
        CUSTOMERS[i][column] = newEntry;
        return of(CUSTOMERS[i]);
      }
      i++;
    }
    console.log('Error, entry not found.');
  }

  deleteCustomerRecord(idOrName: any): Observable<any> {
    for (const cust of CUSTOMERS) { // scan customer records
      if (idOrName === CUSTOMERS[CUSTOMERS.indexOf(cust)].id) { // check if the id exists
        return of(CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1)); // delete entry, observable return
      }
      else if (idOrName === CUSTOMERS[CUSTOMERS.indexOf(cust)].name) {
        return of(CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1));
      }
    }
    console.log('Error, entry not found.');
  }
}
