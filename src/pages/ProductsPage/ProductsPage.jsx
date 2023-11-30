import { Grid, GridRow, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import tokenService from "../../utils/tokenService";

import AllProducts from "../../components/AllProducts/AllProducts";
import SearchProducts from "../../components/SearchProducts/SearchProducts";


export default function ProductsPage({ handleLogout }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    async function deleteProduct(productId) {
        try {
            console.log(productId);
            const responseFromTheServer = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            });
            const data = await responseFromTheServer.json();
            getProducts();
            console.log(data);

        } catch (err) {
            console.log(err)
        }
    }

    // C(R)UD
    async function getProducts() {
        try {
            const response = await fetch("/api/products", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                },
            });
            const data = await response.json();
            console.log(data);
            setProducts(data.products);
        } catch (err) {
            console.log(err);
        }
    }

    function handleClick() {
        navigate('/addProduct')
    }


    return (
        <>
            <Grid>
                <GridRow  >
                    <Header floated="right">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </Header>
                </GridRow>
                <GridRow centered>
                    <h1>Products</h1>
                </GridRow>
                <SearchProducts
                    products={products}
                    deleteProduct={deleteProduct}
                />
                {/* <GridRow centered>
                    <AllProducts
                        products={products}
                        deleteProduct={deleteProduct}
                    />
                </GridRow> */}
                <GridRow centered>
                    <button
                        onClick={handleClick}
                        className="positive ui button">
                        Add a Product
                    </button>
                </GridRow>
            </Grid>
        </>
    )
}