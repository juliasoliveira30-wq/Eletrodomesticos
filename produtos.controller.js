const supabase = require("../supabase");

module.exports = {
  async listar(req, res) {
    const { data, error } = await supabase.from("produtos").select("*");
    if (error) return res.status(400).json(error);
    res.json(data);
  },

  async criar(req, res) {
    const { nome, preco, estoque } = req.body;
    const { data, error } = await supabase.from("produtos").insert([{ nome, preco, estoque }]).select();
    if (error) return res.status(400).json(error);
    res.status(201).json(data[0]);
  },
};
