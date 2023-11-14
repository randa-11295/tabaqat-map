import { Card, CardMedia, Typography } from "@mui/material";
import useConfig from "../../utils/config";

export default function LayerCard(props) {
  const { getLayersImageURL } = useConfig();

  return (
    <Card sx={cardStyle(props.isSelected)} onClick={props?.selectLayerHandle}>
      <CardMedia
        onClick={() => {
          console.log(getLayersImageURL());
          console.log(props.data);
        }}
        component="img"
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: 2,
          objectFit: "contain",
        }}
        alt={props.data.translations[0]?.title}
        image={getLayersImageURL(
          props?.data?.name,
          props?.data?.workspace.name
        )}
        // "https://eu2.contabostorage.com/8496006d59724e76a11e0661b45ef60e:platform-content/assets%2FdefaultMapImg.png"
      />

      <Typography sx={{ p: 0, pl: 1, fontSize: ".85rem", pb: 0 }}>
        {props.data?.translations[0]?.title}
      </Typography>
    </Card>
  );
}

const cardStyle = (isSelected) => ({
  display: "flex",
  alignItems: "center",
  my: 2,
  p: 1,
  border: 2,
  borderColor: "grey",
  transition: ".3s",
  cursor: "pointer",
  color: isSelected ? "primary.main" : "secondary.main",
  fontWight: isSelected ? "700" : "500",
  " &:hover ": {
    transform: "scale(1.1) skew(-1deg)",
    color: "primary.main",
    borderColor: "primary.main",
  },
});
