import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";

import theme from "app/theme";
import { store } from "app/store";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<ColorModeScript
						initialColorMode={theme.config.initialColorMode}
					/>
					<Component {...pageProps} />
				</ChakraProvider>
			</Provider>
		</React.StrictMode>
	);
}
export default MyApp;
