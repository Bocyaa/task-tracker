import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading = true;
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  remove(id: string) {
    this.taskService.delete(id).subscribe({ next: () => this.fetchTasks() });
  }

  toggleTask(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.update(task.id!, updatedTask).subscribe({
      next: () => this.fetchTasks(),
    });
  }
}
