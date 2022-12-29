const boob = require('@hapi/boom')

class AutosService {
    id = 0
    autos = []
  constructor() {}

  async create(data) {
    this.id++;
    const newAutos = {
        id: this.id,
        ...data
    }
    this.autos.push(newAutos);
    return newAutos;
  }

  async find() {
    return this.autos;
  }

  async findOne(id) {
    const viajeEncontrado = this.autos.find(item => item.id === +id);
    if (!viajeEncontrado) {
        return "Auto con id: " + id + ", no existe"
    }
    return viajeEncontrado;
  }

  async update(id, changes) {
    const index = this.autos.findIndex(item => item.id === +id);
    if (index === -1) {
      return "Auto con id: " + id + ", no existe"
    }
    const new_viaje = this.autos[index];
    this.autos[index] = {
      ...new_viaje,
      ...changes
    };
    return this.autos[index];
  }

  async delete(id) {
    const index = this.autos.findIndex(item => item.id === +id);
    if (index === -1) {
      return "Auto con id: " + id + ", no existe"
    }
    this.autos.splice(index, 1);
    return { id };
  }
}

module.exports = AutosService;
