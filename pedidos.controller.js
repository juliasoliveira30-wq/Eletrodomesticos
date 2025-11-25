const db = require("../database/db");

module.exports = {
  listar(req, res) {
    res.json(db.pedidos);
  },

  buscarPorId(req, res) {
    const pedido = db.pedidos.find(p => p.id == req.params.id);
    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
    res.json(pedido);
  },

  criar(req, res) {
    const { clienteId, itens } = req.body;
    // itens = [{ produtoId, quantidade }]

    const novoPedido = {
      id: db.pedidos.length + 1,
      clienteId,
      itens,
      data: new Date()
    };

    db.pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
  },

  atualizar(req, res) {
    const pedido = db.pedidos.find(p => p.id == req.params.id);
    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });

    const { clienteId, itens } = req.body;

    pedido.clienteId = clienteId || pedido.clienteId;
    pedido.itens = itens || pedido.itens;

    res.json(pedido);
  },

  deletar(req, res) {
    const index = db.pedidos.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ erro: "Pedido não encontrado" });

    db.pedidos.splice(index, 1);
    res.json({ mensagem: "Pedido removido com sucesso" });
  }
};
