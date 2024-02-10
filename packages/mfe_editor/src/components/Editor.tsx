import React, { useState } from "react";

const Editor = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>I am the MFE csomponent</div>
			<div>Your click count : {count} </div>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
};

export default Editor;
