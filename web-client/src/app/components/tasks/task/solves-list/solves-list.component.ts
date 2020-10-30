import { Component, Input, OnInit } from "@angular/core";
import {
  UserService,
  UsersSolveItem,
} from "src/app/services/UserService/User.service";

@Component({
  selector: "app-solves-list",
  templateUrl: "./solves-list.component.html",
  styleUrls: ["./solves-list.component.scss"],
})
export class SolvesListComponent implements OnInit {
  @Input() taskId: string;
  public solves: UsersSolveItem[] = [];
  displayedColumns: string[] = ["user", "score", "date"];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getSolves();
  }

  getSolves() {
    this._userService
      .getUserSolvesForTask(this.taskId)
      .subscribe((data: UsersSolveItem[]) => {
        this.solves = data;
      });
  }
}
