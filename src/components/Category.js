import React from 'react';

function Category(props) {
  const { category } = props;

  return (
    <div>
      <h3>{category.name}</h3>
    </div>
  );
}

export default Category;