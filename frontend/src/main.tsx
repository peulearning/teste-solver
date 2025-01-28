import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import App from "./App"
import { ProductProvider } from "./contexts/ProductContext"

const theme = createTheme()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductProvider>
        <App />
      </ProductProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

