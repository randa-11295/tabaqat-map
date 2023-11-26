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
  const { getFuturesService } = useConfig();

  useEffect(() => {
    if (!mapLibre || !markerPints.lng || !markerPints.lat) return;
    mapLibre.flyTo({
      center: [markerPints.lng, markerPints.lat],
      zoom: 9,
      speed: 1,
      curve: 1.5,
    });
  }, [mapLibre, markerPints.lng, markerPints.lat, markerPints]);

  useEffect(() => {
    if (!mapLibre) return;
    // Event listener for click on the map
    mapLibre.on("click", (e) => {
      const { lngLat, point } = e;
      
      
      // Get the current bounding box (bbox) of the map
      getMapFutures({ lat: lngLat.lat, long: lngLat.lng });
      const bBox = mapLibre.getBounds();
    const bBoxStr=  `${bBox._sw.lng}.${bBox._sw.lat}.${bBox._ne.lng}.${bBox._ne.lat}`
      axios
        .get(getFuturesService(bBoxStr))
        .then((res) => console.log(res?.data?.features))
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
