import { atom } from 'recoil';

// Atoms
export const geoDataState = atom({
  key: 'geoDataState',
  default: {},
});


export const markPositionState = atom({
  key: 'markPositionState',
  default: null,
});


export const wmsLayerState = atom({
  key: 'wmsLayerState',
  default: {},
});


export const baseMapIdState = atom({
  key: 'baseMapIdState',
  default: "basic-arabic-ksa-boundary",
});

