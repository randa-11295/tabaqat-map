import axios from "axios";
import { useTranslation } from "react-i18next";
import useConfig from "../../utils/config";
import { sideBarController } from "../../utils/recoilState";
import { useRecoilState } from "recoil";

const useGetMapFutures = () => {
  const { accessToken } = useConfig();
  const { i18n } = useTranslation();
  const [, setSideBarControllerData] = useRecoilState(sideBarController);

  const getMapFutures = (values) => {
    console.log(values);
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
        console.log(res.data?.features[0]?.properties);
        res.data.features[0].properties &&
          setSideBarControllerData({
            children: (
              <>
                
                {Object.entries(res.data?.features[0]?.properties).map(
                ([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                )
              )}
              </>
            ),
            open: true,
          });
        //   res.data.features[0]?.geometry
        //     ? (() => {
        //         props.handleMarkerPointsChange({
        //           lat: res.data?.features[0]?.geometry?.coordinates[1],
        //           lng: res.data?.features[0]?.geometry?.coordinates[0],
        //         });
        //         setNotFound(false);
        //       })()
        //     : setNotFound(true);
      })
      .catch((err) => {
        console.log(err);
      }),
      [values];
  };
  return {
    getMapFutures,
  };
};

export default useGetMapFutures;
