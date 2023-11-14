import "./App.css";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import theme from "./utils/theme";
import Home from "./Pages/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import "./utils/i18n";


const client = new ApolloClient({
  uri: "https://catalog.tabaqat.net/graphql",
  cache: new InMemoryCache(),
});

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrTheme = createTheme({ direction: "ltr", ...theme });
const rtlTheme = createTheme({ direction: "rtl", ...theme });

export default function App() {
  const { i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    if (i18n.language === "ar") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
    document.dir = i18n.dir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
          <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
           <Home />
          </ThemeProvider>
        </CacheProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}
