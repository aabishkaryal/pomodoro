import { Flex } from "@chakra-ui/react";
import { Header } from "components/header";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
	return (
		<Flex
			width="100%"
			minWidth="300px"
			flexDir="column"
			alignItems="center"
		>
			<Header />
		</Flex>
	);
};

export default Home;
