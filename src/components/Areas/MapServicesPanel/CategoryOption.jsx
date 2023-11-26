import {
  getCategoryQuery,
  categoryFilterOpj,
} from "../../../utils/apolloQueries";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";
import CategoriesCard from "../../Cards/CategoriesCard";
import LoaderCard from "../../Cards/LoaderCard";
import NoResult from "../NoResult";

const CategoryOption = (props) => {
  const [categoriesResArr, setCategoriesResArr] = useState([]); // categories data array response
  const { i18n, t } = useTranslation();

  const {
    data: categoryRes,
    error: categoriesError,
    loading: categoriesLader,
  } = useQuery(getCategoryQuery, {
    variables: categoryFilterOpj(i18n.language),
  });

  useEffect(() => {
    const newCategoryArr = categoryRes?.workspace.map((el) => ({
      name: el.translations[0].title,
      val: el.id,
      iconId: el.icon.id,
    }));
    setCategoriesResArr(newCategoryArr);
  }, [categoryRes]);

  return (
    <>
      <Typography component="h5" mb={1} variant="h5" sx={{ mb: 2 }}>
        {t(`categories`)}
      </Typography>

      {categoriesLader ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el, indx) => (
            <Grid item xs={6} key={el * indx}>
              <LoaderCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {categoriesError ? (
            <Grid item xs={12}>
              <NoResult error />
            </Grid>
          ) : categoriesResArr?.length < 1 ? (
            <Grid item xs={12}>
              <NoResult />
            </Grid>
          ) : (
            categoriesResArr?.map((el) => (
              <Grid
                item
                xs={6}
                key={el.val}
                onClick={() => props.changeCategoryDataHandel(el)}
              >
                <CategoriesCard data={el} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </>
  );
};

export default CategoryOption;
