import { gql } from "@apollo/client";

export const getCategoryQuery = gql`
  query Workspace(
    $filter: workspace_filter
    $translationsFilter2: workspace_translations_filter
  ) {
    workspace(filter: $filter) {
      translations(filter: $translationsFilter2) {
        title
        languages_code {
          code
        }
      }
      id
      icon {
        id
      }
    }
  }
`;

export const categoryFilterOpj = (lang)=>({
  translationsFilter2: {
    languages_code: {
      code: {
        _eq: lang === "en" ? "en-US" : "ar-SA",
      },
    },
  },
  filter: {
    status: {
      _eq: "published",
    },
  },
});

export const getBaseMapQuery = gql`
query Basemaps {
  basemaps {
    basemap_id
    name_ar
    name_en
    image {
      id
    }
  }
}
`;

export const getLayersQuery = gql`
  query Layer($filter: layer_translations_filter, $layerFilter2: layer_filter) {
    layer(filter: $layerFilter2) {
      id
      name
      translations(filter: $filter) {
        title
        abstract
      }
      workspace {
        name
      }
      wms_url
      wfs_url
    }
  }
`;

export const layersFilterOpj = (categoryId , lang) => ({
  filter: {
    languages_code: {
      code: {
        _eq: lang === "en" ? "en-US" : "ar-SA",
      },
    },
  },
  layerFilter2: {
    workspace: {
      id: {
        _eq: categoryId,
      },
    },
    status: {
      _eq: "published",
    },
  },
});
