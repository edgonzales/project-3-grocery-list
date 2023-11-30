import { Grid, GridRow } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import AllProducts from "../../components/AllProducts/AllProducts";
import { useState, useEffect } from "react";
import tokenService from "../../utils/tokenService";

export default function ProductsPage({ logout }, PageHeader) {
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

            <Grid centered>
                <GridRow>
                </GridRow>
                <GridRow>
                    <h1>Products</h1>
                </GridRow>
                <GridRow>
                    <div className="ui action input">
                        <input type="text" placeholder="Search..." />
                        {/* handleSearch is needed for search button */}
                        <button className="ui button">Search</button>
                    </div>
                </GridRow>
                <GridRow>
                    <AllProducts
                        products={products}
                        deleteProduct={deleteProduct}
                    />
                </GridRow>
                <GridRow>
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