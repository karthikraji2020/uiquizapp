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
  currentCorrectAns: string;
  interval;
  options =[];

  shuffledQuestions: QuizQuestion[] = [];
  currentQuestionIndex:number=0;
  totalQuestions:number;
  isLastQuestion:boolean=false;

  constructor(private quizService:QuizService) { 
    
  }
  ngOnInit() {
    this.quizService.getTopics().subscribe((data:[])=>{
      this.topics=data;
      console.log(data);
      if(data) {
        this.getAllQuestion();
      }

    });

   }
   
  getAllQuestion() {
    this.quizService.getQuestions().subscribe((data:QuizQuestion[])=>{
      this.allQuestions=data;
      console.log(data);
      if(data) {
        this.shuffledQuestions = this.allQuestions.sort(() => Math.random() - .5);
        this.totalQuestions=this.shuffledQuestions.length;
        this.currentQuestionIndex = 0;
        this.navigateToNextQuestion();

      }
    });
  
  }
 
   startQuiz() {
    // this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
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
    if(opt.optionValue===this.currentCorrectAns){
      
      //  document.querySelector('.quiz-options')[Number(opt.optionValue)].style.border = "3px solid blue";
    }
    
  }


  showQuestion(question) {

  if (typeof document.getElementById('question') !== 'undefined' && this.currentQuestionIndex <= this.totalQuestions) {
    document.getElementById('question').innerHTML = this.shuffledQuestions[this.currentQuestionIndex]['questionText'];
    // document.getElementById('question').style.border = "3px solid blue";
    this.options=this.shuffledQuestions[this.currentQuestionIndex]['options'];
    this.currentCorrectAns = this.shuffledQuestions[this.currentQuestionIndex].answer;
  } else {
    if(this.currentQuestionIndex >= this.totalQuestions)
    {
      alert("Quiz Over !!Thank You For Using this Application !!");
      this.isLastQuestion=true;
    }
    this.navigateToResults();
  }

  }
  navigateToResults () {
    
  }

startTimer() {

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if(this.currentQuestionIndex >= this.totalQuestions)
        {
          this.isLastQuestion=true;
          this.navigateToNextQuestion();
          this.timeLeft = 60;
        }
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
