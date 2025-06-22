from pydantic import BaseModel

class Task(BaseModel):
  id: str | None = None
  title: str
  completed: bool = False