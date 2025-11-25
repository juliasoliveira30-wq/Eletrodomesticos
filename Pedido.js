class Pedido {
  constructor(id, clienteId, itens) {
    this.id = id;
    this.clienteId = clienteId;
    this.itens = itens; // [{ produtoId, quantidade }]
    this.data = new Date();
  }
}

module.exports = Pedido;
