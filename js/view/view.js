export default {
  render(templateName){
    const templateElement = document.getElementById(templateName);
    return templateElement.innerHTML;
  }
}