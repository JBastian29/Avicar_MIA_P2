const boob = require('@hapi/boom')

class SolicitudesService {
    id = 0
    solis = []
  constructor() {}

  async create(data) {
    this.id++;
    const newSolis = {
        id: this.id,
        ...data
    }
    this.solis.push(newSolis);
    return newSolis;
  }

  async find() {
    return this.solis;
  }

  async findOne(id) {
    const viajeEncontrado = this.solis.find(item => item.id === +id);
    if (!viajeEncontrado) {
      throw boom.notFound('product not found');
    }
    return viajeEncontrado;
  }

  async update(id, changes) {
    const index = this.solis.findIndex(item => item.id === +id);
    if (index === -1) {
      return "Viaje con id: " + id + ", no existe"
    }
    const new_viaje = this.solis[index];
    this.solis[index] = {
      ...new_viaje,
      ...changes
    };
    return this.solis[index];
  }

  async delete(id) {
    const index = this.solis.findIndex(item => item.id === +id);
    if (index === -1) {
      return "Viaje con id: " + id + ", no existe"
    }
    this.solis.splice(index, 1);
    return { id };
  }
}

module.exports = SolicitudesService;