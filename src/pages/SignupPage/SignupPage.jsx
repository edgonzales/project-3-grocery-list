
import { useState} from 'react'

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";

import {useNavigate } from 'react-router-dom'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import userService from '../../utils/userService';

function SignUpPage({handleSignUpOrLogin}) {

  const [state, setState] = useState({
	username: '',
	email: '',
	password: '',
	passwordConf: ''
  })

  const [photo, setPhoto] = useState('')

  const [error, setError] = useState('')

  const navigate = useNavigate(); //< - this hook is from react-router-dom
  // navigate is a function that takes a path from your route defined in app.js 
  // to programatically navigate the user to a differnet route!

  async function handleSubmit(e){
	e.preventDefault();

	// ONLY WHEN YOU HAVE A PHOTO/FILE 
	// You have to convert all the data into a FormData object
	// type of request header multipart/formdata, so when we make the api call, its sends of the file, 
	// in one part, and in another its send the plain text from the inputs
	const formData = new FormData(); // new FormData is just from the browser
	// add the key value pairs to form data now
	formData.append('photo', photo); // 'photo' is the key, the value is photo (our state)
	// formData.append('username', state.username)
	// formData.append('email', state.email)
  // formData.append('password', state.password)
  // formData.append('bio', state.bio)
	// Instead of doing each one, one by one ^^^^ we can use a for ... in loop to loop over the object
	for (let key in state){
		formData.append(key, state[key])
	}
	// The above added all the key value pairs from state to the FormData object that we want to send to the EXPRESS SERVER

	try {
		await userService.signup(formData); // <-- we must pass all the information from the form into the signup function
		// in order to send the information to the server
		// call the handleSignUpOrLogin function from the app component
		// which passed as a prop, to get the token from localstorage
		// and set the users information in the apps state
		handleSignUpOrLogin();
		// navigate the user to the route we want, (so probably the homepage)
		navigate('/')


	} catch(err){
		console.log(err.message); // <- the error message comes from the throw statement in utils/signup functions
		setError('Try signing up again')
	}
  }

  function handleChange(e){
	setState({
		...state,
		[e.target.name]: e.target.value
	})
  }

  function handleFileInput(e){
	// when we upload files 
	// e.target.files, (which is an object thats like an array)
	console.log(e.target.files) // <- FileList object,
	setPhoto(e.target.files[0]) // <- take the first file out of the list and store it in state
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;
