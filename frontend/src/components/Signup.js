// importing modules
import React, { Component } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
  Message
} from 'semantic-ui-react'
import validator from '../validators/Signup';
import {Redirect} from 'react-router-dom';

// defining constant values.
const genders = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
  { text: 'Other', value: 'other' },
]

const bloodGroups = [
  { text: 'A+', value: 'a+' },
  { text: 'B+', value: 'b+' },
  { text: 'AB+', value: 'ab+' },
  { text: 'O+', value: 'o+' },
  { text: 'A-', value: 'a-' },
  { text: 'B-', value: 'b-' },
  { text: 'AB-', value: 'ab-' },
  { text: 'O-', value: 'o-' },
]

const services = [
  { text: 'Community Mental Health', value: 'community-mental-health' },
  { text: 'Residential Mental Health', value: 'residential-mental-health' },
  { text: 'Housing And Homelessness', value: 'housing-and-homelessness' },
  { text: 'Sucide Prevention', value: 'sucide-prevention' },
  { text: 'Intake And Assesment', value: 'intake-and-assesment' },
  { text: 'Ndis Services', value: 'ndis-services' },
  { text: 'Other', value: 'other' },
]

/**
 * Component responsible for signup.
 */
class Signup extends Component {

  /**
   * constructor function
   *
   * @param {props} object
   */
  constructor(props) {
    super(props);
    this.handleDropdownChange = this.handleDropdownChange.bind(this); // attaching change event to drop down values.
    this.state = {
      submitted:false,
      userCreated:false,
      fields: {
        first_name:'',
        last_name:'',
        gender:'',
        blood_group:'',
        email:'',
        password:'',
        age:'',
        services:'',
        address:''
      },
      errors:{
        first_name:'',
        last_name:'',
        gender:'',
        email:'',
        password:'',
        age:''
      }
    }
  }

  /**
   * Handles form submit event
   *
   * @param {event} object
   */
  mySubmitHandler = (event) => {
    event.preventDefault(); // disabling default event handling
    this.setState({submitted:true});

    // checking if the form contains valid values.
    let valid = validator(this.state.fields,this.state.errors);
    this.setState({valid:valid});

    // return if the form is invalid
    if(!valid)
      return false;

    // creating dynamic form for submission.
    let form = new FormData();
    let x = 0;
    for(x in this.state.fields)
    form.append(x,this.state.fields[x]);

    fetch(global.apiUrl+'signup',{
      method:'POST',
      body:form
    })
    .then(res => res.json())
    .then((data) => {
      if(data.success) {
        this.setState({userCreated:true,submitted:false});
        alert('User created successfully.'); // show success message on user creation.
      }
    })
    .catch(function(error){
    console.log(error);
    })
    ;
  }

  /**
   * Handles form drop down change event
   *
   * @param {event} object
   */
  handleDropdownChange (e, props) {
    let { name, value } = props
    let fields = this.state.fields;

    this.setState({[name]: value});

    fields[name] = value;
    this.setState({fields:fields});
  }

  /**
   * Handles form inputs change event
   *
   * @param {event} object
   */
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({fields:fields});
  }

  /**
   * return form error messages.
   *
   * @returns {errors} array
   */
  errors() {
    let errors = [],x='';
    for(x in this.state.errors) {
      if(this.state.errors[x] !== '')
        errors.push(this.state.errors[x])
    }
    return errors;
  }

  render() {
    
    // redirect to login page if user created successfully.
    if(this.state.userCreated) return <Redirect to="/"/>;

    return (
      <div>
        {
        this.state.submitted &&
        <Message
          error
          header='There was some errors with your submission'
          list={this.errors()}
        />
        }
        <Form onSubmit={this.mySubmitHandler}>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                name="first_name"
                label='First name'
                placeholder='First name'
                onChange={this.myChangeHandler}
              />
              <Form.Field
                control={Input}
                name="last_name"
                label='Last name'
                placeholder='Last name'
                onChange={this.myChangeHandler}
              />
              <Form.Field
                control={Select}
                name="gender"
                label='Gender'
                options={genders}
                placeholder='Gender'
                onChange={this.handleDropdownChange}
              />
              <Form.Field
                control={Select}
                name="blood_group"
                label='Blood Group'
                options={bloodGroups}
                placeholder='Blood Group'
                onChange={this.handleDropdownChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                  control={Input}
                  name="email"
                  label='Email'
                  placeholder='Email'
                  onChange={this.myChangeHandler}
              />
              <Form.Field
                  control={Input}
                  name="password"
                  label='Password'
                  placeholder='Password'
                  onChange={this.myChangeHandler}
                  type="password"
              />
              <Form.Field
                  control={Input}
                  name="age"
                  label='Age'
                  placeholder='Age'
                  type="number"
                  onChange={this.myChangeHandler}
              />
              <Form.Field
                  control={Select}
                  name="services"
                  label='Services'
                  options={services}
                  placeholder='Services'
                  onChange={this.handleDropdownChange}
                />
            </Form.Group>
            <Form.Field
                control={TextArea}
                name="address"
                label='Address'
                placeholder='Address'
                onChange={this.myChangeHandler}
              />          
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
      </div>
    )
  }
}

export default Signup