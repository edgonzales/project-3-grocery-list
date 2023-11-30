import { Card, Image, Button } from "semantic-ui-react";

function ProductCard({ product, deleteProduct }) {

function handleClick(){
    deleteProduct(product._id);
}

    return (
        <Card>
            <Image 
                src={`${product.photoUrl}`} 
                wrapped ui={false}
                size="large"
            />
            <Card.Content>
                <Card.Description>{product.productName}</Card.Description>
                <Card.Description>${product.price}</Card.Description>
            </Card.Content>
            <Button
                onClick={handleClick}
            >
                Delete
            </Button>
        </Card>
    );
}

export default ProductCard;