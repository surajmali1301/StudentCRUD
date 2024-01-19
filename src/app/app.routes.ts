import { Routes } from '@angular/router';
import { MarkSheetComponent } from './mark-sheet/mark-sheet.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'marks-sheet/:id', component: MarkSheetComponent },
  { path: 'student', component: StudentComponent },
];
