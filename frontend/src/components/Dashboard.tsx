import { Typography, Paper, Grid } from "@mui/material"
import { useProductContext } from "../contexts/ProductContext"

function Dashboard() {
  const { products } = useProductContext()

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Total de Produtos Cadastrados: {products.length}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Dashboard

