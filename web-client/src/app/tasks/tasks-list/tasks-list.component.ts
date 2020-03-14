import { Component, OnInit } from '@angular/core';

export interface Task {
  _id: string;
  title: string;
  content?: string;
  visible: boolean;
  categories?: string;
  images?: string[];
  files?: string[];
  answer: string;
}

export const tasks: Task[] = [
  {
    _id: 'n4bn4v2j34',
    title: 'Test',
    answer: 'test',
    visible: true,
  },
  {
    _id: 'zx7cyzchh',
    title: 'Test 2',
    answer: 'test',
    visible: true,
  },
]

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[];
  constructor() { }

  ngOnInit(): void {
    this.tasks = tasks;
  }

}
