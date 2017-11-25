export function createSlideToggle (className, classNameString) {
  this.state = { [className]: classNameString + ' slideable slide-hide'};
  return (
    () => {
      classNameString = this.state[className].split(' ');
      const slideHideIndex = classNameString.indexOf('slide-hide');
      if (slideHideIndex === -1)  {
        classNameString.push('slide-hide');
      } 
      else {
        classNameString.splice(slideHideIndex, 1);
      }
      classNameString = classNameString.join(' ');
      setTimeout(() => this.setState( {[className]: classNameString} ), 1000);
    }
  );
}
