import React from 'react';

interface PackageCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  onSelect: () => void; // Add the onSelect prop type
}

const PackageCard: React.FC<PackageCardProps> = ({ title, price, features, buttonText, onSelect }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-3xl font-bold mb-4">{price}</p>
    <ul className="text-gray-700 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="mb-2">
          • {feature}
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect} // Attach the onSelect handler to the button's onClick
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      {buttonText}
    </button>
  </div>
);

export default PackageCard;
