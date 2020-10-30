import { Component, OnInit } from "@angular/core";
import { Task, TaskService } from "../../../services/TaskService/Task.service";
import { AuthService } from "src/app/services/AuthService/auth.service";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  tasks: Task[];
  constructor(
    private _tasksService: TaskService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this._tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.tasks = this.tasks.map((task) => {
        let content = task.content;
        let title = task.title;
        if (content.length > 40) {
          content = content.substring(0, 40) + "...";
        }
        if (title.length > 30) {
          title = title.substring(0, 40) + "...";
        }
        return {
          ...task,
          content,
          title
        };
      });
    });
  }
}
