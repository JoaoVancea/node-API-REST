// app.js
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).send("Ok");
})

const produtos = [
    {
        id: 1,
        descricao: "Produto 1",
        custo: 10,
        preco: 20
    },
    {
        id: 2,
        descricao: "Produto 2",
        custo: 15,
        preco: 25
    },
    {
        id: 3,
        descricao: "Produto 3",
        custo: 20,
        preco: 30
    }
]

// Função para encontrar um produto pelo id
function findProduto(id){
    return produtos.findIndex(produto => produto.id === Number(id));
}

// Rota para buscar todos os produtos
app.get("/produtos", (req,res) =>{
    res.status(200).json(produtos);
})

// Rota para buscar um produto específico pelo id
app.get("/produtos/:id", (req, res) => {
    const id = findProduto(req.params.id); 
    if (id !== -1) { 
        res.status(200).json(produtos[id]);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

// Rota para criar um novo produto
app.post("/produtos", (req,res) =>{
    const novoProduto = req.body;
    produtos.push(novoProduto);
    res.status(201).send("Produto cadastrado com sucesso");
});

// Rota para atualizar um produto existente pelo id
app.put("/produtos/:id", (req, res)=>{
    const id = findProduto(req.params.id);
    if (id !== -1) {
        produtos[id] = req.body;
        res.status(200).json(produtos[id]);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

// Rota para deletar um produto pelo id
app.delete("/produtos/:id", (req, res) => {
    const id = findProduto(req.params.id);
    if (id !== -1) {
        produtos.splice(id, 1);
        res.status(200).send("Produto removido com sucesso");
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

export default app;