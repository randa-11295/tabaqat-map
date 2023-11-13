import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModelReusable(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        variant="contained"
        onClick={handleClickOpen}
        sx={{ mx: 0.5 }}
        size="small"
        color="primary"
      >
        <InfoOutlinedIcon />
      </IconButton>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          {props.data?.translations[0]?.title || "layer name"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {props.data?.translations[0]?.abstract && (
            <Typography gutterBottom >
              {props.data?.translations[0]?.abstract}
            </Typography>
          )}
          {props.data?.wfs_url && (
            <Typography gutterBottom>
              <b> WFS : </b>
              {props.data?.wfs_url}
            </Typography>
          )}
          {props.data?.wms_url && (
            <Typography gutterBottom>
              <b> WMS : </b>
              {props.data?.wms_url}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
