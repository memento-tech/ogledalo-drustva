import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./themes/DefaultTheme";
import { Route, Routes, HashRouter } from "react-router";
import HomePage from "./pages/HomePage";
import "./index.css";
import ProjectsPage from "./pages/ProjectsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import DocumentPage from "./pages/DocumentPage";
import ErrorPage from "./pages/ErrorPage";
import PopupProvider from "./popup/PopupContext";
import AdminNewsEditorPage from "./pages/admin/AdminNewsEditorPage";
import AdminNewsListPage from "./pages/admin/AdminNewsListPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HashRouter>
        <PopupProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<DocumentPage />} />
            <Route path="/admin" element={<AdminNewsEditorPage />} />
            <Route path="/admin/news" element={<AdminNewsListPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </PopupProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
