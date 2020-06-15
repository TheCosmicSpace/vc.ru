const speed = 350;

export function fadeIn(element, isMove = true){
  const seconds = speed / 1000;
  element.style.transition = `opacity ${seconds}s, transform ${seconds}s`;
  element.style.opacity = 1;
  if(isMove) element.style.transform = 'translateX(0px)';
}

export function fadeOut(element, callback = null, isMove = true){
  const seconds = speed / 1000;
  element.style.transition = `opacity ${seconds}s, transform ${seconds}s`;
  element.style.opacity = 0;
  if(isMove) element.style.transform = 'translateX(30px)';
  
  setTimeout(function() {
      if(callback) callback({element, style: element.style});
  }, speed);
}
export function flash(element, callback = null, isMove = true){
  fadeOut(element, () => {
    if(callback) callback({element, style: element.style});
    fadeIn(element, isMove);
  }, isMove);
}