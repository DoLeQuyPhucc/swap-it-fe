import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductList: React.FC = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$50', imageUrl: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: '$70', imageUrl: 'image2.jpg' },
  ];

  return (
    <section className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
