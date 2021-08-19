import { useRef } from "react";

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

import {
	BREAK_LONG_DEFAULT,
	BREAK_SHORT_DEFAULT,
	CONFIG,
	EXTENSION_DEFAULT,
	WORK_DEFAULT,
} from "app/constants";
import { SettingsManager } from "app/settingsManager";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const SettingsModal: ChakraComponent<"div", Props> = ({ isOpen, onClose }) => {
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
				<ModalHeader fontSize={{ base: "lg", lg: "2xl" }}>Settings</ModalHeader>
				<ModalCloseButton ref={closeButtonRef} />
				<ModalBody>
					<Settings />
				</ModalBody>
				<ModalFooter>
					<HStack spacing={4}>
						<Button onClick={onClose}> OK</Button>
					</HStack>
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
				<HStack alignItems="center" width="100%" justifyContent="space-between">
					<Text>Work:</Text>
					<NumberInput
						value={
							Number(SettingsManager.get(CONFIG.WORK) || WORK_DEFAULT) / (1000 * 60)
						}
						min={1}
						max={60}
						onChange={(value) => {
							SettingsManager.set(CONFIG.WORK, (value * 1000 * 60).toString());
						}}
					/>
				</HStack>
				<HStack alignItems="center" width="100%" justifyContent="space-between">
					<Text>Extension:</Text>
					<NumberInput
						value={
							Number(SettingsManager.get(CONFIG.EXTENSION) || EXTENSION_DEFAULT) /
							(1000 * 60)
						}
						min={1}
						max={60}
						onChange={(value) => {
							SettingsManager.set(CONFIG.EXTENSION, (value * 1000 * 60).toString());
						}}
					/>
				</HStack>
				<HStack alignItems="center" width="100%" justifyContent="space-between">
					<Text>Short Break:</Text>
					<NumberInput
						value={
							Number(SettingsManager.get(CONFIG.BREAK_SHORT) || BREAK_SHORT_DEFAULT) /
							(1000 * 60)
						}
						min={1}
						max={60}
						onChange={(value) => {
							SettingsManager.set(CONFIG.BREAK_SHORT, (value * 1000 * 60).toString());
						}}
					/>
				</HStack>
				<HStack alignItems="center" width="100%" justifyContent="space-between">
					<Text>Long Break:</Text>
					<NumberInput
						value={
							Number(SettingsManager.get(CONFIG.BREAK_LONG) || BREAK_LONG_DEFAULT) /
							(1000 * 60)
						}
						min={1}
						max={60}
						onChange={(value) => {
							SettingsManager.set(CONFIG.BREAK_LONG, (value * 1000 * 60).toString());
						}}
					/>
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
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
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
