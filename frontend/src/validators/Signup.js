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
        case 'first_name':
            errors.first_name = inputs[x].length === 0 ? "Please enter first Name." : '';
            valid = errors.first_name.length > 0 ? false : true;
            break;
        case 'last_name':
            errors.last_name = inputs[x].length === 0 ? "Please enter last Name." : '';
            valid = errors.last_name.length > 0 ? false : true;
            break;
        case 'gender':
            errors.gender = inputs[x].length === 0 ? "Please enter gender." : '';
            valid = errors.gender.length > 0 ? false : true;
            break;
        case 'age':
            errors.age = inputs[x].length === 0 ? "Please enter age." : '';
            valid = errors.age.length > 0 ? false : true;
            break;                                
        default:
            break;
      }
    }
    return valid;
}

export default validator;