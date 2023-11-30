import ProductCard from '../ProductCard/ProductCard'
import { Card, GridRow, Search, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react';

export default function SearchProducts({ products, itemsPerRow, deleteProduct }) {

	const [search, setSearch] = useState('');
	const [productCardResult, setProductCardResult] = useState(products);

	let productCards = products.map((product) => {
		return <ProductCard
			product={product}
			key={product._id}
			deleteProduct={deleteProduct}
		/>
	});


	function filterBySearch(product) {
		return product.productName.toLowerCase().includes(search.toLowerCase())
	}

	useEffect(() => {
		setProductCardResult(products.filter(filterBySearch).map((product) => {
			return <ProductCard
				product={product}
				key={product._id}
				deleteProduct={deleteProduct}
			/>
		}))

		console.log(productCards);
	}, [search]
	)

	return (
		<>
			<GridRow centered>
				<Segment>
					<div className="ui action input">
						<input
							type="text"
							placeholder="Search..."
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className="ui button">Search</button>
					</div>
				</Segment>
			</GridRow>
			<GridRow centered>
				<Card.Group >
					{productCardResult}
				</Card.Group>
			</GridRow>

		</>
	)
}