import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Box } from "@mui/material"
import Dashboard from "./components/Dashboard"
import ListaProdutos from "./components/ListaProdutos"
import CadastroProduto from "./components/CadastroProduto"
import AtualizacaoProduto from "./components/AtualizacaoProduto"
import CadastroItem from "./components/CadastroItem"
import ListaItens from "./components/ListaItens"
import AtualizacaoItem from "./components/AtualizacaoItem"
import CadastroCarrinho from "./components/CadastroCarrinho"
import ListaCarrinho from "./components/ListaCarrinho"

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
          <Route path="/atualizar/:id" element={<AtualizacaoProduto />} />
          <Route path="/itens/cadastro" element={<CadastroItem />} />
          <Route path="/itens" element={<ListaItens />} />
          <Route path="/itens/atualizar/:id" element={<AtualizacaoItem />} />
          <Route path="/carrinhos/novo" element={<CadastroCarrinho />} />
          <Route path="/carrinhos" element={<ListaCarrinho />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App

