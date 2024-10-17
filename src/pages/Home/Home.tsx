import React from 'react';
import Banner from '../../layouts/Header/Banner';
import Categories from '../../components/Categories/Categories';

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories />
    </div>
  );
};

export default Home;
