import GeoDataCard from "../Cards/GeoDataCard";
import {Grid , Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import useConfig from "../../utils/config";

const GeoDataList = () => {
  const { t } = useTranslation();
  const { geoDatArr } = useConfig();

  return (
    <Grid container columnSpacing={1.5}>
      {geoDatArr?.map((el) =>
        el.isTitle ? (
          <Grid item xs={12} key={el.name}>
            <Typography component="h6" mb={1} variant="h6" sx={{ mb: 2 }}>
              {t(`geoData.${el.name}`)}
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={el.half ? 6 : 12} key={el.name}>
            <GeoDataCard
              title={t(`geoData.${el.name}`)}
              data={el.data?.toFixed(2) || 0}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default GeoDataList;
