import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)]">
      <Navbar />
      <main className="min-h-[calc(100vh-12rem)] bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}