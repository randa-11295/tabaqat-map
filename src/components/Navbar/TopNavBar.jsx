import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Toolbar,
  IconButton,
  AppBar,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../../Images/logo.png";
import useConfig from "../../utils/config";
import { useTranslation } from "react-i18next";
import ModelReusable from "../Reusable/ModelReusable";
import { useRecoilState } from "recoil";
import { wmsLayerState } from "../../utils/recoilState";
import { sideBarControllerState} from "../../utils/recoilState";
import TabsSideBar from "./TabsSideBar";
const TopNavbar = () => {
  const [wmsLayerGlobeData] = useRecoilState(wmsLayerState);
  const [sideBarController, setSideBarController] =
    useRecoilState(sideBarControllerState);

  const { drawerWidth } = useConfig();
  const { i18n, t } = useTranslation();

  const changeLanguageHandle = () => {
    i18n?.language === "en"
      ? i18n.changeLanguage("ar")
      : i18n.changeLanguage("en");
  };

  const handleDrawerToggle = () =>
    sideBarController.open
      ? setSideBarController({
          open: false,
          children: null,
        })
      : setSideBarController({
          open: true,
          children: <TabsSideBar />,
        });

  return (
    <AppBar
      position="fixed"
      color="default"
      open={sideBarController.open}
      sx={{
        width: {
          xs: "100%",
          md: sideBarController.open
            ? `calc(100% - ${drawerWidth.md} )`
            : "100%",
          lg: sideBarController.open
            ? `calc(100% - ${drawerWidth.lg} )`
            : "100%",
          xl: sideBarController.open
            ? `calc(100% - ${drawerWidth.xl} )`
            : "100%",
        },
        marginLeft: {
          md: drawerWidth.md,
          lg: drawerWidth.lg,
          xl: drawerWidth.xl,
        },
      }}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ maxWidth: "calc(100% - 190px )" }}
        >
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            color="primary"
            size="small"
            aria-label="open drawer"
            variant="contained"
            onClick={handleDrawerToggle}
            sx={btnBigScreenStyle}
          >
            <MenuIcon />
          </Button>
          {wmsLayerGlobeData.id && (
            <>
              <ModelReusable data={wmsLayerGlobeData} />
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {wmsLayerGlobeData?.translations[0]?.title}
              </Typography>
            </>
          )}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: { xs: "none", md: "flex" }, mx: 1 }}>
            <img src={logo} alt="tabaqat logo" height="25px" />
          </Box>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            sx={{ border: 1.7, fontWeight: 600 }}
            onClick={changeLanguageHandle}
          >
            {t("lang")}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default TopNavbar;

const btnBigScreenStyle = {
  display: {
    xs: "none",
    md: "block",
  },
  transition: ".5s",
  height: "32px",
  minWidth: "25px",
  boxShadow: "none !important",
};
