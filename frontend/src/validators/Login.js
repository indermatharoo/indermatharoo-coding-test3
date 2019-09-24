/*
 * custom validator for login form
 */
const validator = (inputs,errors) => {
    let valid = true;
    let x = '';
    for(x in inputs) {
      switch(x) {
        case 'email':
          let emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          errors.email = !emailformat.test(inputs[x]) ? 'Please enter a valid email.' : '';
          valid = errors.email.length > 0 ? false : true;          
        break;
        case 'password':
          errors.password = inputs[x].length === 0 ? "Please enter password." : '';
          valid = errors.password.length > 0 ? false : true;
          break;  
        default:
          break;
      }
    }
    return valid;
}

export default validator;