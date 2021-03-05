import React from "react";

const selectedStyle = "shadow-sm";

interface Props {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoriesSelection = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const handleClick = (category: string) => {
    setSelectedCategory(category);
  };
  const handleDelete = (category: string) => {
    setCategories((s) => s.filter((c) => c === category));
    if (selectedCategory === category) {
      setSelectedCategory("");
    }
  };
  return (
    <div>
      {categories.map((c) => (
        <div
          key={c}
          className={
            "px-4 py-2 flex justify-between " +
            (selectedCategory === c ? selectedStyle : "")
          }
        >
          <div
            className="cursor-pointer "
            onClick={() => {
              handleClick(c);
            }}
          >
            {c}
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              handleDelete(c);
            }}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSelection;
