import axios from "axios";
import useConfig from "../../utils/config";
import { useTranslation } from "react-i18next";
import { sideBarController } from "../../utils/recoilState";
import { useRecoilState } from "recoil";
import { isString } from "../../utils/helpers";

const useGetMapFutures = () => {
  const { accessToken } = useConfig();
  const { i18n } = useTranslation();
  const [, setSideBarControllerData] = useRecoilState(sideBarController);

  const controlGeoDataSideBar = (valuesOpj) => {
    console.log(valuesOpj);
    // <ListItemText primary={val + t("geoCoding.notAvailable")} />
    setSideBarControllerData({
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
          controlGeoDataSideBar(res.data.features[0].properties);
      })
      //   res.data.features[0]?.geometry
      //     ? (() => {
      //         props.handleMarkerPointsChange({
      //           lat: res.data?.features[0]?.geometry?.coordinates[1],
      //           lng: res.data?.features[0]?.geometry?.coordinates[0],
      //         });
      //         setNotFound(false);
      //       })()
      //     : setNotFound(true);
      // })
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
