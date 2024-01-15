import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const HOME_ROUTES = [{ path: '', component: EmployeeList }];

@NgModule({
  declarations: [EmployeeList],
  imports: [
    CommonModule,
    NgbDatepickerModule, 
    NgbAlertModule,
    FormsModule,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class EmployeeModule { }