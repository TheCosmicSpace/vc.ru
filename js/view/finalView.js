import { flash, fadeOut } from '../animate.js';

export default class FinalUnit{
  constructor(root){
    this.unit = root.querySelector('.final-view');
    flash(this.unit, null, false);

    this.resultHTML = root.querySelector('.final-result'); 
    this.titleHTML = root.querySelector('.final-title');
    this.finalImg = root.querySelector('.final-img');
    this.repeatBtn = root.querySelector('.repeat-btn')
  }
  // Render View
  render(rightCounter, amountQuestions){
    this.answerView = this.selectAnswerView(rightCounter);
    this.resultHTML.innerText = `${rightCounter} из ${amountQuestions} правильных ответов`;
    this.titleHTML.innerText = this.answerView.title;
    this.finalImg.classList.add(this.answerView.imgName);
    this.finalImg.src = `./img/answer/${this.answerView.imgName}.png`;
  }
  shareBtnInit(){
    const shareButtons = this.unit.querySelectorAll(".share-btn");
    if (shareButtons) {
      shareButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
 				const width = 650,
              height = 450,
              url = window.location.href,
              text = "Как хорошо вы разбираетесь в новостях бизнеса";
        const shareUrl = button.href.replace('{{url}}', url).replace('{{text}}', text);
        window.open(shareUrl, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
        });
      });
    }
  }
  toRepeatEvent(action){
    this.repeatBtn.addEventListener('click', () => {
      fadeOut(this.repeatBtn);
      action();
    });
  }
  selectAnswerView(rightCounter){
    return mapAnswers.reduce((acc, ans) => {
      if(rightCounter >= ans.rightAnswers) acc = Object.assign(ans);
      return acc;
    }, {});
  }
}
const mapAnswers = [
  {
    rightAnswers: 0,
    title: 'Мне больше интересен футбол',
    imgName: 'imgAnswer1'
  },
  {
    rightAnswers: 3,
    title: 'Читаю vc.ru с экрана попутчика в метро',
    imgName: 'imgAnswer2'
  },
  {
    rightAnswers: 5,
    title: 'Бизнес это интересно, но где взять столько времени?',
    imgName: 'imgAnswer3'
  },
  {
    rightAnswers: 7,
    title: 'Читаю vc.ru каждый день, но работать тоже нужно',
    imgName: 'imgAnswer4'
  },
  {
    rightAnswers: 8,
    title: 'Я работаю в редакции vc.ru',
    imgName: 'imgAnswer5'
  },
];