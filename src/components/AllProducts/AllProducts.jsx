import ProductCard from '../ProductCard/ProductCard'
import { Card } from 'semantic-ui-react'

export default function AllProducts({ products, itemsPerRow }) {


	const productCards = products.map((product) => {
		return <ProductCard product={product} key={product._id}  />
	})

	return (
		<Card.Group itemsPerRow={itemsPerRow}>
			{productCards}
		</Card.Group>
	)
}