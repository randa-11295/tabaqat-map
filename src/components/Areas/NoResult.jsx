import { Typography, Card } from "@mui/material";
import { useTranslation } from "react-i18next";

const NoResult = (props) => {
  const { t } = useTranslation();
  return (
    <Card sx={{ px: 1, py: 2, my: 4 }}>
      <Typography
        sx={{
          fontSize: ".85rem",
          textAlign: "center",
          fontWeight: 700,
          color: "grey",
        }}
      >
        {props.error ? t("geoCoding.hasError") : t("geoCoding.noResult")}
      </Typography>
    </Card>
  );
};

export default NoResult;
