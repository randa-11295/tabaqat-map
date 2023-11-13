import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import GeoDataList from "../Areas/GeoDataList";
import BaseMapsList from "../Areas/BaseMapsList";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import MapServicesPanel from "../Areas/MapServicesPanel/MapServicesPanel";

export default function TabsSideBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={headerTapsStyle}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& *": { color: "white" },
            "& .Mui-selected *": { color: "inherit  " },
          }}
        >
          <Tab icon={<LayersOutlinedIcon />} />
          <Tab icon={<GpsFixedOutlinedIcon />} />
          <Tab icon={<MapOutlinedIcon />} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MapServicesPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GeoDataList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BaseMapsList />
      </TabPanel>
    </Box>
  );
}

//? it handel mui changes
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel?.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const headerTapsStyle = {
  boxShadow: 1,
  position: "sticky",
  width: "inherit",
  top: "0",
  bgcolor: "secondary.main",
  zIndex: 10,
};
