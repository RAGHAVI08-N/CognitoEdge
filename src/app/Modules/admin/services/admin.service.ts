import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Basic_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createTest(testDto): Observable<any>{
    return this.http.post(Basic_URL + `api/test`, testDto);
  }

  getAllTest(): Observable<any>{
    return this.http.get(Basic_URL + `api/test`);
  }

  addQuestionInTest(questionDto): Observable<any>{
    return this.http.post(Basic_URL + `api/test/question`, questionDto);
  }

  getTestQuestions(id:number): Observable<any>{
    return this.http.get(Basic_URL + `api/test/${id}`);
  }

}
