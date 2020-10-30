import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { FlagsListComponent } from './task/flags-list/flags-list.component';
import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { EditTaskComponent } from './edit-task/edit-task.component';


@NgModule({
  declarations: [TasksListComponent, TaskComponent, AddTaskComponent, FlagsListComponent, EditTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
