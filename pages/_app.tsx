
import { useEffect } from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { themeDark, themeLight } from "lib/theme";

export const MyApp = ({ Component, pageProps }) => {

	useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

	return (
		<ThemeProvider theme={false ? themeDark : themeLight}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
