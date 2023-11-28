import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export default function AddProductPage() {


  const [state, setState] = useState({
    productName: '',
    price: '', // turn this into an int
    description: '',
    category: ''
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
      navigate('/')


    } catch (err) {
      console.log(err.message); // <- the error message comes from the throw statement in utils/signup functions
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
          <Image src="https://i.imgur.com/uBagZDE.jpg" /> Add Product
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="productName"
              placeholder="Product Name"
              value={state.productName}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="price"
              name="price"
              placeholder="Price"
              value={state.price}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="description"
              type="description"
              placeholder="description"
              value={state.description}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="category"
              type="category"
              placeholder="Category"
              value={state.category}
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
              Add
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  )
}