import { Tab, Box } from "@mui/material";

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

import * as React from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
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
    </Box>
  );
}
