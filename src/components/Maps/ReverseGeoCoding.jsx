import { useFormik } from "formik";
import { Stack, Box } from "@mui/material";
import InputTextCustom from "../Inputs/InputTextCustom";
import SendIcon from "@mui/icons-material/Send";
import TooltipCustomIconBtn from "../Inputs/TooltipCustomIconBtn";
import { useTranslation } from "react-i18next";
import useGetMapFutures from "../../Hooks/useGetMapFutures"

const ReverseGeoCoding = () => {


  const { t } = useTranslation();
  const {getMapFutures} = useGetMapFutures()

  const formik = useFormik({
    initialValues: {
      lat: 0,
      long: 0,
    },
    onSubmit: (values) => {
      if (!values.lat || !values.lat) return;
      getMapFutures(values)
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

