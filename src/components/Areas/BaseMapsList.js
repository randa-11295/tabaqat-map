import BaseMapCard from "../Cards/BaseMabCard";
import { getBaseMapQuery } from "../../utils/apolloQueries";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoaderCard from "../Cards/LoaderCard";
import NoResult from "./NoResult";
const BaseMapsList = () => {
  const { t } = useTranslation();
  const {
    data: baseMapRes,
    error: baseMapError,
    loading: baseMapLoading,
  } = useQuery(getBaseMapQuery);

  return (
    <>
      <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
        {t(`basemap`)}
      </Typography>
      {baseMapLoading ? (
        [1, 2, 3, 4, 5].map((el, indx) => <LoaderCard key={el * indx} />)
      ) : (
        <>
          {baseMapError ? (
            <NoResult error />
          ) : baseMapRes?.basemaps?.length < 1 ? (
            <NoResult />
          ) : (
            baseMapRes?.basemaps.map((el) => (
              <BaseMapCard key={el.basemap_id} data={el} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default BaseMapsList;
