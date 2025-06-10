import React from "react";
import Confetti from "react-confetti";
import { useNavigate, useSearchParams } from "react-router";

export function BabyGlinConfetti() {
	const [width, setWidth] = React.useState(100);
	const [height, setHeight] = React.useState(100);

	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const completedRef = React.useRef(false);

	React.useEffect(() => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	}, []);

	if (searchParams.get("confetti") !== "1") {
		return null;
	}

	return (
		<>
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={1000}
				onConfettiComplete={() => {
          if (completedRef.current) return

					navigate("/good-stuff", { replace: true });
					completedRef.current = true;
				}}
			/>

			<div className="absolute inset-0 flex justify-center items-center pointer-events-none">
				<div className="animate-zoom-in animate-duration-350">
					<div className="animate-[colorchange_2s_linear_infinite] text-4xl font-bold text-blue-500">
						hi my baby glin, you made it!
					</div>
				</div>
			</div>
		</>
	);
}
