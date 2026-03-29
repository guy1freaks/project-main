import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import AboutPage from './pages/AboutPage'
import ChecklistPage from './pages/ChecklistPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import PackingCategoryPage from './pages/PackingCategoryPage'
import PazamPage from './pages/PazamPage'
import QuizPage from './pages/QuizPage'
import RoleUnitPage from './pages/RoleUnitPage'
import RolesIndexPage from './pages/RolesIndexPage'

function App() {
  return (
    <Routes>
      <Route
        element={
          <>
            <ScrollToTop />
            <Layout />
          </>
        }
      >
        <Route path="/" element={<RolesIndexPage />} />
        <Route path="/roles" element={<Navigate to="/" replace />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/pazam" element={<PazamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/pack/:categoryId" element={<PackingCategoryPage />} />
        <Route path="/roles/:unitId" element={<RoleUnitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
