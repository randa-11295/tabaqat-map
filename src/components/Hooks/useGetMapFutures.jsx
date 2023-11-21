import axios from "axios";
import useConfig from "../../utils/config";
import { useTranslation } from "react-i18next";
import { sideBarControllerState} from "../../utils/recoilState";
import { useRecoilState } from "recoil";
import { isString } from "../../utils/helpers";
import { markerPintsState } from "../../utils/recoilState";

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
        <>
          {Object.entries(valuesOpj).map(
            ([key, value]) =>
              isString(value) && (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              )
          )}
        </>
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
