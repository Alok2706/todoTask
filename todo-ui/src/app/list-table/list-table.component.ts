import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";
import {log} from "util";


@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  allCompletedTaskList: any = [];
  idEdit = null;
  TaskEditForm: FormGroup;
  @Input() data: Array<any>;
  @Input() createTask: Array<any>;
  @Output() deleteTask = new EventEmitter();
  @Output() editTask = new EventEmitter();
  @ViewChild('testForm') testFormElement;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.TaskEditForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(false, Validators.required),
      description: new FormControl('', Validators.required),
      is_completed: new FormControl('', [Validators.required]),
    });
    this.getAlltasks();
    this.dashboardService.messageSource.subscribe(res => {
      this.getAlltasks();
    });
  }

  getAlltasks() {
    this.dashboardService.getAllTask().subscribe(value => {
        this.allCompletedTaskList = value;
      }
    );
  }

  clickEdit(item) {

    this.idEdit = item.id;

  }


  editSubmit(item) {
    this.dashboardService.updateTask(item.id, item).subscribe(value => {
      this.getAlltasks();
      this.editTask.emit({
        id: this.idEdit,
      });
      this.idEdit = null;
    });
  }

  onItemChange(id, event) {
    const data = {is_completed: event.currentTarget.checked};
    this.dashboardService.updateTask(id, data).subscribe(value => {
      this.getAlltasks();
    });
  }

  OnDateChange(item) {
    const data = {scheduled_at: item.scheduled_at};
    this.dashboardService.updateTask(item.id, data).subscribe(value => {
      this.getAlltasks();
    });
  }

  setReminder(item) {
    const data = {remind_at: item.remind_at};
    this.dashboardService.updateTask(item.id, data).subscribe(value => {
      this.getAlltasks();
    });
  }

  deleteTaskFn(id) {
    this.dashboardService.removeTask(id).subscribe(value => {
      this.getAlltasks();
    });
  }
}
