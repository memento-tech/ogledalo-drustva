import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./themes/DefaultTheme";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PageTemplate from "./pages/PageTemplate";
import "./index.css";
import ProjectsPage from "./pages/ProjectsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HashRouter>
        <PageTemplate>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </PageTemplate>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
