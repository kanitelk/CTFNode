import { Component, OnInit, Input } from "@angular/core";
import { TaskService } from "src/app/services/task.service";

type Flag = {
  _id: string;
  value: string;
  isRight: boolean;
  createdAt: string;
};

@Component({
  selector: "app-flags-list",
  templateUrl: "./flags-list.component.html",
  styleUrls: ["./flags-list.component.scss"],
})
export class FlagsListComponent implements OnInit {
  @Input() taskId: string;
  public flags: Flag[] = [];
  displayedColumns: string[] = ["value", "date", "correct"];
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this.updateFlags();
  }

  updateFlags() {
    this._taskService.getFlags(this.taskId).subscribe((data) => {
      this.flags = data;
    });
  }
}
