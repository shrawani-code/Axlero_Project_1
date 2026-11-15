export function makeAuthController(authService) {
  return {
    register: async (req, res) => {
      try { res.status(201).json(await authService.register(req.body)); }
      catch (e) { res.status(400).json({ message: e.message }); }
    },
    login: async (req, res) => {
      try { res.json(await authService.login(req.body.email, req.body.password)); }
      catch (e) { res.status(401).json({ message: e.message }); }
    }
  };
}