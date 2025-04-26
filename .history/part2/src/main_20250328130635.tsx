import ReactDOM from "react-dom/client";

import axios from "axios";

axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  console.log(notes);
});
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
