import ProductCard from '../ProductCard/ProductCard'
import { Card, GridRow, Segment } from 'semantic-ui-react'
import { useState } from 'react';


export default function SearchProducts({ products, deleteProduct }) {

	const [search, setSearch] = useState('');
	const filteredResults = products.filter((p) => 
		p.productName.toLowerCase().includes(search.toLowerCase())
	)

	const productCardResult = filteredResults.map((product) => {
		return <ProductCard
			product={product}
			key={product._id}
			deleteProduct={deleteProduct}
		/>
	})


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