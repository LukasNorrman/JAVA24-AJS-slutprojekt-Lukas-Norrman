import { App } from "./components/app";
const { createRoot } = require("react-dom/client");

const root = createRoot(document.querySelector('#root'));
root.render(<App/>);