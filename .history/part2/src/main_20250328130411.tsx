import ReactDOM from "react-dom/client";

import axios from "axios";

const promise = axios.get("http://localhost:3001/notes");

promise.then((response) => {
  console.log(response);
});
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
