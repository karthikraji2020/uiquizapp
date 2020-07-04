import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  startQuiz() {
    this.router.navigateByUrl('/quiz');
    console.log('from startQuiz');
  }
/*
 {
        "topics":["html","css","javascript","angularjs","angular7","reactjs","typescript"]
    },
    */ 

}
