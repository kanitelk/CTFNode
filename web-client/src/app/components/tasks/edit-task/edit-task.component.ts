import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { Task } from "../tasks-list/tasks-list.component";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  editForm: FormGroup;
  id: string;
  task: Task;
  isLoading = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _taskService: TaskService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      content: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      flag: new FormControl("", [Validators.required]),
      score: new FormControl(1, [Validators.required]),
      visible: new FormControl(true),
    });

    this.id = this.route.snapshot.paramMap.get("id");
    this.isLoading = true;
    this._taskService.getTask(this.id).subscribe((data: Task) => {
      this.task = data;
      this.editForm.setValue({
        title: data.title,
        content: data.content,
        flag: data.flag,
        score: data.score,
        visible: data.visible,
      });
      this.isLoading = false;
    });
  }

  submit() {
    this.isLoading = true;
    const { title, content, flag, score, visible } = this.editForm.value;
    this._taskService
      .editTask(this.id, title, content, visible, flag, score)
      .subscribe(
        (data) => {
          this._snackBar.open(`Task saved`, null, { duration: 2000 });
        },
        (error) => {
          this._snackBar.open(error.error.message, null, { duration: 2000 });
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
