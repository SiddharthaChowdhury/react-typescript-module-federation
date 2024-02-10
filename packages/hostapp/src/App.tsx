import React from "react";

const EditorAppComponent: React.LazyExoticComponent<React.ComponentType<{}>> =
	React.lazy(() => import("editor_MFE/Editor"));

const App = () => {
	return (
		<div>
			<h1>Hi I am container:</h1>
			<EditorAppComponent />
		</div>
	);
};

export default App;
