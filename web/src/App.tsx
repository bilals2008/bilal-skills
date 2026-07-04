import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import { HomePage } from "@/pages/home"
import { SkillDetailPage } from "@/pages/skill-detail"
import { AuthorPage } from "@/pages/author"
import { NotFoundPage } from "@/pages/not-found"
import { AboutPage } from "@/pages/about"
import { ContributingPage } from "@/pages/contributing"
import { ChangelogPage } from "@/pages/changelog"

import { FAQPage } from "@/pages/faq"

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex min-h-svh flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/skills/:slug" element={<SkillDetailPage />} />
                <Route path="/author/:author" element={<AuthorPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contributing" element={<ContributingPage />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
