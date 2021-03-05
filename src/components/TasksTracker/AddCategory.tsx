import React, { useRef } from "react";

interface Props {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddCategory = ({ categories, setCategories }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const addCategory = () => {
    const newCategory = inputRef.current.value;
    if (newCategory) {
      if (categories.indexOf(newCategory) < 0) {
        setCategories((s) => [...s, newCategory]);
      } else {
        console.warn("Repeated category, skip add");
      }
    }
  };
  return (
    <div>
      <input ref={inputRef} placeholder="Add Category" />
      <button onClick={addCategory}>Add</button>
    </div>
  );
};

export default AddCategory;
