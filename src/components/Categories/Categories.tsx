import React from 'react';

const categories = [
  { name: 'Nhà tốt', icon: '🏡' },
  { name: 'Xe cộ', icon: '🚗' },
  { name: 'Điện tử', icon: '📱' },
  // Add more categories here
];

const Categories: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          <div className="text-4xl">{category.icon}</div>
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
