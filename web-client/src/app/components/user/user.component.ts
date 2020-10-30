import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/AuthService/auth.service";
import {
  SolveItem,
  User,
  UserService,
} from "../../services/UserService/User.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public id: string | null = null;
  public user: User | null = null;
  public isLoading: boolean = false;
  public solves: SolveItem[] = [];
  public solveDisplayedColumns: string[] = ["task", "score", "date"];

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public UserService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.isLoading = true;
      this.UserService.getUser(this.id).subscribe(
        (data: User) => {
          this.user = data;
          this.setSolves(data._id);
        },
        (error) => {
          this._snackBar.open(error.error.message, null, {
            duration: 2000,
          });
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
    } else {
      this.setSolves(this.authService.userId)
    }
  }

  setSolves(id: string): void {
    this.UserService.getAllUserSolves(id).subscribe((data: SolveItem[]) => {
      this.solves = data.map((solve: SolveItem) => {
        let title = solve.task.title;
        if (title.length > 20) title = title.substring(0, 20) + "...";
        solve.task.title = title;
        return solve;
      });
    });
  }
}
