import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskComponent } from './task/task.component';
import {SharedModule} from '../shared/shared.module';
import { AddTaskComponent } from './add-task/add-task.component';


@NgModule({
  declarations: [TasksListComponent, TaskCardComponent, TaskComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
