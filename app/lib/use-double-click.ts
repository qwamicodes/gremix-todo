import React from "react";

const useDoubleClick = (
	onClick: () => void,
	onDbClick: () => void,
	delay = 200,
) => {
	const timePassed = React.useRef(0);
	return (e: React.MouseEvent) => {
		if (e.detail === 1) {
			setTimeout(() => {
				if (Date.now() - timePassed.current >= delay) {
					onClick();
				}
			}, delay);
		}

		if (e.detail === 2) {
			timePassed.current = Date.now();
			onDbClick();
		}
	};
};

export { useDoubleClick };
