import { useState, useEffect } from "react"
import { Typography, Grid, Paper, Box, CircularProgress, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import Layout from "./Layout"
import axios from "axios"

interface DashboardCounts {
  products: number
  items: number
  carts: number
}

function Dashboard() {
  const [counts, setCounts] = useState<DashboardCounts>({ products: 0, items: 0, carts: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsResponse, itemsResponse, cartsResponse] = await Promise.all([
          axios.get("http://localhost:5220/api/produto"),
          axios.get("http://localhost:5220/api/item"),
          axios.get("http://localhost:5220/api/carrinho"),
        ])

        setCounts({
          products: productsResponse.data.length,
          items: itemsResponse.data.length,
          carts: cartsResponse.data.length,
        })
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar contagens:", err)
        setError("Erro ao carregar dados. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

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
        <Typography color="error">{error}</Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
              <Typography variant="h6">Produtos</Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/cadastro")}
                  sx={{ mr: 1 }}
                >
                  Novo Produto
                </Button>
                <Button component={Link} to="/produtos" variant="contained" color="primary" sx={{ mr: 1 }}>
                  Listar Produto
                </Button>
              </Box>
            </Box>
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Total: {counts.products}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
              <Typography variant="h6">Itens</Typography>
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/itens/cadastro")}
                  sx={{ mr: 1 }}
                >
                  Novo Item
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/itens")} sx={{ mr: 1 }}>
                  Listar Itens
                </Button>
              </Box>
            </Box>
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Total: {counts.items}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
              <Typography variant="h6">Carrinhos</Typography>
              <Box>
                <Button variant="contained" color="warning" onClick={() => navigate("/carrinhos/novo")} sx={{ mr: 1 }}>
                  Novo Carrinho
                </Button>
                <Button variant="contained" color="warning" onClick={() => navigate("/carrinhos")} sx={{ mr: 1 }}>
                  Listar Carrinho
                </Button>
              </Box>
            </Box>
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Total: {counts.carts}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Dashboard

