import {
	Button,
	ChakraComponent,
	Heading,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useNumberInput,
	VStack,
} from "@chakra-ui/react";

import { useRef } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const SettingsModal: ChakraComponent<"div", Props> = ({
	isOpen,
	onClose,
}) => {
	const closeButtonRef = useRef(null);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			initialFocusRef={closeButtonRef}
			scrollBehavior="inside"
			motionPreset="slideInBottom"
			isCentered
			preserveScrollBarGap
			returnFocusOnClose
		>
			<ModalOverlay />
			<ModalContent marginX={{ base: 4, md: 8 }}>
				<ModalHeader fontSize={{ base: "lg", lg: "2xl" }}>
					Settings
				</ModalHeader>
				<ModalCloseButton ref={closeButtonRef} />
				<ModalBody>
					<Settings />
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}> OK</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

function Settings() {
	return (
		<>
			<Heading as="h3" fontSize={{ base: "sm", lg: "lg" }}>
				Time(minutes):
			</Heading>
			<VStack marginY={4} paddingLeft={8}>
				<HStack
					alignItems="center"
					width="100%"
					justifyContent="space-between"
				>
					<Text>Work:</Text>
					<NumberInput min={0} max={60} onChange={(value) => {}} />
				</HStack>
				<HStack
					alignItems="center"
					width="100%"
					justifyContent="space-between"
				>
					<Text>Extension:</Text>
					<NumberInput min={0} max={60} onChange={(value) => {}} />
				</HStack>
				<HStack
					alignItems="center"
					width="100%"
					justifyContent="space-between"
				>
					<Text>Short Break:</Text>
					<NumberInput min={0} max={60} onChange={(value) => {}} />
				</HStack>
				<HStack
					alignItems="center"
					width="100%"
					justifyContent="space-between"
				>
					<Text>Long Break:</Text>
					<NumberInput min={0} max={60} onChange={(value) => {}} />
				</HStack>
			</VStack>
		</>
	);
}

type NumberInputProps = {
	value?: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
};

function NumberInput({ max, min, onChange, value = 10 }: NumberInputProps) {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			min: min,
			max: max,
			defaultValue: value,
			onChange: (_, number) => onChange(number),
		});
	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<HStack>
			<Button {...inc} variant="ghost">
				+
			</Button>
			<Input {...input} width="75px" />
			<Button {...dec} variant="ghost">
				-
			</Button>
		</HStack>
	);
}
