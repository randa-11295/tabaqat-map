import GeoDataCard from "../Cards/GeoDataCard";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useConfig from "../../utils/config";
import { isString } from "../../utils/helpers";

const GeoDataList = (props) => {
  const { t } = useTranslation();
  const { geoDatArr } = useConfig();

  return (
    <Grid container columnSpacing={1.5}>
      <>
        {geoDatArr?.map((el) =>
          el.isTitle ? (
            <Grid item xs={12} key={el.name}>
              <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
                {t(`geoData.${el.name}`)}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={6} key={el.name}>
              <GeoDataCard
                title={t(`geoData.${el.name}`)}
                data={el.data?.toFixed(2) || 0}
              />
            </Grid>
          )
        )}
      </>
      <>
        <Grid item xs={12}>
          <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
            {t(`geoData.features`)}
          </Typography>
        </Grid>
        {props.featuresOpj &&
          Object.entries(props.featuresOpj).map(
            ([opjKey, value]) =>
              isString(value) && (
                // <div key={key}>
                //   <strong>{key}:</strong> {value}
                // </div>
                <Grid item xs={6} key={opjKey + value}>
                  <GeoDataCard title={opjKey} data={value} />
                </Grid>
              )
          )}
      </>
    </Grid>
  );
};

export default GeoDataList;
