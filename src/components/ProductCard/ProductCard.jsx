import { Card, Image } from "semantic-ui-react";

function ProductCard({ product }) {

    return (
        <Card>
            <Image src={`${product.photoUrl}`} wrapped ui={false} />
            <Card.Content>
                <Card.Description>{product.productName}</Card.Description>
            </Card.Content>
        </Card>
    );
}

export default ProductCard;