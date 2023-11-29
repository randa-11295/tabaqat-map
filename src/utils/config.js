
const useConfig = () => {
  const access_token = "tabaqat-UHJiK-NMGP-EkNN7G6aMEQ";
  
  return {
    centerArr: [45, 24],
    access_token : access_token, 
    zoomLevel: 4,
    baseMapUrl: (baseMabId) => {
      if (!baseMabId) return null;
      return `https://basemaps.tabaqat.net/styles/${baseMabId}/style.json?access_token=${access_token}`;
    },
    accessToken: access_token,
    wmsUrl: (workspaceName, wmsName) => {
      if (!workspaceName || !wmsName) return null;
      return `https://data.tabaqat.net/geoserver/${workspaceName}/${wmsName}/wms?access_token=${access_token}`;
    },
    
    getAssetIconURL: (id) => {
      if (!id) return null;
      return `https://catalog.tabaqat.net/assets/${id}`;
    },
    getLayersImageURL: (layerName, categoryName) => {
      return `https://data.tabaqat.net/geoserver/
      ${categoryName}/wms?layers=${categoryName}%3A
      ${layerName}&access_token=${access_token}
      &service=WMS&version=1.1.0
      &request=GetMap&bbox=34.57222222222222%2C16.369444444444444%2C55.638888888888886%2C32.56388888888889&
      width=768&
      height=590&
      srs=EPSG%3A4326&styles=&
      format=image%2Fpng`;
    },
    getFuturesService : (bBox)=>{
      const Box = "3757032.814272985%2C2504688.542848654%2C5009377.085697312%2C3757032.814272983"

      console.log(bBox , Box)
      
      return `https://data.tabaqat.net/geoserver/education-and-training/education-and-training_oznzW880947/ows?exceptions=XML&version=1.3.0&feature_count=101&AcceptLanguages=en&access_token=${access_token}&service=WMS&request=GetFeatureInfo&layers=education-and-training_oznzW880947&bbox=5009377.085697312%2C2504688.542848654%2C5635549.221409474%2C3130860.6785608195&width=256&height=256&crs=EPSG%3A3857&query_layers=education-and-training_oznzW880947&info_format=application%2Fjson&i=35&j=179
      `
    },

    isString: (variable) => {
      return typeof variable === "string";
    },

    drawerWidth: {
      xs: "290px",
      sm: "350px",
      md: "380px",
      lg: "400px",
      xl: "420px",
    },
    geoDataTitles: {
      bBox: ["northEast", "northWest", "southWest", "southEast"],
      coordinates: ["lat", "long"],

    }
  };
};

export default useConfig;
