import { useRecoilState } from "recoil";
import { geoDataState } from "./recoilState";

const useConfig = () => {
   const access_token = "tabaqat-UHJiK-NMGP-EkNN7G6aMEQ";
   const [geoData] = useRecoilState(geoDataState);
  return {
    centerArr: [45, 24],
    zoomLevel: 4,
    baseMapUrl: (baseMabId) => {
      if (!baseMabId) return null;
      return `https://basemaps.tabaqat.net/styles/${baseMabId}/style.json?access_token=${access_token}`;
    },
    accessToken : access_token,
    wmsUrl: (workspaceName, wmsName) => {
      if (!workspaceName || !wmsName) return null;
      return  `https://data.tabaqat.net/geoserver/${workspaceName}/${wmsName}/wms?access_token=${access_token}`  
    },

    getAssetURL: (id) => {
      if (!id) return null;
      return `https://catalog.tabaqat.net/assets/${id}`;
    },
    getLayersImageURL : (layerName , categoryName)=>{
      return `https://data.tabaqat.net/geoserver/${categoryName}/wms?layers=${categoryName}%3A${layerName}&access_token=${access_token}&service=WMS&version=1.1.0&request=GetMap&bbox=34.57222222222222%2C16.369444444444444%2C55.638888888888886%2C32.56388888888889&width=768&height=590&srs=EPSG%3A4326&styles=&format=image%2Fpng`
    }, 
    drawerWidth: {
      xs: "290px",
      sm: "350px",
      md: "380px",
      lg: "400px",
      xl: "420px",
    },
    geoDatArr : [
      {
        name: "coordinates",
        isTitle : true
      },
      {
        name: "lat",
        data: geoData?.lat,
      },
      {
        name: "long",
        data: geoData?.lng,
      },
      {
        name: "points",
        isTitle : true
      },
      {
        name: "pointY",
        data: geoData?.y,
      },
      {
        name: "pointX",
        data: geoData?.x,
      },
      {
        name: "bBox",
        isTitle : true
      },
      {
        name: "northEast",
        data: geoData?.bBox?._ne?.lat,
        half: true,
      },
      {
        name: "northWest",
        data: geoData?.bBox?._ne?.lng,
        half: true,
      },
      {
        name: "southWest",
        data: geoData?.bBox?._sw?.lat,
        half: true,
      },
      {
        name: "southEast",
        data: geoData?.bBox?._sw?.lng,
        half: true,
      },
    ]
  };
};

export default useConfig;
