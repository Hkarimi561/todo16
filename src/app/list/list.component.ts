import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../interfaces/todo.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../services/users.service";
import {User} from "../interfaces/user.interface";
import {NewTaskComponent} from "../new-task/new-task.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<Todo>
  usersList: User[]
  newTaskTitle: string
  displayedColumns: string[] = ['id', 'userId', 'title', 'completed','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public todoService: TodoService,public usersService:UsersService,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.todoService.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.usersService.getAllUsers().subscribe((data)=>{
      this.usersList=data
    })
  }

  getUser(userId: number){
    let userObj = this.usersList.find((e)=>{return e.id==userId})
    return userObj?.name
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTask() {
    let newTask:Todo = {
      userId:1,
      title:"",
      completed:false
    }
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: newTask,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTaskTitle = result;

      this.todoService.createTodo(newTask).subscribe((response)=>{
        console.log(response)
        this.dataSource.data.push(response)
      })
    });
  }

  deleteTodo(id: number,index:number) {
    this.todoService.deleteTodo(id).subscribe((data)=>{
      console.log(data)
      this.dataSource.data.splice(index,1)
      this.dataSource._updateChangeSubscription();
    })
  }
  updateTodo(id:number,index:number){
    const data = this.dataSource.data[index];

    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log(data)
      this.todoService.updateTodo(id,data).subscribe((data)=>{
        alert("Data Has been Updated")
      })

    });
  }
}
