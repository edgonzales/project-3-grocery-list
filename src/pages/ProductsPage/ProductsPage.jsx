import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid, GridRow, Card } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import AllProducts from "../../components/AllProducts/AllProducts";
import { useState, useEffect } from "react";
import tokenService from "../../utils/tokenService";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // This useEffect is called when the page loads

        // Don't forget to call the function
        getProducts();
    }, []);

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
        <Grid centered>
            <GridRow>
                <PageHeader />
            </GridRow>
            <GridRow>
                <h1>Products Page</h1>
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
    )
}