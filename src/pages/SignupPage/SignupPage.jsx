import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Form, Segment, Button, Image } from 'semantic-ui-react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';


function SignUpPage({ handleSignUpOrLogin }) {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        for (let key in state) {
            formData.append(key, state[key])
        }

        try {
            await userService.signup(formData);
            handleSignUpOrLogin();
            navigate('/');
        } catch (err) {
            console.log(err.message)
            setError('Oops! Try signing up again.')
        }
    }



    async function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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