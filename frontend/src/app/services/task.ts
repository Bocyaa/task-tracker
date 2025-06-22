import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  add(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: string, task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
}
