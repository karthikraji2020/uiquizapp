import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  topics:[]=[];

  constructor(private quizService:QuizService) { 
      this.quizService.getTopics().subscribe((data:[])=>{
        this.topics=data;
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
