export function getAssetURL(id) {
  if (!id) return null;
  return `${
    //   process.env.NODE_ENV === "production"
    //     ? process.env.REACT_APP_API_URL_PRODUCTION
    //     : process.env.REACT_APP_API_URL_DEVELOPMENT
    "https://catalog.tabaqat.net/"
  }assets/${id}`;
}

export function getAssetGetserversLayersImageURL(layer, workspace) {
  if (!layer)
    return "https://eu2.contabostorage.com/8496006d59724e76a11e0661b45ef60e:platform-content/assets%2FdefaultMapImg.png";
  return `https://data.tabaqat.net/geoserver/${+workspace}/wms?service=WMS&version=1.1.0&request=GetMap&layers=${workspace}%3A${layer}&bbox=34.57222222222222%2C16.369444444444444%2C55.638888888888886%2C32.56388888888889&width=768&height=590&srs=EPSG%3A4326&access_token=tabaqat-UHJiK-NMGP-EkNN7G6aMEQ&styles=&format=image%2Fpng`;
}


export function isString(variable) {
  return typeof variable === 'string';
}