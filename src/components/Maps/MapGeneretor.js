import { MapLibreMap } from "@mapcomponents/react-maplibre";
import { useRecoilState } from "recoil";
import { baseMapIdState } from "../../utils/recoilState";
import maplibregl from "@mapcomponents/react-maplibre/node_modules/maplibre-gl";
import useConfig from "../../utils/config";

maplibregl.setRTLTextPlugin(
  "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
  null,
  true 
);

const MapGenerator = () => {
  const { centerArr, zoomLevel, baseMapUrl } = useConfig();
  const [baseMapGlobeId] = useRecoilState(baseMapIdState);
  return (
    <MapLibreMap
      options={{
        style: baseMapUrl(baseMapGlobeId),
        center: centerArr,
        zoom: zoomLevel,
      }}
      style={boxStyle}
    />
  );
};
export default MapGenerator;

const boxStyle ={ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }