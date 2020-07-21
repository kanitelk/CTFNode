import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

import { Task } from '../tasks-list/tasks-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public id: string;
  public task: Task;
  public sendFlagForm: FormGroup;
  public isLoading = false;
  constructor(private route: ActivatedRoute, private _tasksService: TaskService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sendFlagForm = new FormGroup({
      flag: new FormControl('', [Validators.required])
    })

    this.id = this.route.snapshot.paramMap.get('id');
    this._tasksService.getTask(this.id).subscribe(data => {
      this.task = data
    })
  }

  submitFlag() {
    this.isLoading = true;
    const {flag} = this.sendFlagForm.value;
    this._tasksService.sendFlag(this.id, flag).subscribe((data: any) => {
      if (data.correct) {
        this._snackBar.open(`Success. + ${data.score}`, null, {
          duration: 2000,
        });
      } else {
        this._snackBar.open(`Wrong answer`, null, { duration: 2000 });
      }

    }, err => {
      this._snackBar.open(err.error.error, null, {duration: 2000})
    })
    this.isLoading = false;
  }
}
