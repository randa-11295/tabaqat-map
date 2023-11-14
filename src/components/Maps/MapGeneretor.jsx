import { MapLibreMap } from "@mapcomponents/react-maplibre";
import { useRecoilState } from "recoil";
import { baseMapIdState } from "../../utils/recoilState";
import useConfig from "../../utils/config";
import { useExportMap } from "@mapcomponents/react-maplibre";
import mainMap from "maplibre-gl";

mainMap.setRTLTextPlugin(
  "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
);

const MapGenerator = () => {
  const { centerArr, zoomLevel, baseMapUrl } = useConfig();
  const [baseMapGlobeId] = useRecoilState(baseMapIdState);
  return (
    <MapLibreMap
      mapId="mainMap"
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

const boxStyle = { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 };
