import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getLayersQuery, layersFilterOpj } from "../../../utils/apolloQueries";
import { useTranslation } from "react-i18next";
import { wmsLayerState } from "../../../utils/recoilState";
import { useRecoilState } from "recoil";
import LayerCard from "../../Cards/LayerCard";
import { Stack, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoaderCard from "../../Cards/LoaderCard";
import NoResult from "../NoResult";

const LayersListBtns = (props) => {
  const [selectedVal, setSelectedVal] = useState("");
  const [layersCategory, setLayersCategory] = useState([]);

  const { i18n } = useTranslation();
  const [, setWmsLayer] = useRecoilState(wmsLayerState);

  const selectLayerHandle = (val) => {
    setSelectedVal(val?.id || false);
    setWmsLayer(val);
  };

  const {
    data: LayersRes,
    LayersError,
    loading: LayersLoading,
  } = useQuery(getLayersQuery, {
    variables: layersFilterOpj(props.categoryData.val, i18n.language),
  });

  useEffect(() => {
    setLayersCategory(LayersRes?.layer);
  }, [LayersRes]);

  return (
    <>
      {/* loader   */}
      {LayersLoading ? (
        [1, 2, 3, 4, 5, 6, 7, 8].map((el, indx) => (
          <LoaderCard key={el * indx} />
        ))
      ) : (
        <div>
          {/* header panel */}
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Typography component="h6" variant="h6">
              {props.categoryData.name}
            </Typography>
            {/* back btn */}
            <IconButton
              color="primary"
              onClick={() => props.changeCategoryDataHandel(null)}
            >
              <ArrowBackIcon />
            </IconButton>
          </Stack>
          {LayersError ? (
            <NoResult error />
          ) : layersCategory?.length < 1 ? (
            <NoResult />
          ) : (
            layersCategory?.map((el) => (
              <LayerCard
                key={el?.id}
                data={el}
                selectLayerHandle={() => {
                  selectedVal === el?.id? selectLayerHandle(false) : selectLayerHandle(el)
          }
                }
                isSelected={selectedVal === el?.id}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};
export default LayersListBtns;
