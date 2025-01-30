import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import Layout from "../components/Layout"
import axios from "axios"

function AtualizacaoItem() {
  const [produtoId, setProdutoId] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [unidadeMedida, setUnidadeMedida] = useState("")
  const [produtos, setProdutos] = useState<{ id: number; name: string }[]>([])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemResponse, produtosResponse] = await Promise.all([
          axios.get(`http://localhost:5220/api/item/${id}`),
          axios.get("http://localhost:5220/api/produto"),
        ])

        const item = itemResponse.data
        setProdutoId(item.produtoId.toString())
        setQuantidade(item.quantidade.toString())
        setUnidadeMedida(item.unidadeMedida)
        setProdutos(produtosResponse.data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:5220/api/item/${id}`, {
        ProdutoId: Number.parseInt(produtoId),
        Quantidade: Number.parseInt(quantidade),
        UnidadeMedida: unidadeMedida,
      })

      navigate("/itens")
    } catch (error) {
      console.error("Erro ao atualizar o item:", error)
    }
  }

  return (
    <Layout>
      <div>
        <Typography variant="h4" gutterBottom>
          Atualização de Item
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
            Atualizar Item
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default AtualizacaoItem

