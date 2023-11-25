import CategoryOption from "./CategoryOption.jsx";
import LayersListBtns from "./LayersListBtns";
import { useEffect, useState } from "react";

const MapServicesPanel = () => {
  const [categoryData, setCategoryData] = useState(null);

  const changeCategoryDataHandel = (categoryData) => {
    setCategoryData(categoryData);
  };

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  return (
    <>
      {categoryData?.val ? (
        <LayersListBtns
          categoryData={categoryData}
          changeCategoryDataHandel={changeCategoryDataHandel}
        />
      ) : (
        <CategoryOption
          categoryData={categoryData}
          changeCategoryDataHandel={changeCategoryDataHandel}
        />
      )}
    </>
  );
};

export default MapServicesPanel;
