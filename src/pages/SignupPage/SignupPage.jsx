
import { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';

function SignUpPage({ handleSignUpOrLogin }) {

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  })

  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('photo', photo);
    for (let key in state) {
      formData.append(key, state[key])
    }

    try {
      await userService.signup(formData);
      handleSignUpOrLogin();
      navigate('/products')


    } catch (err) {
      console.log(err.message);
      setError('Try signing up again')
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleFileInput(e) {
    console.log(e.target.files) // <- FileList object,
    setPhoto(e.target.files[0]) // <- take the first file out of the list and store it in state
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          <Image src="https://i.imgur.com/uBagZDE.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
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
              type="Password"
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
