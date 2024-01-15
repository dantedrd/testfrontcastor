import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../services/EmployeeService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
})
export class EmployeeList implements OnInit {


  model: NgbDateStruct | undefined;
  private modalService = inject(NgbModal);
  continued: boolean = false;
  alertMesage: any = {
    showAlert: false,
    type: '',
    msg: ''
  }
  date: Date = new Date();
  employess: Array<any> = [];
  intInfo: any = {
    id: 0,
    nit: '',
    name: '',
    photo: '',
    dateEntry: '',
    position: {
      id: 0
    }
  };
  data: any
  positions: Array<any> = [];
  urlImage: String = '';
  employeeIdDelete: number = 0;

  @ViewChild('validDelete', { read: TemplateRef }) validDelete?: TemplateRef<any>;

  constructor(private employeeService: EmployeeService) {

  }




  ngOnInit(): void {
    this.urlImage = environment.basePath + environment.employeePath + environment.employeeImagePath
    this.data = JSON.parse(JSON.stringify(this.intInfo));
    this.getAllEmployees();
    this.employeeService.getPositions()
      .subscribe(data => {
        this.positions = data.data;
      })
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employess = data.data;
    })
  }

  open(content: TemplateRef<any>, employee: any) {
    if (employee != null) {
      this.data = JSON.parse(JSON.stringify(employee));
      this.data.dateEntry = {
        day: parseInt(employee.dateEntry.split("-")[2]),
        month: parseInt(employee.dateEntry.split("-")[1]),
        year: parseInt(employee.dateEntry.split("-")[0])
      };
      this.data.photoId = this.data.photo;
      //this.data.photo = null;
    } else {
      this.data = JSON.parse(JSON.stringify(this.intInfo));
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      });
  }

  close() {
    this.modalService.dismissAll();
    this.data.dateEntry = this.data.dateEntry.year + "-" + this.data.dateEntry.month + "-" + this.data.dateEntry.day;
    if (this.data.photo) {
      this.data.photoId = null;
    }
    let nuevo = new FormData();
    Object.keys(this.data).forEach(key => {
      nuevo.append(key, this.data[key]);
    });
    nuevo.delete("position")
    nuevo.append("position", JSON.stringify(this.data.position));
    this.employeeService.addEmployee(nuevo).subscribe(data => {
      //this.modalService.dismissAll();
      this.alertMesage.type = 'success';
      this.alertMesage.msg = "Empleado guardado correctamente";
      this.alertMesage.showAlert = true;
      this.getAllEmployees();
    });
  }

  onChange(event: any) {
    this.data.position = this.positions.find(position => position.id === parseInt(event?.target?.value));
  }

  uploadFile(event: any) {
    const file = event?.target?.files[0];
    if (file.type.includes("image")) {
      this.data.photo = file;
      this.continued = false;
    } else {
      this.continued = true;
    }
  }

  selectDeleteEmployee(employeeId: any) {
    this.employeeIdDelete = employeeId;

    this.modalService.open(this.validDelete, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeIdDelete)
      .subscribe((result: any) => {
        this.modalService.dismissAll();
        this.employeeIdDelete=0;
        this.getAllEmployees();
      })
  }


  closeAlert() {
    this.alertMesage.type = '';
    this.alertMesage.msg = "";
    this.alertMesage.showAlert = false;
  }
}
