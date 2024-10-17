import React from 'react';
import Banner from '../../layouts/Header/Banner';
import Categories from '../../components/Categories/Categories';
import ProductList from '../ProductList/ProductList';

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <ProductList />
    </div>
  );
};

export default Home;
