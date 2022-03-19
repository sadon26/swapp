import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/movies" />} />
                <Route path="/movies" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
