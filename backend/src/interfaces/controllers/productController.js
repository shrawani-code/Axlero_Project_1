export function makeProductController(productService) {
  return {
    list: async (req, res) => {
      try { res.json(await productService.list(req.query)); }
      catch (e) { res.status(500).json({ message: e.message }); }
    },
    create: async (req, res) => {
      try { res.status(201).json(await productService.create(req.body, req.user.id)); }
      catch (e) { res.status(400).json({ message: e.message }); }
    },
    update: async (req, res) => {
      try { res.json(await productService.update(req.params.id, req.body, req.user)); }
      catch (e) { res.status(400).json({ message: e.message }); }
    },
    remove: async (req, res) => {
      try { res.json(await productService.remove(req.params.id, req.user)); }
      catch (e) { res.status(400).json({ message: e.message }); }
    },
    vendorProducts: async (req, res) => {
      try { res.json(await productService.vendorProducts(req.user.id)); }
      catch (e) { res.status(500).json({ message: e.message }); }
    }
  };
}