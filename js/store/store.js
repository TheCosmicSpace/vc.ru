import jsonData from '../questionsJSON.js';
const data = JSON.parse(jsonData);

const store = {
  getQuestionData: (index = 0) =>{
    return data[index];
  },
  getAmountQuestions: () => {
    return data.length;
  }
}

function pivotAction(){
  let currentIndex = 0;
  return {
    getCurrIndex(){
      return currentIndex;
    },
    toIncIndex(){
      currentIndex++;
    }
  }
}

export {store, pivotAction}