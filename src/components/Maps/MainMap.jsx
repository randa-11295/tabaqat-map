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

      console.log(bBoxStr);

      // Bounding box in decimal degrees [minlon, minlat, maxlon, maxlat]
      const bboxDecimalDegrees = [
        bBox._sw.lng,
        bBox._sw.lat,
        bBox._ne.lng,
        bBox._ne.lat,
      ];

      // Conversion factor for latitude
      const latConversionFactor = 20037508.34 / 180;

      // Convert the bounding box to Mercator
      const bboxMercator = [
        bboxDecimalDegrees[0] * latConversionFactor,
        Math.log(Math.tan(((bboxDecimalDegrees[1] + 90) * Math.PI) / 360)) *
          latConversionFactor,
        bboxDecimalDegrees[2] * latConversionFactor,
        Math.log(Math.tan(((bboxDecimalDegrees[3] + 90) * Math.PI) / 360)) *
          latConversionFactor,
      ];

      // Convert the array elements to strings and join with commas
      const bboxMercatorString = bboxMercator.join(",");

      console.log( bboxMercatorString);
      console.log("4539747.983913187,2191602.4749925733,4696291.017841227,2348145.5089206137");

      axios
        .get(
          `https://data.tabaqat.net/geoserver/education-and-training/education-and-training_oznzW880947/ows`,
          {
            params: {
              exceptions: "XML",
              version: "1.3.0",
              feature_count: "101",
              AcceptLanguages: "en",
              access_token: "tabaqat-UHJiK-NMGP-EkNN7G6aMEQ",
              service: "WMS",
              request: "GetFeatureInfo",
              layers: "education-and-training_oznzW880947",
              query_layers: "education-and-training_oznzW880947",
              bbox: bboxMercatorString,
              width: "256",
              height: "256",
              crs: "EPSG:3857",
              info_format: "application/json",
              i: 65,
              j: 212,
            },
          }
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
