import { Component, OnInit } from '@angular/core';
import {Task} from '../../Task'
import{TaskService} from '../../services/task.service'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // fires off at creation
      this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
    // Normally u use observers for asynchronous data
  }

  public deleteTask( task:Task ){
    this.taskService
    .deleteTask(task)
    .subscribe(
      ()=> (this.tasks = this.tasks.filter( (t) => t.id !== task.id))
    );
  }

  public toggleReminder( task:Task ){
    task.reminder = !task.reminder;
    console.log(task.reminder)
    this.taskService
    .updateTaskReminder(task)
    .subscribe();
  }

  public addTask( task:Task ){
    console.log("task")
    this.taskService
    .addTask(task)
    .subscribe(
      (task)=> (this.tasks.push(task))
    );
  }

}
