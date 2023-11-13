import axios from "axios";
import { useFormik } from "formik";
import { Stack, Box, Typography } from "@mui/material";
import InputTextCustom from "../Inputs/InputTextCustom";
import SendIcon from "@mui/icons-material/Send";
import TooltipCustomIconBtn from "../Inputs/TooltipCustomIconBtn";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReverseGeoCoding = (props) => {
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      lat: 0,
      long: 0,
    },
    onSubmit: (values) => {
      if (!values.lat || !values.lat) return;
      axios
        .get(`https://geocoder.tabaqat.net/v1/reverse`, {
          params: {
            "point.lat": values.lat,
            "point.lon": values.long,
            access_token: "tabaqat-a2nTyh6mgoKC2yju76Pg4C",
            lang: "en",
          },
        })
        .then((res) => {
          res.data.features[0]?.geometry
            ? (() => {
                props.handleMarkerPointsChange({
                  lat: res.data?.features[0]?.geometry?.coordinates[1],
                  lng: res.data?.features[0]?.geometry?.coordinates[0],
                });
                setNotFound(false);
              })()
            : setNotFound(true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack
        sx={BoxStyle}
        component="form"
        onSubmit={formik.handleSubmit}
        justifyContent="flex-start"
        direction="row"
        alignItems="top"
      >
        <InputTextCustom
          formik={formik}
          name="long"
          type="number"
          label={t("geoData.long")}
        />
        <InputTextCustom
          formik={formik}
          name="lat"
          type="number"
          label={t("geoData.lat")}
        />

        <TooltipCustomIconBtn text="send">
          <SendIcon sx={{ fontSize: "1.1rem" }} />
        </TooltipCustomIconBtn>
      </Stack>
      {notFound && (
        <Typography sx={noResultStyle}>{t("geoCoding.noResult")}</Typography>
      )}
    </Box>
  );
};

export default ReverseGeoCoding;

const BoxStyle = {
  px: 0.75,
  py: 1,
  mx: 0.5,
  backgroundColor: "white",
  borderRadius: "5px",
  border: "#16aa9d 1px  solid",
};

const noResultStyle = {
  p: 1,
  color: "grey",
  fontWeight: "800",
  fontSize: ".85rem",
};
