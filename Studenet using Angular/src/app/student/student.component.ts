import { Component } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  students: Student[] = [
    {
      Sid: 1,
      Sname: 'Neeraj',
      dob: new Date('2001-06-03'),
      course: 'Mathematics',
      fees: 143000
    },
    {
      Sid: 2,
      Sname: 'Shalini',
      dob: new Date('2001-04-21'),
      course: 'Physics',
      fees: 120000
    },
    {
      Sid: 3,
      Sname: 'Revathi',
      dob: new Date('2002-04-12'),
      course: 'Chemistry',
      fees: 110000
    },
    {
      Sid: 4,
      Sname: 'Vijaya',
      dob: new Date('1980-04-15'),
      course: 'Biology',
      fees: 130000
    }
  ];
}
