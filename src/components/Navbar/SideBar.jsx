import Drawer from "@mui/material/Drawer";
import useConfig from "../../utils/config";
import TabsSideBar from "./TabsSideBar";


const SideBar = (props) => {
  const { drawerWidth } = useConfig();
  const drawerStyle = {
    display: props.mob
      ? { xs: "block", md: "none" }
      : { xs: "none", md: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      bgcolor: "secondary.main",
      color: "white",
      flexShrink: 0,
    },
  };

  const closeHandle = (e) => {
    if (!e.target.classList.contains("MuiBackdrop-root") || !props.mob) return;
    props.handleMobileDrawerToggle();
  };

  return (
    <Drawer
      container={props.container}
      variant={props.variant}
      open={props.open}
      ModalProps={{
        keepMounted: true,
        onClick: closeHandle,
      }}
      sx={drawerStyle}
    >
      <TabsSideBar />
    </Drawer>
  );
};

export default SideBar;
