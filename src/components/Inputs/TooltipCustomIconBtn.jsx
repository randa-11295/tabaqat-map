import { Tooltip, Button } from "@mui/material";

export default function TooltipCustomIconBtn(props) {
  return (
    <Tooltip title={props?.text}>
      <Button
        type="submit"
        variant="outlined"
        sx={{ pr: 0.5, pl: 0.3, width: "auto", minWidth: "auto" }}
      >
        {props.children}
      </Button>
    </Tooltip>
  );
}
