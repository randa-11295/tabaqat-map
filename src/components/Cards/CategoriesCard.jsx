import { Card, Avatar, Typography } from "@mui/material";
import  useConfig  from "../../utils/config";

const CategoriesCard = (props) => {
  const { getAssetIconURL } = useConfig();

  return (
    <Card sx={cardStyle}>
      <Avatar
        variant="rounded"
        alt={props.data?.name}
        src={getAssetIconURL(props.data?.iconId)}
        sx={{ width: 30, height: 30 }}
      />
      <Typography noWrap sx={{ fontSize: ".8rem", mt: 1.5 }}>
        {props.data.name}
      </Typography>
    </Card>
  );
};

export default CategoriesCard;

const cardStyle = {
  p: 1.5,
  border: 2,
  color: "secondary.main",
  borderColor: "#1ba7a6",
  transition: ".3s",
  cursor: "pointer",
  "& img": { filter: " sepia(84%)  hue-rotate(116deg)" },
  " &:hover ": {
    transform: "scale(1.1) skew(-1deg)",
    color: "primary.main",
    borderColor: "primary.main",
  },
  " &:hover img": {
    filter: "none",
  },
};
