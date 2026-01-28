import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PasteForm from "./components/PasteForm";
import ViewPaste from "./pages/ViewPaste";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header visible on all pages */}
          <Header />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<PasteForm />} />
            <Route path="/p/:id" element={<ViewPaste />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
