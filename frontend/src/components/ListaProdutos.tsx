import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5220/api/produto"; // URL da sua API

function ListaProdutos() {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const [searchTerm, setSearchTerm] = useState(""); // Estado de busca por nome
  const [searchId, setSearchId] = useState(""); // Estado de busca por ID
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data); // Atualiza os produtos com os dados da API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao carregar produtos"); // Exibe um erro se algo falhar
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função para buscar um produto por ID
  const fetchProductById = async () => {
    if (!searchId) {
      fetchProducts(); // Se o campo de ID estiver vazio, busca todos os produtos
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/${searchId}`);
      setProducts([response.data]); // Atualiza a lista com apenas o produto retornado
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Produto não encontrado ou erro na busca por ID");
    }
  };

  useEffect(() => {
    fetchProducts(); // Busca todos os produtos ao montar o componente
  }, []);

  // Filtragem por nome
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Typography>Carregando...</Typography>; // Exibe carregamento
  if (error) return <Typography color="error">{error}</Typography>; // Exibe erro

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Produtos
      </Typography>
      <TextField
        label="Buscar por nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TextField
        label="Buscar por ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") fetchProductById(); // Busca por ID ao pressionar Enter
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchProductById}
        style={{ marginBottom: "16px" }}
      >
        Buscar por ID
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/atualizar/${product.id}`} variant="contained" color="primary">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListaProdutos;
