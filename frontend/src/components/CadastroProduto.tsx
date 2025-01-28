import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, TextField, Button } from "@mui/material"
import axios from "axios" // Importando axios

function CadastroProduto() {
  const [name, setName] = useState("") // Mantendo apenas o campo 'name'
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Enviando os dados do produto para o backend via POST
      const response = await axios.post("http://localhost:5220/api/produto", {
        name // Apenas 'name', o 'id' será gerado no backend
      })

      // Se o produto for cadastrado com sucesso, redireciona para a lista de produtos
      if (response.status === 201) {
        navigate("/") // Ou para a página que deseja
      }
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error)
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cadastro de Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </div>
  )
}

export default CadastroProduto
