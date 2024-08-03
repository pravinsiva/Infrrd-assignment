import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  DataService
} from '../../../services/data.service';
import { ModalComponent } from '../../modal/modal.component';
import { EmployeeFormComponent } from '../../employee-form/employee-form.component';
import { IEmployee, IEmpData } from '../../../interfaces/employee-interface';

@Component({
  selector: 'app-emp-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, EmployeeFormComponent],
  templateUrl: './emp-card.component.html',
  styleUrl: './emp-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpCardComponent {
  modalRef: any;
  enable: boolean = false;
  actionType: string = '';
  constructor(public ds: DataService) {
    afterNextRender(() => {
      this.modalRef = document.getElementById('myModal-' + this.info?.id);
    });
  }
  @Input() info: IEmployee = {
    id: '',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    role: '',
    avtr: undefined,
  };
  onAction(info: IEmployee, action: string) {
    this.ds.enableModal.next(true);
    this.ds.modalID = info.id;
    this.actionType = action;
  }
  onDeleteEmp(info: IEmployee) {
    const empData: IEmpData = {
      type: 'delete',
      empDetails: info,
    };
    this.ds.employeeDataSubject?.next(empData);
    this.ds.enableModal.next(false);
  }
}
