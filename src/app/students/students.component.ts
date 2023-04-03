import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students:Student[] =[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email','mobile','gender'];
  dataSource:MatTableDataSource<Student>=new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;
  @ViewChild(MatSort) matSort?: MatSort;
  filterString='';

  constructor(private studentsService: StudentService){}

  ngOnInit():void{
    //Fetch Students

    this.studentsService.getStudent()
    .subscribe(
      (success) => {
        console.log(success);
        this.students=success;
        this.dataSource=new MatTableDataSource<Student>(this.students);

        if(this.matPaginator){
          this.dataSource.paginator=this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort=this.matSort;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterStudents()
  {
    this.dataSource.filter=this.filterString.trim().toLowerCase();
  }

}
