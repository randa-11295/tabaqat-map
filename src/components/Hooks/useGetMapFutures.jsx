import axios from "axios";
import useConfig from "../../utils/config";
import { useTranslation } from "react-i18next";
import { sideBarControllerState} from "../../utils/recoilState";
import { useRecoilState } from "recoil";

import { markerPintsState } from "../../utils/recoilState";
import GeoDataList from "../Areas/GeoDataList";
import {Box} from "@mui/material"

const useGetMapFutures = () => {
  const { accessToken } = useConfig();
  const { i18n } = useTranslation();
  const [, setSideBarController] = useRecoilState(sideBarControllerState);
  const [ , setMarkerPints] = useRecoilState(markerPintsState);

  const controlGeoDataSideBar = (valuesOpj, points) => {
  
    setMarkerPints(points);
    // <ListItemText primary={val + t("geoCoding.notAvailable")} />
    setSideBarController({
      children: (
        <Box p={3}>
        <GeoDataList featuresOpj={valuesOpj} />
    
        </Box >
      ),
      open: true,
    });
  };
  const getMapFutures = (values) => {
    if (!values?.lat || !values?.lat) return;
    axios
      .get(`https://geocoder.tabaqat.net/v1/reverse`, {
        params: {
          "point.lat": values.lat,
          "point.lon": values.long,
          access_token: accessToken,
          lang: i18n.language,
        },
      })
      .then((res) => {
        res.data.features[0].properties &&
          controlGeoDataSideBar(res.data.features[0].properties, {
            lat: values.lat,
            lng: values.long,
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getMapFutures,
    controlGeoDataSideBar,
  };
};

export default useGetMapFutures;
