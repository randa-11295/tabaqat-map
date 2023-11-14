import { Avatar, Card, CardHeader, Radio } from "@mui/material";
import { baseMapIdState } from "../../utils/recoilState";
import { useRecoilState } from "recoil";
import useConfig from "../../utils/config";
import { useTranslation } from "react-i18next";
export default function BaseMapCard(props) {
  const [baseMapGlobeId, setBaseMapGlobeId] = useRecoilState(baseMapIdState);
  const { getAssetURL } = useConfig();
  const { i18n } = useTranslation();
  return (
    <Card
      sx={cardStyle}
      onClick={() => {
        setBaseMapGlobeId(props.data.basemap_id);
      }}
    >
      <CardHeader
        sx={cardHeaderStyle}
        avatar={
          <Avatar
            sx={{ border: 0.1, borderColor: "secondary.contrastText" }}
            variant="rounded"
            alt={props.data.basemap_id}
            src={props.data.image.id && getAssetURL(props.data.image.id)}
          />
        }
        action={
          <Radio
            checked={baseMapGlobeId === props.data.basemap_id}
            value={props.data.basemap_id}
            name="baseMabVal"
          />
        }
        title={
          <p>
            {i18n.language === "en" ? props.data.name_en : props.data.name_ar}
          </p>
        }
      />
    </Card>
  );
}

const cardStyle = {
  color: "secondary.contrastText",
  cursor: "pointer",
  pr: 0.5,
  mb: 3,
  transition: ".3s",
  "&:hover": { transform: "scale(1.05) " },
  "& .MuiCardHeader-action": { m: 0 },
};

const cardHeaderStyle = {
  color: "secondary.contrastText",
  p: 1.6,
  pr: 0.5,
  "& .MuiCardHeader-action": { m: 0 },
};
