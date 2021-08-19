import { Flex } from "@chakra-ui/react";
import { Header } from "components/header";
import { Timer } from "components/timer";
import type { NextPage } from "next";
import React from "react";

import Head from "next/head";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="Pomodoro timer website for better time management."
				/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

				<link rel="manifest" href="/manifest.json" />
				<title>Pomodoro</title>
			</Head>
			<Flex width="100%" minWidth="300px" flexDir="column" alignItems="center">
				<Header />
				<Timer />
			</Flex>
		</>
	);
};

export default Home;
