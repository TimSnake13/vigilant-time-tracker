import React, { useRef } from "react";

interface Props {
  categories: any;
  setCategories: React.Dispatch<React.SetStateAction<{}>>;
}

const AddCategory = ({ categories, setCategories }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const addCategory = () => {
    if (inputRef.current.value) {
    }
  };
  return (
    <div>
      <h2>Add Category</h2>
      <input ref={inputRef} placeholder="Add Category" />
      <button onClick={addCategory}>Add</button>
    </div>
  );
};

export default AddCategory;
