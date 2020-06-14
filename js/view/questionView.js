import {fadeIn, fadeOut, flash } from '../animate.js';

export default class QuestionUnit{
  constructor(root) {
    this.unit = root.querySelector('.question-view');
    flash(this.unit);

    this.counter = 1;
    this.rightCounter = 0;
    this.counterHTML = root.querySelector('.count');
    this.titleHTML = root.querySelector('.question-title');
    this.variantsHTML = root.querySelector('.variants');
    this.descHTML = root.querySelector('.question-desc');
    this.nextBtn = root.querySelector('.next-btn');

    // Add click event
    this.clickEvent();
  }
  // Render View
  render(questionData){
    // Edge не знает spread оператор
    this.currentQuestion = Object.assign(questionData);
    this.counterHTML.innerText = `${this.counter}`;
    this.titleHTML.innerText = this.currentQuestion.question;
    this.descHTML.innerHTML = '';
    this.renderVariants();
  }
  // Click Event (Делегирование событий)
  clickEvent(){
    this.unit.addEventListener('click', event => {
      const { target } = event;
      if(target.tagName !== "BUTTON") return;
      if(target.dataset.id) this.checkToAnswer(target, target.dataset.id);
    });
  }
  checkToAnswer(target, id){
    const { variants, answer } = this.currentQuestion;
    // Show description
    this.renderDesc(variants[id].desc);
    // Show nextBtn
    flash(this.nextBtn, ({style}) => {
      style.visibility = 'visible';
    });
    target.disabled = true;
    // Add class on selected variant
    if(variants[id].variant === answer) {
      target.classList.add('right');
      this.rightCounter++;
    }
    else target.classList.add('wrong');
    // Delete other variants
    const nodes = [...target.parentNode.childNodes];
    nodes.filter(node => {
      if(node.nodeType === 1 && node !== target){
        node.disabled = true;
        fadeOut(node, ({element}) => {
          element.remove();
        });
      }
    });
  }
  toNextEvent(action){
    this.nextBtn.addEventListener('click', () => {
      fadeOut(this.nextBtn, ({style}) => {
        style.visibility = 'hidden';
      });
      action(this.counter);
    });
  }
  toNextQuestion(action){
    flash(this.unit, () => {
      this.counter += 1;
      action();
    });
  }
  // Render Buttons
  renderVariants(){
    this.variantsHTML.innerHTML = '';
    const { variants } = this.currentQuestion;
    const template = [];
    variants.forEach((btn, index) => {
      const tmpBtn = document.createElement('button');
      tmpBtn.innerText = btn.variant;
      tmpBtn.classList.add('variant-btn', 'default-btn');
      tmpBtn.dataset.id = index;
      template.push(tmpBtn);
    });
    this.variantsHTML.append(...template);
  }
  renderDesc(desc){
    // Add strong text
    const { links } = this.currentQuestion;
    desc = desc.replace(/^(.*?)[.?!]\s/, `<span class="bold">$&</span>`);
    // Add links
    links.forEach(item => {
      for(const [word, link] of Object.entries(item)){
        desc = desc.replace(word, `<a class="link" target='blank' href="${link}">$&</a>`)
      }
    });
    flash(this.descHTML, ({element}) =>{
      element.innerHTML = desc;
    });
  }
}



