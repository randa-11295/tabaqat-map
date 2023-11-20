import { useEffect } from "react";
import MainMap from "../components/Maps/MainMap";
import Navbar from "../components/Navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import useConfig from "../utils/config";
import { sideBarController } from "../utils/recoilState";
import { useRecoilState } from "recoil";
import { useTheme } from "@mui/material/styles";
import TabsSideBar from "../components/Navbar/TabsSideBar";

const Home = () => {
  const { drawerWidth } = useConfig();
  const [sideBarControllerData, setSideBarControllerData] =
    useRecoilState(sideBarController);

  const controlNaVSideBarHandle = (open, element) => {
    setSideBarControllerData({ open: open, children: element });
  };

  const theme = useTheme();
  const isMatchesBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    isMatchesBigScreen
      ? controlNaVSideBarHandle(true, <TabsSideBar />)
      : controlNaVSideBarHandle(false, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatchesBigScreen]);

  const BoxMapStyle = {
    width: !sideBarControllerData.open
      ? "100%"
      : {
          xs: "100%",
          md: `calc(100% - ${drawerWidth.md} )`,
          lg: `calc(100% - ${drawerWidth.lg} )`,
          xl: `calc(100% - ${drawerWidth.xl} )`,
        },
    ml: "auto",
    mt: "65px",
    mb: 2,
    p: 2,
    height: "calc(100% - 65px)",
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar
        closeNaVSideBarHandle={() => controlNaVSideBarHandle(false, null)}
      />
      <Box sx={BoxMapStyle}>
        <MainMap />
      </Box>
    </Box>
  );
};

export default Home;
