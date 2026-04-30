import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import TeamWorkspace from "./pages/TeamWorkspace";

import CariTim from "./pages/CariTim";
import TimSaya from "./pages/TimSaya";
import Pesan from "./pages/Pesan";
import Notifikasi from "./pages/Notifikasi";
import Profil from "./pages/Profil";
import Pengaturan from "./pages/Pengaturan";
import CreateTeam from "./pages/CreateTeam";

function App() {
  return (
    <Routes>

      {/* main pages */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/team/:id"
        element={
          <MainLayout>
            <TeamWorkspace />
          </MainLayout>
        }
      />

      {/* sidebar pages */}
      <Route
        path="/cari"
        element={
          <MainLayout>
            <CariTim />
          </MainLayout>
        }
      />

      <Route
        path="/tim"
        element={
          <MainLayout>
            <TimSaya />
          </MainLayout>
        }
      />

      <Route
        path="/pesan"
        element={
          <MainLayout>
            <Pesan />
          </MainLayout>
        }
      />

      <Route
        path="/notifikasi"
        element={
          <MainLayout>
            <Notifikasi />
          </MainLayout>
        }
      />

      <Route
        path="/profil"
        element={
          <MainLayout>
            <Profil />
          </MainLayout>
        }
      />

      <Route
        path="/pengaturan"
        element={
          <MainLayout>
            <Pengaturan />
          </MainLayout>
        }
      />

      <Route
        path="/create-team"
        element={
          <MainLayout>
            <CreateTeam />
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default App;
