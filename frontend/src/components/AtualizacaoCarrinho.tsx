import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import axios from "axios"

interface Carrinho {
  id: number
  identificador: string
  itensCarrinho: ItemCarrinho[]
}

interface ItemCarrinho {
  id: number
  itemId: number
  quantidade: number
}

interface Item {
  id: number
  produtoId: number
  quantidade: number
  unidadeMedida: string
}

const API_URL = "http://localhost:5220/api/carrinho"
const ITEMS_API_URL = "http://localhost:5220/api/item"

function AtualizacaoCarrinho() {
  const [carrinho, setCarrinho] = useState<Carrinho | null>(null)
  const [itens, setItens] = useState<Item[]>([])
  const [selectedItemId, setSelectedItemId] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carrinhoResponse, itensResponse] = await Promise.all([
          axios.get<Carrinho>(`${API_URL}/${id}`),
          axios.get<Item[]>(ITEMS_API_URL),
        ])
        setCarrinho(carrinhoResponse.data)
        setItens(itensResponse.data)
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError("Erro ao carregar dados. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!carrinho) return

    setLoading(true)
    setError(null)

    try {
      await axios.put(`${API_URL}/${id}`, carrinho)
      navigate("/carrinhos")
    } catch (err) {
      console.error("Erro ao atualizar carrinho:", err)
      setError("Erro ao atualizar carrinho. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = () => {
    if (!carrinho || !selectedItemId || !quantidade) return

    const newItem: ItemCarrinho = {
      id: 0, // O backend irá gerar o ID real
      itemId: Number(selectedItemId),
      quantidade: Number(quantidade),
    }

    setCarrinho({
      ...carrinho,
      itensCarrinho: [...carrinho.itensCarrinho, newItem],
    })

    setSelectedItemId("")
    setQuantidade("")
  }

  const handleRemoveItem = (index: number) => {
    if (!carrinho) return

    const newItensCarrinho = carrinho.itensCarrinho.filter((_, i) => i !== index)
    setCarrinho({ ...carrinho, itensCarrinho: newItensCarrinho })
  }

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error || !carrinho) {
    return (
      <Layout>
        <Alert severity="error">{error || "Carrinho não encontrado"}</Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box maxWidth={600} margin="auto">
        <Typography variant="h4" gutterBottom>
          Atualização de Carrinho
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Identificador"
            variant="outlined"
            fullWidth
            margin="normal"
            value={carrinho.identificador}
            onChange={(e) => setCarrinho({ ...carrinho, identificador: e.target.value })}
            required
          />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Itens no Carrinho
          </Typography>
          <List>
            {carrinho.itensCarrinho.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`Item ${item.itemId}`} secondary={`Quantidade: ${item.quantidade}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Adicionar Item
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value as string)}
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
          />
          <Button type="button" variant="outlined" color="primary" onClick={handleAddItem} sx={{ mt: 1, mb: 2 }}>
            Adicionar Item ao Carrinho
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Atualizar Carrinho"}
          </Button>
        </form>
      </Box>
    </Layout>
  )
}

export default AtualizacaoCarrinho

