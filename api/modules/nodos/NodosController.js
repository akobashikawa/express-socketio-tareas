class NodosController {
  constructor({ nodosService }) {
    this.nodosService = nodosService;
  }

  getItems = async (req, res, next) => {
    try {
      const items = await this.nodosService.getItems();
      res.json(items);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error);
    }
  }

  getItem = async (req, res, next) => {
    const id = +req.params.id || null;
    if (!id) {
      return res.status(400).json({
        id,
        message: 'Se requiere un id válido'
      });
    }
    try {
      const item = await this.nodosService.getItem(id);
      res.json(item);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  createItem = async (req, res, next) => {
    const io = req.app.get('io');

    const body = req.body || null;
    if (!body) {
      return res.status(400).json({
        body: req.body,
        message: 'Se requiere un body válido'
      });
    }
    try {
      const item = await this.nodosService.createItem(body);
      io.emit('tareaCreated', item);
      res.json(item);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateItem = async (req, res, next) => {
    const io = req.app.get('io');

    const id = +req.params.id || null;
    if (!id) {
      return res.status(400).json({
        id,
        message: 'Se requiere un id válido'
      });
    }

    const body = req.body || null;
    if (!body) {
      return res.status(400).json({
        body: req.body,
        message: 'Se requiere un body válido'
      });
    }
    try {
      const item = await this.nodosService.updateItem(id, body);
      io.emit('tareaUpdated', item);
      res.json(item);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  deleteItem = async (req, res, next) => {
    const io = req.app.get('io');
    
    const id = +req.params.id || null;
    if (!id) {
      return res.status(400).json({
        id,
        message: 'Se requiere un id válido'
      });
    }
    try {
      const result = await this.nodosService.deleteItem(id);
      io.emit('tareaDeleted', result);
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

module.exports = NodosController;