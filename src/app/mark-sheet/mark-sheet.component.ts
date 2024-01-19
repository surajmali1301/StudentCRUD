import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-mark-sheet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './mark-sheet.component.html',
  styleUrl: './mark-sheet.component.css',
})
export class MarkSheetComponent implements OnInit {
  studentDetails: any;

  id: string | unknown;

  constructor(private route: ActivatedRoute, private router: Router) {}
  studentService: StudentService = inject(StudentService);

  ngOnInit(): void {
    let Id = 0;
    this.route.params.subscribe((params) => {
      Id = +params['id'];
    });
    this.studentDetails = this.studentService.getStudentByRollNo(Id);
  }
  calculatePercentage(mark1: number, mark2: number, mark3: number): string {
    const totalMarks = mark1 + mark2 + mark3;
    const percentage = (totalMarks / 300) * 100;
    return percentage.toFixed(2);
  }

  calculateGrade(mark1: number, mark2: number, mark3: number): string {
    const averageMarks = (mark1 + mark2 + mark3) / 3;

    if (averageMarks >= 90) {
      return 'A';
    } else if (averageMarks >= 80) {
      return 'B';
    } else if (averageMarks >= 70) {
      return 'C';
    } else if (averageMarks >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  }
  goBack() {
    this.router.navigate(['/student']);
  }
  generatePdf(): void {
    const pdfContent = `
      Roll No: ${this.studentDetails.rollNo}
      Name: ${this.studentDetails.name}
      Subject 1: ${this.studentDetails.mark1}
      Subject 2: ${this.studentDetails.mark2}
      Subject 3: ${this.studentDetails.mark3}
      Percentage: ${this.calculatePercentage(
        this.studentDetails.mark1,
        this.studentDetails.mark2,
        this.studentDetails.mark3
      )}%
      Grade: ${this.calculateGrade(
        this.studentDetails.mark1,
        this.studentDetails.mark2,
        this.studentDetails.mark3
      )}
    `;

    this.pdfGeneratorService.generatePdf(pdfContent);
  }
}