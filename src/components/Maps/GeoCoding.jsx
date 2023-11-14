import {
  List,
  InputAdornment,
  OutlinedInput,
  FormControl,
  ListItem,
  ListItemButton,
  Box,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import useConfig from "../../utils/config";

export default function GeoCoding(props) {
  const [selected, setSelected] = useState({});
  const [listShowed, setListShowed] = useState(false);
  const [autocompleteOption, setAutocompleteOption] = useState([]);
  const [val, setVal] = useState("");
  const { accessToken } = useConfig();
  const { t } = useTranslation();

  useEffect(() => {
    if ((selected.label && val === selected.label) || !val) return;
    axios
      .get(`https://geocoder.tabaqat.net/v1/autocomplete`, {
        params: {
          text: val,
          access_token: accessToken,
          lang: "en",
          size: "6",
        },
      })
      .then((res) => {
        setAutocompleteOption(res.data.features);
        setListShowed(true);
      })
      .catch((err) => {
        console.log(err);
        setListShowed(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const changeHandle = (event) => {
    setVal(event.target.value);
  };

  const handleListItemClick = (el) => {
    setSelected(el?.properties);
    setVal(el?.properties.label);
    setListShowed(false);
    props.handleMarkerPointsChange({
      lat: el?.geometry.coordinates[1],
      lng: el?.geometry.coordinates[0],
    });
  };

  return (
    <Box flexGrow={1} onClick={() => setListShowed(false)} sx={{ mx: 0.5 }}>
      <FormControl fullWidth color="info" sx={inputStyle} variant="outlined">
        <OutlinedInput
          placeholder={t("geoCoding.search")}
          fullWidth
          value={val}
          onChange={changeHandle}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon color="info" />
            </InputAdornment>
          }
        />
      </FormControl>
      {listShowed ? (
        <List
          component="aside"
          sx={{ background: "white", borderRadius: "5px", boxShadow: 3 }}
        >
          {autocompleteOption.length >= 1 ? (
            autocompleteOption.map((el) => (
              <ListItemButton
                key={el?.properties.id}
                selected={el?.properties.id === selected?.id}
                onClick={() => handleListItemClick(el)}
              >
                <ListItemText primary={el?.properties.label} />
              </ListItemButton>
            ))
          ) : (
            <ListItem>
              <ListItemText primary={val + t("geoCoding.notAvailable")} />
            </ListItem>
          )}
        </List>
      ) : null}
    </Box>
  );
}

const inputStyle = {
  background: "white",
  borderRadius: "4px",
  border: "#16aa9d 1px  solid",
};
