import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId/*" element={<Coin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
