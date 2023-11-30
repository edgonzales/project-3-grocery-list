import ProductCard from '../ProductCard/ProductCard'
import { Card } from 'semantic-ui-react'
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
		// run the filter by search every time it changes
		return product.productName.toLowerCase().includes(search.toLowerCase())
	}

	// filter first and then 

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
			<div className="ui action input">
				<input 
					type="text" 
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className="ui button">Search</button>
			</div>
			<Card.Group >
				{productCardResult}
			</Card.Group>
		</>
	)
}