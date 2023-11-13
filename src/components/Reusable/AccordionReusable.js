import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionReusable(props) {
  return (
    <Accordion sx={{my : 1 , borderRadius : "3px" , width : "95%"}} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography component="h5" sx={{fontWeight : 600 , fontSize : ".9rem" , color : "info.main" }}>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{  color : "secondary.main" , padding :  " 0 7px" , m : 1 , }}>{props.children}</AccordionDetails>
    </Accordion>
  );
}
