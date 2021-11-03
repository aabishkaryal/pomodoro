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
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { GoSettings } from "react-icons/go";

import { SettingsModal } from "components/settingsModal";

// Header of the website
export const Header: ChakraComponent<"div", {}> = () => {
    const { toggleColorMode } = useColorMode();
    const { onClose, onOpen, isOpen } = useDisclosure();

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
            <HStack spacing={{ base: 1, md: 3 }}>
                <IconButton
                    aria-label="Settings"
                    size="md"
                    backgroundColor="transparent"
                    icon={<Icon as={GoSettings} />}
                    onClick={onOpen}
                    isRound
                />
                <SettingsModal isOpen={isOpen} onClose={onClose} />
                <IconButton
                    aria-label="Switch between dark and light mode"
                    size="md"
                    backgroundColor="transparent"
                    icon={useColorModeValue(
                        <Icon as={FaMoon} />,
                        <Icon as={FaSun} />
                    )}
                    onClick={toggleColorMode}
                    isRound
                />
                <IconButton
                    aria-label="Link to Github repository."
                    size="md"
                    backgroundColor="transparent"
                    icon={<Icon as={FaGithub} />}
                    as={Link}
                    href="https://github.com/aabishkaryal/pomodoro"
                    isExternal
                    isRound
                />
            </HStack>
        </HStack>
    );
};
