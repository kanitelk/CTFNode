import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  addForm: FormGroup;
  isLoading = false;
  constructor(private _snackBar: MatSnackBar, private _taskService: TaskService, private _router: Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      flag: new FormControl('', [Validators.required]),
      score: new FormControl(1, [Validators.required]),
      visible: new FormControl(true)
    });
  }

  submit() {
    this.isLoading = true;
    const {title, content, flag, score, visible} = this.addForm.value;
    this._taskService.addTask(title, content, visible, flag, score).subscribe(data => {
      this._snackBar.open(`Task created`, null, {duration: 2000});
      this._router.navigate(['/tasks/task', data._id]);
    }, error => {
      this._snackBar.open(error.error.message, null, {duration: 2000});
      this.isLoading = false;
    });
  }

}
