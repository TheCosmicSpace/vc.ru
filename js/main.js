import  {store, pivotAction} from './store/store.js';
import view from './view/view.js';
import QuestionUnit from './view/questionView.js';
import FinalUnit from './view/finalView.js';
import { fadeOut } from './animate.js';

let workSpace;

function docReady(){
  workSpace = document.querySelector('.work-space');
  startEvent();
}

function startEvent(){
  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('click', () => {
    fadeOut(startBtn.parentNode, () => {
      startBtn.parentNode.remove();
      questionView();
    });   
  });
}

function questionView(){
  workSpace.innerHTML = view.render('questionViewTemplate');
  // Init pivot questions
  const pivotAct = pivotAction();
  // Get amount questions 
  const amountQuestions = store.getAmountQuestions();
  workSpace.querySelector('.amount').innerText = amountQuestions;

  const questionUnit = new QuestionUnit(workSpace);
  // Render first question
  questionUnit.render(store.getQuestionData());
  
  
  // To Next Question Event
  questionUnit.toNextEvent((counter) => {
    // Check on final
    if(counter >= amountQuestions) {
      const { rightCounter } = questionUnit;
      return finalView(rightCounter, amountQuestions);
    }
    pivotAct.toIncIndex();
    questionUnit.toNextQuestion(()=>{
      questionUnit.render(store.getQuestionData(pivotAct.getCurrIndex()));
    });
  });
}

function finalView(rightCounter, amountQuestions){
  workSpace.innerHTML = view.render('finalViewTemplate');
  const finalUnit = new FinalUnit(workSpace);
  finalUnit.render(rightCounter, amountQuestions);
  finalUnit.toRepeatEvent(questionView);
}

document.addEventListener("DOMContentLoaded", docReady);