import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { StudentService } from '../student/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  styleUrls: ['./mark-sheet.component.css'],
})
export class MarkSheetComponent implements OnInit {
  studentDetails: any;

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
  generatePdf() {
    const docDefinition: any = {
      content: [
        {
          text: 'Mark-Sheet',
          style: 'header',
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Name', style: 'tableHeader' },
                { text: 'Roll No', style: 'tableHeader' },
                { text: 'Subject 1', style: 'tableHeader' },
                { text: 'Subject 2', style: 'tableHeader' },
                { text: 'Subject 3', style: 'tableHeader' },
                { text: 'Percentage', style: 'tableHeader' },
                { text: 'Grade', style: 'tableHeader' },
              ],
              [
                this.studentDetails?.name || '',
                +
                this.studentDetails?.id || '',
                this.studentDetails?.marks1 || '',
                this.studentDetails?.marks2 || '',
                this.studentDetails?.marks3 || '',
                this.calculatePercentage(
                  this.studentDetails?.marks1,
                  this.studentDetails?.marks2,
                  this.studentDetails?.marks3
                ) + '%',
                this.calculateGrade(
                  this.studentDetails?.marks1,
                  this.studentDetails?.marks2,
                  this.studentDetails?.marks3
                ),
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black',
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('mark-sheet.pdf');
  }
  goBack() {
    this.router.navigate(['/student']);
  }
}
