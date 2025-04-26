import ReactDOM from "react-dom/client";

import axios from "axios";

const promise = axios.get("http://localhost:3001/notes");
console.log(promise);

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
