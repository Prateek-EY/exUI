import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl='https://localhost:5001';
  constructor(private httpclient: HttpClient) { }

  getStudent(): Observable<Student[]>
  {
    return this.httpclient.get<Student[]>(this.baseApiUrl + '/Student');
  }
}
