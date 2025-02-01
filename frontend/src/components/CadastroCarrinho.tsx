import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import axios from "axios"

interface Item {
  id: number
  produtoId: number
  quantidade: number
  unidadeMedida: string
}

const API_URL = "http://localhost:5220/api/carrinho"
const ITEMS_API_URL = "http://localhost:5220/api/item"

function CadastroCarrinho() {
  const [identificador, setIdentificador] = useState("")
  const [itens, setItens] = useState<Item[]>([])
  const [selectedItemId, setSelectedItemId] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await axios.get<Item[]>(ITEMS_API_URL)
        setItens(response.data)
      } catch (err) {
        console.error("Erro ao carregar itens:", err)
        setError("Erro ao carregar itens. Por favor, tente novamente.")
      }
    }

    fetchItens()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.post(API_URL, {
        identificador,
        itensCarrinho: [
          {
            itemId: Number(selectedItemId),
            quantidade: Number(quantidade),
          },
        ],
      })
      navigate("/carrinhos")
    } catch (err) {
      console.error("Erro ao criar carrinho:", err)
      setError("Erro ao criar carrinho. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Box maxWidth={600} margin="auto">
        <Typography variant="h4" gutterBottom>
          Cadastro de Carrinho
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Identificador"
            variant="outlined"
            fullWidth
            margin="normal"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value as string)}
              required
            >
              {itens.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  Item {item.id} - Produto {item.produtoId}
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
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : "Cadastrar Carrinho"}
          </Button>
        </form>
      </Box>
    </Layout>
  )
}

export default CadastroCarrinho

