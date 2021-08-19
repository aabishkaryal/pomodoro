import React from "react";

import {
	ChakraComponent,
	VStack,
	Button,
	CircularProgress,
	CircularProgressLabel,
	HStack,
	ButtonGroup,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import Countdown, { CountdownRendererFn, CountdownRenderProps } from "react-countdown";

import { useAppDispatch, useAppSelector } from "app/store";
import { SettingsManager } from "app/settingsManager";
import { CONFIG, CURRENT_CONFIG, DEFAULT } from "app/constants";
import { setConfig, setTotalTime } from "app/timer";

type Props = {};

export const Timer: ChakraComponent<"div", Props> = () => {
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
			(() => {
				const workTime = SettingsManager.get(CONFIG.WORK);
				const breakTime = SettingsManager.get(CONFIG.BREAK);
				if (!workTime) {
					SettingsManager.set(CONFIG.WORK, DEFAULT[CONFIG.WORK].toString());
				}
				if (!breakTime) {
					SettingsManager.set(CONFIG.BREAK, DEFAULT[CONFIG.BREAK].toString());
				}
			})();

			const currentConfig = SettingsManager.get(CURRENT_CONFIG);
			if (
				currentConfig &&
				currentConfig != config &&
				Object.values(CONFIG).includes("work" as CONFIG)
			) {
				dispatch(setConfig(currentConfig as CONFIG));
			} else {
				SettingsManager.set(CURRENT_CONFIG, config);
			}

			const time = Number(SettingsManager.get(config));
			if (time) {
				dispatch(setTotalTime(time));
			} else {
				SettingsManager.set(config, totalTime.toString());
			}
		}
		setup();
		return SettingsManager.subscribe(config, (time) => {
			if (time && countdownRef.current && !countdownRef.current.getApi().isStarted()) {
				dispatch(setTotalTime(Number(time)));
			}
		});
	}, [config, dispatch, totalTime]);

	const renderer: CountdownRendererFn = (props) => {
		return <CountdownChild {...props} totalTime={totalTime} config={config} />;
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
						variant={config == CONFIG.BREAK ? "solid" : "ghost"}
						onClick={changeConfig(CONFIG.BREAK)}
					>
						Break
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
	totalTime: number;
	config: CONFIG;
};

function CountdownChild({
	api,
	completed,
	formatted,
	hours,
	total,
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
				onClick={() => {
					if (config == CONFIG.WORK) {
						SettingsManager.set(CURRENT_CONFIG, CONFIG.BREAK);
						dispatch(setConfig(CONFIG.BREAK));
					} else if (config == CONFIG.BREAK) {
						SettingsManager.set(CURRENT_CONFIG, CONFIG.WORK);
						dispatch(setConfig(CONFIG.WORK));
					}
				}}
			>
				{config == CONFIG.WORK ? "Take a break" : "Back to Work"}
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
			<CircularProgress size={250} thickness={4} value={(total / totalTime) * 100}>
				<CircularProgressLabel fontSize={hours > 0 ? ".17em" : undefined}>
					{hours > 0 ? formatted.hours + ":" : null}
					{formatted.minutes}:{formatted.seconds}
				</CircularProgressLabel>
			</CircularProgress>
			{buttonControls}
		</>
	);
}
