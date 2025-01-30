import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import Layout from "../components/Layout"
import axios from "axios"

function CadastroItem() {
  const [produtoId, setProdutoId] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [unidadeMedida, setUnidadeMedida] = useState("")
  const [produtos, setProdutos] = useState<{ id: number; name: string }[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Carregar a lista de produtos existentes
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5220/api/produto")
        setProdutos(response.data)
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      }
    }

    fetchProdutos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5220/api/item", {
        ProdutoId: Number.parseInt(produtoId),
        Quantidade: Number.parseInt(quantidade),
        UnidadeMedida: unidadeMedida,
      })

      if (response.status === 201) {
        navigate("/itens") // Redireciona para a lista de itens
      }
    } catch (error) {
      console.error("Erro ao cadastrar o item:", error)
    }
  }

  return (
    <Layout>
      <div>
        <Typography variant="h4" gutterBottom>
          Cadastro de Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="produto-select-label">Produto</InputLabel>
            <Select
              labelId="produto-select-label"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value as string)}
              required
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />

          <TextField
            label="Unidade de Medida"
            variant="outlined"
            fullWidth
            margin="normal"
            value={unidadeMedida}
            onChange={(e) => setUnidadeMedida(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Cadastrar Item
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default CadastroItem

