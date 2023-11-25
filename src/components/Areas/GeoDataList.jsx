import GeoDataCard from "../Cards/GeoDataCard";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useConfig from "../../utils/config";
import NoResult from "./NoResult";

const GeoDataList = (props) => {
  const { t } = useTranslation();
  const { geoDataTitles, isString } = useConfig();

  return (
    <Grid container columnSpacing={1.5}>
     { props.data ?
      <>
        <Grid item xs={12}>
          <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
            {t(`geoData.coordinates`)}
          </Typography>
        </Grid>
        {props.data?.geometry?.coordinates?.map((valEl, indx) => (
          <Grid item xs={6} key={valEl}>
            <GeoDataCard
              title={t(`geoData.${geoDataTitles.coordinates[indx]}`)}
              data={valEl.toFixed(2)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
            {t(`geoData.bBox`)}
          </Typography>
        </Grid>
        {props.data?.bbox?.map((valEl, indx) => (
          <Grid item xs={6} key={valEl}>
            <GeoDataCard
              title={t(`geoData.${geoDataTitles.bBox[indx]}`)}
              data={valEl.toFixed(2)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
            {t(`geoData.features`)}
          </Typography>
        </Grid>
        {Object.entries(props.data.properties).map(
          ([opjKey, value]) =>
            isString(value) && (
              <Grid item xs={6} key={opjKey + value}>
                <GeoDataCard title={opjKey} data={value} />
              </Grid>
            )
        )}
      </>
      :
      <Grid item xs={12}>
        <NoResult />
      </Grid>
}
    </Grid>
  );
};

export default GeoDataList;
