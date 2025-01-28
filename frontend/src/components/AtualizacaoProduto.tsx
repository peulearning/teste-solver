import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import Layout from "../components/Layout"; // Importação padrão

function AtualizacaoProduto() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o produto por ID
    if (id) {
      fetch(`http://localhost:5220/api/produto/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar produto.");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.name) {
            setName(data.name);
          } else {
            throw new Error("Produto não encontrado.");
          }
        })
        .catch((error) => console.error("Erro:", error));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("O nome do produto não pode estar vazio.");
      return;
    }

    // Construção do payload
    const updatePayload = {
      id: Number(id), // ID incluído no payload
      name,
    };

    // Envia a requisição para atualizar o produto
    fetch(`http://localhost:5220/api/produto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar o produto.");
        }
        return response.json();
      })
      .then(() => {
        alert("Produto atualizado com sucesso!");
        navigate("/produtos");
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Você alterou o nome do Produto com Sucesso !.");
      });
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Atualização de Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID do Produto"
          variant="outlined"
          fullWidth
          margin="normal"
          value={id}
          InputProps={{
            readOnly: true, // Torna o campo somente leitura
          }}
        />
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
          Atualizar
        </Button>
      </form>
    </Layout>
  );
}

export default AtualizacaoProduto;