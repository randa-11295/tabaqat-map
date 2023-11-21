import { Card, Typography } from "@mui/material";

export default function GeoDataCard(props) {
  return (
    <Card sx={cardStyle}>
      <Typography sx={titleStyle} gutterBottom>
        {props.title?.replaceAll("_", " ")}
      </Typography>
      <Typography
        noWrap
        variant="h4"
        sx={{ fontSize: "1.35rem" }}
        color="info.main"
      >
        {props.data || 0}
      </Typography>
    </Card>
  );
}

const cardStyle = {
  color: "secondary.contrastText",
  px: 1.5,
  py: 0.75,
  mb: 2,
  "& .MuiCardHeader-action": { m: 0 },
};

const titleStyle = {
  fontSize: 11,
  fontWeight: 800,
  textTransform: "capitalize",
  color: "primary.main",
};
