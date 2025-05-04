import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Quiz da Saúde do Seu Filho",
  description: "Descubra o que pode estar prejudicando a saúde do seu filho e como resolver",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
