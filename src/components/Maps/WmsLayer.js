import useConfig from "../../utils/config";
import { useRecoilState } from "recoil";
import { wmsLayerState } from "../../utils/recoilState";
import { MlWmsLayer } from "@mapcomponents/react-maplibre";

const WmsLayer = ()=>{
    const [wmsLayerGlobeData] = useRecoilState(wmsLayerState);
    const { wmsUrl } = useConfig();
    return ( wmsLayerGlobeData.name &&  <MlWmsLayer
        visible={true}
        url={wmsUrl(
          wmsLayerGlobeData?.workspace?.name,
          wmsLayerGlobeData.name
        )}
        urlParameters={{
          layers: wmsLayerGlobeData.name,
          transparent: true,
        }}
      />
    )
}

export default WmsLayer