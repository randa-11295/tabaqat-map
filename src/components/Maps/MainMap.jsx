import { Box } from "@mui/material";
import { geoDataState } from "../../utils/recoilState";
import { useRecoilState } from "recoil";
import { useMap, MlMarker } from "@mapcomponents/react-maplibre";
import { useEffect } from "react";
import MapGenerator from "./MapGenerator";
import WmsLayer from "./WmsLayer";
import MapHeaderInfo from "./MapHeaderInfo";
import useGetMapFutures from "../../Hooks/useGetMapFutures";
import { markerPintsState } from "../../utils/recoilState";
import useConfig from "../../utils/config";
import axios from "axios";

export default function MainMap() {
  const [, setDeoData] = useRecoilState(geoDataState);
  const { map: mapLibre } = useMap();
  const { getMapFutures } = useGetMapFutures();
  const [markerPints] = useRecoilState(markerPintsState);
  const { getFuturesService, access_token } = useConfig();

  useEffect(() => {
    if (!mapLibre || !markerPints.lng || !markerPints.lat) return;
    // mapLibre.flyTo({
    //   center: [markerPints.lng, markerPints.lat],
    //   zoom: 9,
    //   speed: 1,
    //   curve: 1.5,
    // });
  }, [mapLibre, markerPints.lng, markerPints.lat, markerPints]);

  useEffect(() => {
    if (!mapLibre) return;
    // Event listener for click on the map
    mapLibre.on("click", (e) => {
      const { lngLat, point } = e;

      // Get the current bounding box (bbox) of the map
      getMapFutures({ lat: lngLat.lat, long: lngLat.lng });
      const bBox = mapLibre.getBounds();
      const bBoxStr = `${bBox._sw.lng}, ${bBox._sw.lat}, ${bBox._ne.lng}, ${bBox._ne.lat}`;

      console.log(bBox);
      console.log(bBoxStr);

      // https://data.tabaqat.net/geoserver/health/health_YPwlK276253/ows?
      // exceptions=XML%20&
      // version=2.0.0
      // %20&AcceptLanguages=en%20
      // &access_token=mapsaudi2coXRtfzYLLe6sg-ZEOwg%20
      // &service=WFS%20
      // &request=GetFeature%20&
      // TYPENAMES=health_YPwlK276253%20&
      // crs=EPSG%3A4326%20
      // &outputFormat=application%2Fjson%20
      // &CQL_FILTER=DWITHIN(wkb_geometry,%20POINT(24.231%2040.820),%200.001,%20meters)

      axios
        .get(
          `https://data.tabaqat.net/geoserver/health/health_YPwlK276253/ows?exceptions=XML%20&version=2.0.0%20&AcceptLanguages=en%20&access_token=tabaqat-9jAtRioHaQZWASaDsTXyxA&service=WFS%20&request=GetFeature%20&TYPENAMES=health_YPwlK276253%20&crs=EPSG%3A4326%20&outputFormat=application%2Fjson%20&CQL_FILTER=DWITHIN(wkb_geometry,%20POINT(24.231%2040.820),%200.001,%20meters)`
          // {
          //   params: {
          //     exceptions: "XML",
          //     version: "2.0.0",
          //     // feature_count: "101",
          //     AcceptLanguages: "en",
          //     access_token: "tabaqat-UHJiK-NMGP-EkNN7G6aMEQ",
          //     service: "WFS",
          //     request: "GetFeature",
          //     layers: "education-and-training_oznzW880947",
          //     TYPENAMES: "health_YPwlK276253",
          //     outputFormat: "application/json",
          //     crs: "EPSG:4326",
          //     CQL_FILTER:
          //       "DWITHIN(wkb_geometry,%20POINT(24.231%2040.820),%200.001,%20meters",
          //   },
          // }
        )
        .then((res) => console.log(res?.data?.features, res?.data))
        .catch((err) => console.log(err));
      setDeoData({
        ...lngLat,
        ...point,
        bBox,
      });
    });
  }, [getFuturesService, getMapFutures, mapLibre, setDeoData]);

  return (
    <Box sx={boxStyle}>
      <MapGenerator />
      <WmsLayer />
      <MapHeaderInfo />
      {markerPints.lat && markerPints.lng && (
        <MlMarker lat={markerPints?.lat} lng={markerPints?.lng} />
      )}
    </Box>
  );
}

const boxStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: 5,
  background: "lightgrey",
  position: "relative",
};
