from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from typing import List

from schemas import Task      # relative import

app = FastAPI(
    title="Task-Tracker API",
    version="0.1.0",
    description="Tiny backend for Angular CV project"
)

# -- CORS so Angular (localhost:4200) can call us ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -- In-memory “DB” ----------------------------------------
tasks: list[Task] = []

# ----------------------------------------------------------
@app.get("/tasks", response_model=List[Task])
def list_tasks():
    return tasks

@app.post("/tasks", response_model=Task, status_code=201)
def create_task(task: Task):
    new_task = task.copy(update={"id": str(uuid4())})
    tasks.append(new_task)
    return new_task

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: str):
    global tasks
    tasks = [t for t in tasks if t.id != task_id]
    if not any(t.id == task_id for t in tasks):
        return  # 204 No Content
    raise HTTPException(status_code=404, detail="Task not found")
