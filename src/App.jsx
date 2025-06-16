import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./themes/DefaultTheme";
import { Route, Routes, HashRouter } from "react-router";
import HomePage from "./pages/HomePage";
import PageTemplate from "./pages/PageTemplate";
import "./index.css";
import ProjectsPage from "./pages/ProjectsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";

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
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </PageTemplate>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
