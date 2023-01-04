const boob = require('@hapi/boom')

class ViajesService {
    id = 0
    viajes = []
  constructor() {}

  async create(data) {
    this.id++;
    const newViajes = {
        id: this.id,
        ...data
    }
    this.viajes.push(newViajes);
    return newViajes;
  }

  async find() {
    return this.viajes;
  }

  async findOne(id) {
    const viajeEncontrado = this.viajes.find(item => item.id === +id);
    if (!viajeEncontrado) {
      return {message: "Viaje con id: " + id + ", no existe"}
    }
    return viajeEncontrado;
  }

  async update(id, changes) {
    const index = this.viajes.findIndex(item => item.id === +id);
    if (index === -1) {
      return {message: "Viaje con id: " + id + ", no existe"}
    }
    const new_viaje = this.viajes[index];
    this.viajes[index] = {
      ...new_viaje,
      ...changes
    };
    return this.viajes[index];
  }

  async delete(id) {
    const index = this.viajes.findIndex(item => item.id === +id);
    if (index === -1) {
      return {message: "Viaje con id: " + id + ", no existe"}
    }
    this.viajes.splice(index, 1);
    return { id };
  }
}

module.exports = ViajesService;
