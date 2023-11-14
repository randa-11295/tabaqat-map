import { useState } from "react";
import { Tab, Box } from "@mui/material";
import {TabContext , TabList ,TabPanel } from "@mui/lab";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import GeoDataList from "../Areas/GeoDataList";
import BaseMapsList from "../Areas/BaseMapsList";
import MapServicesPanel from "../Areas/MapServicesPanel/MapServicesPanel";

const headerTapsStyle = {
  boxShadow: 1,
  position: "sticky",
  width: "inherit",
  top: "0",
  bgcolor: "secondary.main",
  zIndex: 10,
};

export default function LabTabs() {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <TabContext value={value}>
        <Box sx={headerTapsStyle}>
          <TabList
            onChange={handleChange}
            centered
            value={value}
            aria-label="basic tabs example"
            sx={{
              "& *": { color: "white" },
              "& .Mui-selected *": { color: "inherit  " },
            }}
          >
            <Tab icon={<LayersOutlinedIcon />} value="0" />
            <Tab icon={<GpsFixedOutlinedIcon />} value="1" />
            <Tab icon={<MapOutlinedIcon />} value="2" />
          </TabList>
        </Box>

        <TabPanel value="0">
          <MapServicesPanel />
        </TabPanel>
        <TabPanel value="1">
          <GeoDataList />
        </TabPanel>
        <TabPanel value="2">
          <BaseMapsList />
        </TabPanel>
      </TabContext>
  
  );
}
