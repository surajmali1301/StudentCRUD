import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { Student } from './studentDTO';
import { MarkSheetComponent } from './../mark-sheet/mark-sheet.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  studService: StudentService = inject(StudentService);
  studForm!: FormGroup;
  studList: Student[] = [];
  title = 'StudentCrud';
  // showMarksheet: boolean = false;
  // mData: any;
  isUpdateBtn!: boolean;
  queryValue: string | unknown;

  get Id() {
    return this.studForm.get('id');
  }
  get name() {
    return this.studForm.get('name');
  }
  get marks1() {
    return this.studForm.get('marks1');
  }
  get marks2() {
    return this.studForm.get('marks2');
  }
  get marks3() {
    return this.studForm.get('marks3');
  }

  ngOnInit(): void {
    this.getAllStudent();
    this.studForm = this.fb.group({
      id: [, Validators.required],
      name: [, Validators.required],
      marks1: [, Validators.required],
      marks2: [, Validators.required],
      marks3: [, Validators.required],
    });
    // this.route.paramMap.subscribe((x) => {
    //   this.queryValue = x.get('Id');
    // });
    // if (this.queryValue != '' && this.queryValue != null) {
      
    // }
    // this.isUpdateBtn = false;
  }
  addStudent() {
    let stud = this.studForm.value;
    if (!this.isUpdateBtn) {
      this.studService.addStudent(stud);
    } else {
      this.studService.updateStudent(stud);
      this.isUpdateBtn = false;
    }
    this.studForm.reset();
    this.getAllStudent();
  }

  editStudent(s: any) {
    this.isUpdateBtn = true;

    this.studForm.setValue({
      id: s.id,
      name: s.name,
      marks1: s.marks1,
      marks2: s.marks2,
      marks3: s.marks3,
    });
  }
  getAllStudent() {
    this.studList = this.studService.getAllStudent();
  }
  getStudent() {
    this.studList = this.studService.getAllStudent();
  }

  deleteStudent(id: number | undefined) {
    let response = confirm('Do you want to delete id ' + id + '?');
    if (response) {
      this.studService.deleteStudent(id);
      this.getStudent();
    }
  }

  clearForm() {
    this.studForm.reset();
    this.isUpdateBtn = false;
  }

  getMarkSheet(id: number | undefined) {
    this.router.navigate(['marks-sheet/', id]);
  }
}
