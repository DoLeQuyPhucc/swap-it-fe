import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGJvb2tzfGVufDB8fHx8MTY4MTM0NjE0Mg&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJvb2tzfGVufDB8fHx8MTY4MTM0NjE0Mg&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGJvb2tzfGVufDB8fHx8MTY4MTM0NjE0Mg&ixlib=rb-1.2.1&q=80&w=1080',
];

const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 p-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center rounded-lg shadow-lg overflow-hidden relative">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          transitionTime={1000}
          showStatus={false}
          stopOnHover={true}
          className="w-full"
        >
          {images.map((image, index) => (
            <div key={index} className="h-80 md:h-96 lg:h-[500px]">
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Carousel>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-white text-sm md:text-lg mb-6 drop-shadow-md">
            Curated selection of books, gadgets, and must-have items. Let's explore the best deals!
          </p>
          {/* <button className="bg-yellow-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-white hover:text-yellow-500 transition duration-300 shadow-lg transform hover:scale-105">
            Shop Now
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
