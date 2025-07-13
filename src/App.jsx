import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./themes/DefaultTheme";
import HomePage from "./pages/HomePage";
import "./index.css";
import ProjectsPage from "./pages/ProjectsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import DocumentViewPage from "./pages/DocumentViewPage";
import ErrorPage from "./pages/ErrorPage";
import PopupProvider from "./popup/PopupContext";
import AdminDocumentEditorPage from "./pages/admin/AdminDocumentEditorPage";
import AdminDocumentListPage from "./pages/admin/AdminDocumentListPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminPageTemplate from "./pages/admin/AdminPageTemplate";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useEffect, useState } from "react";
import { checkHealth } from "./adapters/HealthAdapter";
import MaintenancePage from "./pages/MaintenancePage";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

function App() {
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [checking, setChecking] = useState(true);

  // This example assumes you have an endpoint /api/health
  useEffect(() => {
    logEvent(analytics, "page_view", {
      firebase_screen: "HomePage",
    });

    checkHealth().then((result) => {
      setBackendAvailable(result);
      setChecking(false);
    });
  }, []);

  const withAdminTemplate = (pageComponent) => {
    return <AdminPageTemplate>{pageComponent}</AdminPageTemplate>;
  };

  if (checking) {
    return <LoadingOverlay />;
  }

  if (!backendAvailable) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <PopupProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<DocumentViewPage />} />
            <Route path="/project" element={<DocumentViewPage />} />
            <Route
              path="/admin"
              element={withAdminTemplate(<AdminDocumentEditorPage />)}
            />
            <Route
              path="/admin/documents"
              element={withAdminTemplate(<AdminDocumentListPage />)}
            />
            <Route
              path="/admin/settings"
              element={withAdminTemplate(<AdminSettingsPage />)}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PopupProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
