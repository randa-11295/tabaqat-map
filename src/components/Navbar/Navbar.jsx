import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./SideBar";
import TopNavbar from "./TopNavBar";
import useConfig from "../../utils/config";
import { sideBarController } from "../../utils/recoilState";
import { useRecoilState } from "recoil";
function Navbar(props) {
  const { drawerWidth } = useConfig();

  const { window } = props;

  const [sideBarControllerData] = useRecoilState(sideBarController);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopNavbar />
      <Box
        component="nav"
        sx={{ width: { ...drawerWidth, xs: 0 }, flexShrink: { sm: 0 } }}
      >
        {/* mobile nav big screen */}
        <SideBar container={container} mob variant="temporary" />

        {/* side nav big screen */}
        <SideBar open={sideBarControllerData} variant="persistent" />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
