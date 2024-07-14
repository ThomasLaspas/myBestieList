import { ThemeProvider } from "./components/theme-provider"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>


)
