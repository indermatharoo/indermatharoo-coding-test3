// importing modules.
import React, { Component } from 'react';
import { Button, Form, Label } from 'semantic-ui-react'
import ls from 'local-storage'
import validator from '../validators/Login';

/**
 * Component responsible for login.
 */
export default class Login extends Component {

    /**
     * constructor function
     *
     * @param {props} object
     */
    constructor(props) {
        super();

        this.state = {
            email:'',
            password:'',
            errors:{
                email:'',
                password:''
            },
            valid:false
        }

    }

    /**
     * Handles form submit event
     *
     * @param {event} object
     */
    mySubmitHandler = (event) => {
        event.preventDefault(); // disabling default event handling
        
        let inputs = {email:this.state.email,password:this.state.password};

        // checking if the form contains valid values.
        let valid = validator(inputs,this.state.errors);

        this.setState({valid:valid});

        // return if the form is invalid
        if(!valid)
            return false;

        // creating dynamic form for submission.
        let form = new FormData();
        form.append('email',this.state.email);
        form.append('password',this.state.password);

        fetch(global.apiUrl+'login',{
          method:'POST',
          body:form
        })
        .then(res => res.json())
        .then((data) => {
            if(data.success) {
                // setting the fetched data into local storage.
                ls.set('first_name',data.first_name);
                ls.set('api_key',data.api_key);

                this.props.data.forceUpdate(); // updating app layout
            }
            else {                
                alert('Wrong email or password.'); // alert if no record found.
            }
        })
        .catch(function(error){
          console.log(error);
        })
        ;    
    }

    /**
     * Handles form input fields change event
     *
     * @param {event} object
     */
    myChangeHandler = (event) => {

        event.preventDefault(); // disabling default event handling

        // gather data from event object
        let name  = event.target.name;
        let value = event.target.value;

        // setting data for further usage
        this.setState({pristine:false})
        this.setState({[name]: value});
    }

    /**
     * render view of the component
     *
     */
    render() {
        return (
            <Form onSubmit={this.mySubmitHandler}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' name="email" onChange={this.myChangeHandler}/>
                    { this.state.errors.email.length > 0 && <Label pointing color='red'>{this.state.errors.email}</Label>}
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" name="password" placeholder='Password' onChange={this.myChangeHandler}/>
                    { this.state.errors.password.length > 0 && <Label pointing color='red'>{this.state.errors.password}</Label>}
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }    

}
  