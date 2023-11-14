import { Box } from "@mui/material";
import { geoDataState } from "../../utils/recoilState";
import { useRecoilState } from "recoil";
import { useMap , MlMarker} from "@mapcomponents/react-maplibre";
import { useEffect, useState } from "react";
import MapGenerator from "./MapGeneretor";
import WmsLayer from "./WmsLayer";
import MapHeaderInfo from "./MapHeaderInfo";

function MainMap() {
  const [markerPints, setMarkerPints] = useState({});
  const [, setDeoData] = useRecoilState(geoDataState);
  const { map: mapLibre } = useMap();

  const handleMarkerPointsChange = (points) => {
    setMarkerPints(points);
    mapLibre.flyTo({
      center: [points.lng, points.lat], 
      zoom: 14,
      speed: 1, 
      curve: 1,
    });
  };
  useEffect(() => {
    if (!mapLibre) return;
    // Event listener for click on the map
    mapLibre.on("click", (e) => {
 

      const { lngLat, point } = e;

      // Get the current bounding box (bbox) of the map
      const bBox = mapLibre.getBounds();
      setDeoData({
        ...lngLat,
        ...point,
        bBox,
      });
    });
  }, [mapLibre, setDeoData]);

  return (
    <Box sx={boxStyle}>
      <MapGenerator />
      <WmsLayer />
      <MapHeaderInfo handleMarkerPointsChange={handleMarkerPointsChange} />
      {markerPints.lat && markerPints.lng && (
        <MlMarker lat={markerPints?.lat} lng={markerPints?.lng} />
      )}
    </Box>
  );
}

export default MainMap;

const boxStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: 5,
  background: "lightgrey",
  position: "relative",
};
