import { Card, Typography } from "@mui/material";

export default function GeoDataCard(props) {
  return (
    <Card sx={cardStyle}>
      <Typography sx={{ fontSize: 13 }} color="primary.main" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="h4" sx={{ fontSize: "1.7rem" }} color="info.main">
        {props.data || 0}
      </Typography>
    </Card>
  );
}

const cardStyle = {
  color: "secondary.contrastText",
  px: 1.5,
  py : .75,
  mb: 2,
  "& .MuiCardHeader-action": { m: 0 },
};
