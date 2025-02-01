import type React from "react"
import { Typography, Box, Drawer, List as MuiList, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import {
  Inventory as ProductIcon,
  ShoppingCart as CartIcon,
  List as ItemIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useNavigate, useLocation } from "react-router-dom"

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#f8f7fa",
  },
})

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { text: "Produtos", icon: ProductIcon, path: "/" },
    { text: "Itens", icon: ItemIcon, path: "/itens" },
    { text: "Carrinho", icon: CartIcon, path: "/carrinhos" },
    { text: "Configurações", icon: SettingsIcon, path: "/configuracoes" },
  ]

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <ProductIcon sx={{ fontSize: 32, color: "#150f1f" }} />
            <Typography variant="h6" sx={{ ml: 1, color: "#0b0712" }}>
              MarketPlace
            </Typography>
          </Box>
          <MuiList>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                selected={location.pathname.startsWith(item.path)}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>
                  <item.icon sx={{ color: location.pathname.startsWith(item.path) ? "#030206" : "inherit" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: location.pathname.startsWith(item.path) ? "#000000" : "inherit" }}
                />
              </ListItemButton>
            ))}
          </MuiList>
        </Box>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout

