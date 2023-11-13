import markerIconPath from "../../Images/map-marker-icon.png";
import L from "leaflet";
import {
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilState } from "recoil";
import { geoDataState , markPositionState} from "../../utils/recoilState";

function LocationMarker() {
  const [markPosition, setMarkPosition] = useRecoilState(markPositionState);
  const [, setGeoData] = useRecoilState(geoDataState);

  const map = useMapEvents({
    click(e) {
  
      setMarkPosition(e.latlng);
      setGeoData({ ...e.latlng, ...e.layerPoint, bBox: map.getBounds() });
    },
  });

  const customIcon = new L.Icon({
    iconUrl: markerIconPath,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  return markPosition === null ? null : (
    <Marker position={markPosition} icon={customIcon}>
      <Popup> You are here </Popup>
    </Marker>
  );
}

export default LocationMarker;
