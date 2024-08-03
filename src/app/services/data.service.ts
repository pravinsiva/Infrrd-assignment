import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { sampleAvtr, sampleAvtr2 } from '../models/data-model';
import { IEmployee, IEmpData } from '../interfaces/employee-interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  empData: IEmployee[] = [
    {
      id: this.generateUniqueId(),
      name: 'Praveen',
      companyName: 'Telus',
      email: 'praveens@xy.in',
      phone: '+918889999111',
      role: 'Technical Lead',
      avtr: {data: {name: 'sample1.png'}, imgSrc: sampleAvtr},
    },
    {
      id: this.generateUniqueId(),
      name: 'Santhos',
      companyName: 'Telus',
      email: 'san@xy.in',
      phone: '+918881116777',
      role: 'Manager',
      avtr: {data: {name: 'sample2.png'}, imgSrc: sampleAvtr2},
    },
    {
      id: this.generateUniqueId(),
      name: 'Sriram',
      companyName: 'Conga',
      email: 'sr@xy.in',
      phone: '+918881116722',
      role: 'Senior Software Developer',
      avtr: {data: {name: 'sample3.png'}, imgSrc: sampleAvtr2},
    },
  ];
  enableModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalID: any = '';
  constructor() {
    this.employeeDataSubject?.subscribe((empData: IEmpData) => {
      const empIndex: number = this.empData?.findIndex(
        (item: IEmployee) => item.id === empData?.empDetails?.id
      );
      switch (empData?.type) {
        case 'add':
          this.empData?.push(empData?.empDetails);
          break;
        case 'edit':
          if (empIndex > -1) {
            this.empData.splice(empIndex, 1, empData?.empDetails);
          }
          break;
        case 'delete':
          if (empIndex > -1) {
            this.empData.splice(empIndex, 1);
          }
          break;
        default:
          return;
      }
    });
  }
  employeeDataSubject: BehaviorSubject<any> = new BehaviorSubject({});

  getEmployees() {
    return of(this.empData);
  }
  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}


