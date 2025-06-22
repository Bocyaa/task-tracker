import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  imports: [FormsModule],
  templateUrl: './task-add.html',
  styleUrl: './task-add.scss',
})
export class TaskAdd {
  title = '';
  saving = false;

  constructor(private taskService: TaskService, private router: Router) {}

  save() {
    if (!this.title.trim()) return;
    this.saving = true;
    this.taskService
      .add({ title: this.title.trim(), completed: false })
      .subscribe({
        next: () => this.router.navigate(['/tasks']),
        complete: () => (this.saving = false),
      });
  }
}
