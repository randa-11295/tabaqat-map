import { useState } from "react";
import MainMap from "../components/Maps/MainMap";
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@mui/system";
import useConfig from "../utils/config";

const Home = () => {
  const [isSideNaVOpen, setIsSideNavOpen] = useState(true);
  const { drawerWidth } = useConfig();

  const closeNaVSideBarHandle = (val) => {
    setIsSideNavOpen(val);
  };

  const BoxMapStyle = {
    width: !isSideNaVOpen
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
      <Navbar closeNaVSideBarHandle={closeNaVSideBarHandle} />
      <Box sx={BoxMapStyle}>
        <MainMap />
      </Box>
    </Box>
  );
};

export default Home;
