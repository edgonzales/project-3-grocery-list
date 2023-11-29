import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import tokenService from "../../utils/tokenService";

export default function AddProductPage() {
  const [state, setState] = useState({
    productName: '',
    price: '', // turn this into an int
    category: '',
    description: '',
  })

  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    for (let key in state) {
      formData.append(key, state[key])
    }

    try {
      // HTTP REQUEST IS GOING TO THE SERVER
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // ====================================================
      // The HTTP cycle has been completed
      // and we have a parsed response from the server (data)
      console.log(data, " <- response data from the server");

      // Now we can update the state!
      setProducts([data.product, ...products]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    console.log(e.target);
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSelect(e, data) {
    console.log(data);
    setState({
      ...state,
      category: data.value
    })
  }

  function handleFileInput(e) {
    console.log(e.target.files) // <- FileList object,
    setPhoto(e.target.files[0]) // <- take the first file out of the list and store it in state
  }
  console.log(state)
  const categoryOptions = [
    { key: 'bip', value: 'Baby and Infant Products', text: 'Baby and Infant Products' },
    { key: 'bk', value: 'Bakery', text: 'Bakery' },
    { key: 'bv', value: 'Beverages', text: 'Beverages' },
    { key: 'cjg', value: 'Canned and Jarred Goods', text: 'Canned and Jarred Goods' },
    { key: 'cbg', value: 'Cereal and Breakfast Foods', text: 'Cereal and Breakfast Foods' },
    { key: 'cm', value: 'Condiments', text: 'Condiments' },
    { key: 'de', value: 'Dairy and Eggs', text: 'Dairy and Eggs' },
    { key: 'fp', value: 'Fresh Produce', text: 'Fresh Produce' },
    { key: 'ff', value: 'Frozen Foods', text: 'Frozen Foods' },
    { key: 'hw', value: 'Health and Wellness', text: 'Health and Wellness' },
    { key: 'hcp', value: 'Household and Cleaning Products', text: 'Household and Cleaning Products' },
    { key: 'ms', value: 'Meat and Seafood', text: 'Meat and Seafood' },
    { key: 'pc', value: 'Personal Care', text: 'Personal Care' },
    { key: 'pg', value: 'Pasta and Grains', text: 'Pasta and Grains' },
    { key: 'ps', value: 'Pet Supplies', text: 'Pet Supplies' },
    { key: 'sk', value: 'Snacks', text: 'Snacks' },
  ]


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
            <Form.Select
              name="category"
              type="category"
              placeholder="Category"
              value={state.category}
              onChange={handleSelect}
              required
              options={categoryOptions}
            />
            <Form.Input
              name="description"
              type="description"
              placeholder="Description"
              value={state.description}
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