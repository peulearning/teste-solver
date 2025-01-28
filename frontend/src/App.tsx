import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material"
import Dashboard from "./components/Dashboard"
import ListaProdutos from "./components/ListaProdutos"
import CadastroProduto from "./components/CadastroProduto"
import AtualizacaoProduto from "./components/AtualizacaoProduto"

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MarketPlace 🛒
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/produtos">
            Produtos
          </Button>
          <Button color="inherit" component={Link} to="/cadastro">
            Novo Produto
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
          <Route path="/atualizar/:id" element={<AtualizacaoProduto />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App

