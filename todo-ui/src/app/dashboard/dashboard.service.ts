import {Injectable} from '@angular/core';
import {BackendApiService} from "../services/backend-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //backend urls
  completedTaskUrl = 'todos/';
  completedTasks: any = [];
  public taskData = null;
  public messageSource = new BehaviorSubject(false);

  constructor(
    private backendApiService: BackendApiService
  ) {
  }

  getAllTask() {
    const CompletedTaskObserver = this.backendApiService.get(this.completedTaskUrl);
    CompletedTaskObserver.subscribe(value => {
      this.completedTasks = value;
    });
    return CompletedTaskObserver;
  }

  updateTask(id, data) {
    const updateTaskObserver = this.backendApiService.patch(`${this.completedTaskUrl}${id}/`, data);
    updateTaskObserver.subscribe(value => {
      this.taskData = value;
    });
    return updateTaskObserver;
  }

  removeTask(lineId: number) {
    const url = `${this.completedTaskUrl}${lineId}/`;
    const deleteObserver = this.backendApiService.delete(url);
    deleteObserver.subscribe(value => {
      console.log(value);
    });
    return deleteObserver;
  }

  createTask(data) {
    console.log('called createTask');
    const taskObserver = this.backendApiService.post(this.completedTaskUrl, data);
    taskObserver.subscribe(value => {
      this.taskData = value;
    });
    return taskObserver;
  }

}
