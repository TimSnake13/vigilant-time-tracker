import React, { useRef } from "react";

interface Props {
  addCategory: (name: string) => void;
}

const AddCategory = ({ addCategory }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const handleAddCategory = () => {
    if (inputRef.current.value) addCategory(inputRef.current.value);
  };
  return (
    <div>
      <input ref={inputRef} placeholder="Add Category" />
      <button onClick={handleAddCategory}>Add</button>
    </div>
  );
};

export default AddCategory;
