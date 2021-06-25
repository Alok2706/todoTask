import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DashboardService} from "../dashboard/dashboard.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  isCreate = false;
  isSubmit = false;
  public taskData = null;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isSubmit = true;
    if (form.valid) {

      this.dashboardService.createTask(form.value).subscribe(value => {
        this.taskData = value;
        this.dashboardService.messageSource.next(true);
        this.isSubmit = false;
        this.isCreate = false;
      });
    }
  }
}
