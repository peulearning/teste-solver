import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"
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
  item: {
    id: number
    produtoId: number
    quantidade: number
    unidadeMedida: string
  }
}

const API_URL = "http://localhost:5220/api/carrinho"

function ListaCarrinho() {
  const [carrinhos, setCarrinhos] = useState<Carrinho[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCarrinhos = async () => {
      try {
        const response = await axios.get<Carrinho[]>(API_URL)
        setCarrinhos(response.data)
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar carrinhos:", err)
        setError("Erro ao carregar carrinhos. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchCarrinhos()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setCarrinhos(carrinhos.filter((carrinho) => carrinho.id !== id))
    } catch (err) {
      console.error("Erro ao deletar carrinho:", err)
      setError("Erro ao deletar carrinho. Por favor, tente novamente.")
    }
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

  if (error) {
    return (
      <Layout>
        <Alert severity="error">{error}</Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Lista de Carrinhos
      </Typography>
      <Button component={Link} to="/carrinhos/novo" variant="contained" color="primary" sx={{ mb: 2 }}>
        Novo Carrinho
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Identificador</TableCell>
              <TableCell>Quantidade de Itens</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carrinhos.map((carrinho) => (
              <TableRow key={carrinho.id}>
                <TableCell>{carrinho.id}</TableCell>
                <TableCell>{carrinho.identificador}</TableCell>
                <TableCell>{carrinho.itensCarrinho.length}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/carrinhos/atualizar/${carrinho.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(carrinho.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default ListaCarrinho

