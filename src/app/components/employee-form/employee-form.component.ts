import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { sampleAvtr2 } from '../../models/data-model';
import { IEmployee, IEmpData } from '../../interfaces/employee-interface';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements AfterViewInit {
  empForm: FormGroup;
  designations: string[] = [
    'Software Developer',
    'Senior Software Developer',
    'Quality Assurance',
    'Technical Lead',
    'Manager',
  ];
  selectedAvatar: any;
  avatarPreview: string | ArrayBuffer | null | undefined;
  @Input() isEditForm: boolean = false;
  @Input() editEmpVal?: IEmployee = {
    id: '',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    role: '',
    avtr: undefined,
  };
  modalRef: any;
  DOMObj: Document = document;
  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.DOMObj = document
      this.modalRef = document.getElementById('myModal'+this.editEmpVal?.id);
    });
    this.empForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            `^[+]{1}(?:[0-9\\-\\(\\)\\/""\\.]\\s?){6,11}[0-9]{1}$`
          ),
        ],
      ],
      role: ['', Validators.required],
      avtr: [{data: {name: 'sample1.png'}, imgSrc: sampleAvtr2}],
    });
  }

  ngAfterViewInit(): void {
    if (this.isEditForm)
      this.empForm.setValue({
        id: this.editEmpVal?.id,
        name: this.editEmpVal?.name,
        companyName: this.editEmpVal?.companyName,
        email: this.editEmpVal?.email,
        phone: this.editEmpVal?.phone,
        role: this.editEmpVal?.role,
        avtr: this.editEmpVal?.avtr,
      });
      setTimeout(() => {
        const avtrFilename: any = this.DOMObj?.getElementById('avtr');
        if(avtrFilename)
        avtrFilename.textContent = this.editEmpVal?.avtr?.data?.name;
      this.cdr.detectChanges();
      }, 10);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedAvatar = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
        this.empForm?.patchValue({ avtr: {imgSrc: this.avatarPreview, data:this.selectedAvatar }});
      };
      reader.readAsDataURL(this.selectedAvatar);
    }
  }

  onSubmit() {
    if (this.empForm.valid) {
      let empData: IEmpData = {
        type: 'add',
        empDetails: this.empForm.value,
      };
      if (!this.isEditForm) {
        this.empForm.patchValue({ id: this.ds.generateUniqueId() });
        this.ds.employeeDataSubject?.next(empData);
        this.router.navigateByUrl('/');
      } else {
        empData.type = 'edit';
        this.ds.employeeDataSubject?.next(empData);
         this.ds.enableModal.next(false);
      }
    }
  }
}
