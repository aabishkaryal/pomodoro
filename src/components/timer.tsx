import React from "react";

import {
	ChakraComponent,
	useBreakpointValue,
	VStack,
	Button,
	CircularProgress,
	CircularProgressLabel,
	HStack,
	ButtonGroup,
} from "@chakra-ui/react";
import Countdown, { CountdownRendererFn } from "react-countdown";

import { useAppDispatch, useAppSelector } from "app/store";
import { useEffect } from "react";
import { SettingsManager } from "app/settingsManager";
import { CONFIG, CURRENT_CONFIG } from "app/constants";
import { setConfig, setTotalTime } from "app/timer";
import { useRef } from "react";

type Props = {};

export const Timer: ChakraComponent<"div", Props> = () => {
	const countdownSize = useBreakpointValue<number>({ base: 200, sm: 300 });
	const countdownRef = useRef<Countdown>(null);

	const { config, totalTime } = useAppSelector((state) => state.timerState);
	const dispatch = useAppDispatch();

	const syncTime = () => {
		const time = Number(SettingsManager.get(config));
		if (time) {
			dispatch(setTotalTime(time));
		}
	};

	const changeConfig = (config: CONFIG) => {
		return async function () {
			if (countdownRef.current) countdownRef.current.getApi().stop();
			SettingsManager.set(CURRENT_CONFIG, config);
			dispatch(setConfig(config));
		};
	};

	useEffect(() => {
		async function setup() {
			const currentConfig = SettingsManager.get(CURRENT_CONFIG);
			if (
				currentConfig &&
				currentConfig != config &&
				Object.values(CONFIG).includes("work" as CONFIG)
			) {
				dispatch(setConfig(currentConfig as CONFIG));
			}
			const time = Number(SettingsManager.get(config));
			if (time) {
				dispatch(setTotalTime(time));
			}
		}
		setup();
		return SettingsManager.subscribe(config, (time) => {
			if (time && countdownRef.current && !countdownRef.current.getApi().isStarted()) {
				dispatch(setTotalTime(Number(time)));
			}
		});
	}, [config, dispatch]);

	const renderer: CountdownRendererFn = ({ api, hours, total, formatted, completed }) => {
		return (
			<>
				<CircularProgress
					size={countdownSize}
					thickness={4}
					value={(total / totalTime) * 100}
				>
					<CircularProgressLabel fontSize={hours > 0 ? ".17em" : undefined}>
						{hours > 0 ? formatted.hours + ":" : null}
						{formatted.minutes}:{formatted.seconds}
					</CircularProgressLabel>
				</CircularProgress>
				{completed ? (
					<Button
						aria-label="Take a break"
						variant="ghost"
						onClick={() => dispatch(setConfig(CONFIG.BREAK_SHORT))}
					>
						Take a break
					</Button>
				) : (
					<HStack spacing={4}>
						<ButtonGroup variant="ghost">
							<Button
								onClick={api.isStarted() || api.isPaused() ? api.stop : api.start}
							>
								{api.isStarted() || api.isPaused() ? "Stop" : "Start"}
							</Button>
							{api.isStopped() ? null : (
								<Button onClick={api.isPaused() ? api.start : api.pause}>
									{api.isPaused() ? "Resume" : "Pause"}
								</Button>
							)}
						</ButtonGroup>
					</HStack>
				)}
			</>
		);
	};
	return (
		<VStack
			width={{ base: "90%", md: "75%", ml: "50%" }}
			boxShadow="md"
			borderRadius="md"
			padding={4}
			marginTop={12}
		>
			<ButtonGroup colorScheme="blue">
				<HStack spacing={4}>
					<Button
						variant={config == CONFIG.WORK ? "solid" : "ghost"}
						onClick={changeConfig(CONFIG.WORK)}
					>
						Work
					</Button>
					<Button
						variant={config == CONFIG.BREAK_SHORT ? "solid" : "ghost"}
						onClick={changeConfig(CONFIG.BREAK_SHORT)}
					>
						Short Break
					</Button>
					<Button
						variant={config == CONFIG.BREAK_LONG ? "solid" : "ghost"}
						onClick={changeConfig(CONFIG.BREAK_LONG)}
					>
						Long Break
					</Button>
				</HStack>
			</ButtonGroup>
			<VStack justifyContent="center" spacing={4}>
				<Countdown
					renderer={renderer}
					date={Date.now() + totalTime}
					autoStart={false}
					ref={countdownRef}
					onStop={syncTime}
				/>
			</VStack>
		</VStack>
	);
};
