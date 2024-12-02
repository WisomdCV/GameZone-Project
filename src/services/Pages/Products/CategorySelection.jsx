import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const CategorySelection = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleSubcategoryToggle = (subcategory) => {
    // Asegurarte de que selectedSubcategories esté definido
    const selectedSubcategories = selectedCategory.selectedSubcategories || [];
  
    const isSelected = selectedSubcategories.includes(subcategory);
    const updatedSubcategories = isSelected
      ? selectedSubcategories.filter((sub) => sub !== subcategory)
      : [...selectedSubcategories, subcategory];
  
    setSelectedCategory((prev) => ({
      ...prev,
      selectedSubcategories: updatedSubcategories,
    }));
  };
  

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="category" className="block font-medium text-gray-700">
          Seleccionar Categoría:
        </label>
        <select
          id="category"
          value={selectedCategory?.id || ""}
          onChange={handleCategoryChange}
          className="w-full border-gray-300 rounded-md p-2 mt-1"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && selectedCategory.subcategories && (
        <div>
          <label className="block font-medium text-gray-700">Subcategorías:</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {selectedCategory.subcategories.map((subcategory, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`subcategory-${index}`}
                  checked={selectedCategory.selectedSubcategories?.includes(subcategory) || false}
                  onChange={() => handleSubcategoryToggle(subcategory)}
                  className="mr-2"
                />
                <label htmlFor={`subcategory-${index}`} className="text-gray-700">
                  {subcategory}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
