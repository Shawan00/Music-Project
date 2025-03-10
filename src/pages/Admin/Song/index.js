import { useEffect } from "react";

function Song() {
	useEffect(() => {
		document.title = "Manage song | Music project";
	}, []);

	return (
		<>
			Song
		</>
	);
}

export default Song