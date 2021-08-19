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
import Countdown, { CountdownRendererFn, CountdownRenderProps } from "react-countdown";

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

	const changeConfig = (config: CONFIG) => {
		return function () {
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

	const renderer: CountdownRendererFn = (props) => {
		return (
			<CountdownChild
				{...props}
				totalTime={totalTime}
				countDownSize={countdownSize}
				config={config}
			/>
		);
	};
	return (
		<VStack
			width={{ base: "90%", md: "75%", ml: "50%" }}
			boxShadow="lg"
			borderRadius="lg"
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
			<Countdown
				renderer={renderer}
				date={Date.now() + totalTime}
				autoStart={false}
				ref={countdownRef}
				onStop={() => {
					const time = Number(SettingsManager.get(config));
					if (time) {
						dispatch(setTotalTime(time));
					}
				}}
			/>
		</VStack>
	);
};

type CountdownChildProps = CountdownRenderProps & {
	countDownSize?: number;
	totalTime: number;
	config: CONFIG;
};

function CountdownChild({
	api,
	completed,
	formatted,
	hours,
	total,
	countDownSize = 200,
	totalTime,
	config,
}: CountdownChildProps) {
	const dispatch = useAppDispatch();
	let buttonControls = <></>;
	if (completed) {
		buttonControls = (
			<Button
				aria-label="Take a break"
				variant="ghost"
				onClick={() => dispatch(setConfig(CONFIG.BREAK_SHORT))}
			>
				Take a break
			</Button>
		);
	} else {
		buttonControls = (
			<HStack spacing={4}>
				<Button onClick={api.isStopped() ? api.start : api.stop}>
					{api.isStopped() ? "Start" : "Stop"}
				</Button>
				{!api.isStopped() && (
					<Button onClick={api.isPaused() ? api.start : api.pause}>
						{api.isPaused() ? "Resume" : "Pause"}
					</Button>
				)}
			</HStack>
		);
	}

	return (
		<>
			<CircularProgress size={countDownSize} thickness={4} value={(total / totalTime) * 100}>
				<CircularProgressLabel fontSize={hours > 0 ? ".17em" : undefined}>
					{hours > 0 ? formatted.hours + ":" : null}
					{formatted.minutes}:{formatted.seconds}
				</CircularProgressLabel>
			</CircularProgress>
			{buttonControls}
		</>
	);
}
