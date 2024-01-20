import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkSheetComponent } from './mark-sheet/mark-sheet.component';
import { StudentComponent } from './student/student.component';
import { HttpClientModule } from '@angular/common/http';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule, ReactiveFormsModule, RouterModule,StudentComponent,HttpClientModule,MarkSheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'StudentCRUD';
}
