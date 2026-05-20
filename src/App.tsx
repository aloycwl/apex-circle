import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Apply from "./pages/apply";
import Enquire from "./pages/enquire";
import Events from "./pages/events";
import ThankYou from "./pages/thank-you";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/enquire" element={<Enquire />} />
        <Route path="/events" element={<Events />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
