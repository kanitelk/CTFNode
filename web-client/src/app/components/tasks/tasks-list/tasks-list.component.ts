import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { AuthService } from "src/app/services/auth.service";

export interface Task {
  _id: string;
  title: string;
  content?: string;
  visible?: boolean;
  categories?: string;
  images?: string[];
  files?: string[];
  flag?: string;
  answer?: string;
  score: number;
}

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
