import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { EmpCardComponent } from './emp-card/emp-card.component';
import { FormsModule } from '@angular/forms';
import { IEmployee } from '../../interfaces/employee-interface';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, EmpCardComponent, FormsModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  employeeData$: Observable<IEmployee[]> = new Observable();
  Object: any = Object;
  filterCriteria: any = [
    { key: 'name', val: 'Name' },
    { key: 'role', val: 'Role' },
    { key: 'email', val: 'Email' },
    { key: 'companyName', val: 'Team' },
  ];
  searchString: string = '';
  currentFilter: string = 'name';
  empResArray: IEmployee[] = [];
  subscriptionArray: Subscription[] =[];
  constructor(private dataService: DataService) {
    this.employeeData$ = this.dataService.getEmployees();
  }
  ngAfterViewInit(): void {
    this.subscriptionArray.push(this.dataService.getEmployees().subscribe((res: IEmployee[]) => {
      this.empResArray = res;
    }));
  }
  onFilterChange(event: any) {
    this.searchString = '';
    this.currentFilter = event?.target?.value;
  }
  filterSearch() {
    this.subscriptionArray.push(this.employeeData$
      ?.pipe(debounceTime(1000),
      distinctUntilChanged(),
        map((empArr: IEmployee[]) =>
          empArr?.filter((item: any) => {
            if (this.searchString != '')
              return item[this.currentFilter]
                ?.toLocaleLowerCase()
                ?.includes(this.searchString?.toLocaleLowerCase());
            return item;
          })
        )
      )
      ?.subscribe((res: IEmployee[]) => {
        this.empResArray = res;
      }));
  }
   ngOnDestroy(): void {
     if(this.subscriptionArray?.length > 0){
      this.subscriptionArray?.forEach((sub: Subscription) => sub.unsubscribe());
     }
   }
}
