const db = require("../database/db");

module.exports = {
  listar(req, res) {
    res.json(db.clientes);
  },

  buscarPorId(req, res) {
    const cliente = db.clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
    res.json(cliente);
  },

  criar(req, res) {
    const { nome, email, telefone } = req.body;

    const novoCliente = {
      id: db.clientes.length + 1,
      nome,
      email,
      telefone
    };

    db.clientes.push(novoCliente);
    res.status(201).json(novoCliente);
  },

  atualizar(req, res) {
    const cliente = db.clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });

    const { nome, email, telefone } = req.body;

    cliente.nome = nome || cliente.nome;
    cliente.email = email || cliente.email;
    cliente.telefone = telefone || cliente.telefone;

    res.json(cliente);
  },

  deletar(req, res) {
    const index = db.clientes.findIndex(c => c.id == req.params.id);
    if (index === -1) return res.status(404).json({ erro: "Cliente não encontrado" });

    db.clientes.splice(index, 1);
    res.json({ mensagem: "Cliente removido com sucesso" });
  }
};
