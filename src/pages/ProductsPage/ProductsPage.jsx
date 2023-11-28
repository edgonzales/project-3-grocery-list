import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid, GridRow } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/addProduct')
    }

    return (
        <Grid>
            <GridRow>
                <PageHeader />
            </GridRow>
            <GridRow>
                <h1>Products Page</h1>
            </GridRow>
            <GridRow>
                <div class="ui action input">
                    <input type="text" placeholder="Search..." />
                    {/* handleSearch is needed for search button */}
                    <button class="ui button">Search</button>
                </div>
            </GridRow>
            <GridRow>
                <button
                    onClick={handleClick}
                    class="positive ui button">
                    Add a Product
                </button>
            </GridRow>
        </Grid>
    )
}