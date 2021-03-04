import React from "react";

interface Props {
  categories: string[];
}

const CategoriesDisplay = ({ categories }: Props) => {
  return (
    <div>
      {categories.map((c) => (
        <div key={c}> {c} </div>
      ))}
    </div>
  );
};

export default CategoriesDisplay;
