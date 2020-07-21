import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Task } from '../tasks-list/tasks-list.component';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public id: string;
  public task: Task;
  constructor(private route: ActivatedRoute, private _tasksService: TaskService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._tasksService.getTask(this.id).subscribe(data => {
      this.task = data
    })
  }
}
