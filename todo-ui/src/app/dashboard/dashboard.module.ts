import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {ListTableComponent} from "../list-table/list-table.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';


@NgModule({
  declarations: [DashboardComponent, ListTableComponent, CreateTaskComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
  ]
})
export class DashboardModule {
}
