import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { QuizQuestion } from 'src/app/service/models/questions.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit,AfterViewInit {

  topics:[]=[];
  allQuestions: QuizQuestion[] = [];
  timeLeft: number = 60;
  interval;
  options =[];

  shuffledQuestions: QuizQuestion[] = [];
  currentQuestionIndex:number=0;
  totalQuestions:number;

  constructor(private quizService:QuizService) { 
      this.quizService.getTopics().subscribe((data:[])=>{
        this.topics=data;
        console.log(data);
        if(data) {
          this.getAllQuestion();
        }

      });
  }
  ngOnInit() {
   }
   
  getAllQuestion() {
    this.quizService.getQuestions().subscribe((data:QuizQuestion[])=>{
      this.allQuestions=data;
      console.log(data);
      if(data) {
        this.shuffledQuestions = this.allQuestions.sort(() => Math.random() - .5);
        this.totalQuestions=this.shuffledQuestions.length;
        this.currentQuestionIndex = 0;
      }
    });
  
  }
 
   startQuiz() {
    this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
  }

  navigateToNextQuestion() {
    this.resetState();
    this.currentQuestionIndex++
    this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
    this.startTimer();
  }
  resetState () {
    this.timeLeft = 60;
  }
  choosedOption(opt) {
    console.log(opt.optionValue)

    if(opt.optionValue){

    }
    

  }
  showQuestion(question) {

  if (typeof document.getElementById('question') !== 'undefined' && this.currentQuestionIndex <= this.totalQuestions) {
    document.getElementById('question').innerHTML = this.shuffledQuestions[this.currentQuestionIndex]['questionText'];
    // document.getElementById('question').style.border = "3px solid blue";
    this.options=this.shuffledQuestions[this.currentQuestionIndex]['options'];
  } else {

    // this.navigateToResults();
  }

  }


startTimer() {

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.navigateToNextQuestion();
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngAfterViewInit() {
    this.startTimer();
  }
  

}
