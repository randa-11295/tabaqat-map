import { useState } from "react";
import { Button, Stack } from "@mui/material";
import GeoCoding from "./GeoCoding";
import ReverseGeoCoding from "./ReverseGeoCoding";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const MapHeaderInfo = (props) => {

  const [isGeoCoding, setIsGeoCoding] = useState(true);
  const changeGeoCodingHandle = () => {
    const toggleGeoCoding = !isGeoCoding;
    setIsGeoCoding(toggleGeoCoding);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={boxStyle}>
        {isGeoCoding ? (
          <GeoCoding
            handleMarkerPointsChange={props.handleMarkerPointsChange}
          />
        ) : (
          <ReverseGeoCoding
            handleMarkerPointsChange={props.handleMarkerPointsChange}
          />
        )}
        <Button
          variant="contained"
          onClick={changeGeoCodingHandle}
          sx={btnStyle}
        >
          {isGeoCoding ? <MapOutlinedIcon /> : <FmdGoodOutlinedIcon />}
        </Button>
      </Stack>
    </>
  );
};

export default MapHeaderInfo;

const boxStyle = {
  position: "relative",
  zIndex: "400",
  top: 0,
  padding: 1.25,
  width: {
    md: "70%",
    lg: "50%",
  },
};


const btnStyle = { boxShadow: 0, width:{ xs :"40px" , md : "45px"}, minWidth: "auto" , height : "58px" }