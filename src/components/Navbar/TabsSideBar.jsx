import { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
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
          value={value}
          sx={{
            "& *": { color: "white" },
            "& .Mui-selected *": { color: "inherit  " },
          }}
        >
          <Tab icon={<LayersOutlinedIcon />} value="0" />

          <Tab icon={<MapOutlinedIcon />} value="1" />
        </TabList>
      </Box>

      <TabPanel value="0">
        <MapServicesPanel />
      </TabPanel>
      <TabPanel value="1">
        <BaseMapsList />
      </TabPanel>
    </TabContext>
  );
}
