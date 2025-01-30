import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"
import axios from "axios"

const API_URL = "http://localhost:5220/api/item"

interface Item {
  id: number
  produtoId: number
  quantidade: number
  unidadeMedida: string
}

function ListaItens() {
  const [items, setItems] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line no-empty-pattern
  const [] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<Item[]>(API_URL)
      setItems(response.data)
    } catch (err) {
      console.error("Erro ao carregar itens:", err)
      setError("Erro ao carregar itens. Por favor, tente novamente.")
      setItems([])
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    fetchItems()
  }, []) //Fixed: Added empty dependency array to useEffect

  const filteredItems = items.filter((item) => item.produtoId.toString().includes(searchTerm))

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Lista de Itens
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Buscar por ID do Produto"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <TextField
          label="Buscar por ID do Item"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") fetchItemById()
          }}
        /> */}
        <Button variant="contained" color="primary" onClick={fetchItems} sx={{ mt: 1 }}>
          Buscar por ID do Produto
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID do Item</TableCell>
                <TableCell>ID do Produto</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Unidade de Medida</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.produtoId}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{item.unidadeMedida}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/itens/atualizar/${item.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && !error && filteredItems.length === 0 && <Alert severity="info">Nenhum item encontrado.</Alert>}
    </Layout>
  )
}

export default ListaItens

