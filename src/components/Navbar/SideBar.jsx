import Drawer from "@mui/material/Drawer";
import useConfig from "../../utils/config";
import { sideBarController } from "../../utils/recoilState";
import { useRecoilState } from "recoil";

const SideBar = (props) => {
  const { drawerWidth } = useConfig();
  const [sideBarControllerData, setSideBarControllerData] =
    useRecoilState(sideBarController);

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
      overflowX: "hidden",
    },
  };

  const closeHandle = (e) => {
    if (!e.target.classList.contains("MuiBackdrop-root") || !props.mob) return;
    setSideBarControllerData({
      open: false,
      children: null,
    });
  };

  return (
    <Drawer
      container={props.container}
      variant={props.variant}
      open={sideBarControllerData.open}
      ModalProps={{
        keepMounted: true,
        onClick: closeHandle,
      }}
      sx={drawerStyle}
    >
      {sideBarControllerData.children}
    </Drawer>
  );
};

export default SideBar;
