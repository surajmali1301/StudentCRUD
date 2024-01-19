import { Injectable } from '@angular/core';
import { Student } from './studentDTO';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  stud: Student[] = [];
  private id: number = 100;

  constructor() {
    this.stud.push({
      id: 100,
      name: 'Suraj',
      marks1: 70,
      marks2: 70,
      marks3: 70,
    });
  }

  generateStudentId(): number {
    this.id++;
    return this.id;
  }

  public getStudentById(id: number) {}

  public getAllStudent(): Student[] {
    return this.stud;
  }
  public getStudent(): Student[] {
    return this.stud;
  }

  public addStudent(stud: Student): void {
    stud.id = this.generateStudentId();
    this.stud.push({
      id: stud.id,
      name: stud.name,
      marks1: stud.marks1,
      marks2: stud.marks2,
      marks3: stud.marks3,
    });
  }

  public updateStudent(stud: Student): void {
    for (let i = 0; i < this.stud.length; i++) {
      if (this.stud[i].id === stud.id) {
        this.stud[i].name = stud.name;
        this.stud[i].marks1 = stud.marks1;
        this.stud[i].marks2 = stud.marks2;
        this.stud[i].marks3 = stud.marks3;
        break;
      }
    }
  }

  public deleteStudent(id: any) {
    let i = 0;
    for (; i < this.stud.length; i++) {
      if (this.stud[i].id === id) {
        break;
      }
    }
    this.stud.splice(i, 1);
  }
  public getStudentByRollNo(id: number): Student | any {
    return this.stud.find((student) => student.id === id);
  }
}
