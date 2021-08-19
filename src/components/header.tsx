import {
	ChakraComponent,
	Heading,
	HStack,
	IconButton,
	Link,
	Icon,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

import { ICON_SIZE } from "app/constants";
import { SettingsModal } from "components/settingsModal";

export const Header: ChakraComponent<"div", {}> = () => {
	const { toggleColorMode } = useColorMode();
	const { onClose, onOpen, isOpen } = useDisclosure();
	const buttonSize = useBreakpointValue({ base: "md", sm: "lg" });
	return (
		<HStack
			justifyContent="space-between"
			width="100%"
			paddingX={{ base: 4, md: 8 }}
			paddingY={{ base: 4 }}
			boxShadow="md"
		>
			<Heading as="h1" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
				Pomodoro
			</Heading>
			<HStack spacing={{ base: 2, md: 6 }}>
				<IconButton
					aria-label="Settings"
					size={buttonSize}
					backgroundColor="transparent"
					icon={<SettingsIcon boxSize={ICON_SIZE} />}
					onClick={onOpen}
				/>
				<SettingsModal isOpen={isOpen} onClose={onClose} />
				<IconButton
					aria-label="Switch between dark and light mode"
					size={buttonSize}
					backgroundColor="transparent"
					icon={useColorModeValue(
						<MoonIcon boxSize={ICON_SIZE} />,
						<SunIcon boxSize={ICON_SIZE} />
					)}
					onClick={toggleColorMode}
				/>
				<IconButton
					aria-label="Link to Github repository."
					size={buttonSize}
					backgroundColor="transparent"
					icon={<Icon as={FaGithub} boxSize={ICON_SIZE} />}
					as={Link}
					href="https://github.com/aabishkaryal/pomodoro"
					isExternal
				/>
			</HStack>
		</HStack>
	);
};
