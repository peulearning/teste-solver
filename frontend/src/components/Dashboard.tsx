import { useState } from "react"
import {
  Typography,
  Box,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Drawer,
  List as MuiList,
  ListItemButton,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as ProductIcon,
  ShoppingCart as CartIcon,
  List as ItemIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { useProductContext } from "../contexts/ProductContext"

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#f8f7fa",
  },
})

const StyledListItem = styled(ListItem)({
  backgroundColor: "#ffffff",
  marginBottom: "8px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
})

const CategoryLabel = styled(Box)({
  backgroundColor: "#ffe4e4",
  color: "#666",
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  display: "inline-flex",
  alignItems: "center",
  marginLeft: "8px",
})

function Dashboard() {
  const { products, deleteProduct } = useProductContext()
  const navigate = useNavigate()
  // eslint-disable-next-line no-empty-pattern
  const [] = useState("all")

  const handleEdit = (id: number) => {
    navigate(`/atualizar/${id}`)
  }

  const handleDelete = (id: number) => {
    deleteProduct(id)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <ProductIcon sx={{ fontSize: 32, color: "#7c3aed" }} />
            <Typography variant="h6" sx={{ ml: 1, color: "#7c3aed" }}>
              MarketPlace
            </Typography>
          </Box>
          <MuiList>
            <ListItemButton selected onClick={() => navigate("/produtos")}>
              <ListItemIcon>
                <ProductIcon sx={{ color: "#7c3aed" }} />
              </ListItemIcon>
              <ListItemText primary="Produtos" sx={{ color: "#7c3aed" }} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/itens")}>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary="Itens" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/carrinho")}>
              <ListItemIcon>
                <CartIcon />
              </ListItemIcon>
              <ListItemText primary="Carrinho" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/configuracoes")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItemButton>
          </MuiList>
        </Box>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#4a4a4a" }}>
          Gerenciamento de Produtos
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
          <Typography variant="h6">Produtos</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={() => navigate("/cadastro")} sx={{ mr: 1 }}>
              Novo Produto
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate("/produtos")} sx={{ mr: 1 }}>
              Listar Produto
            </Button>
          </Box>
        </Box>

        <List>
          {products.map((product) => (
            <StyledListItem key={product.id}>
              <ListItemText
                primary={
                  <Box component="span">
                    {product.name}
                    <CategoryLabel>R$ {product.price}</CategoryLabel>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" size="small" onClick={() => handleEdit(product.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton edge="end" aria-label="delete" size="small" onClick={() => handleDelete(product.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Dashboard

