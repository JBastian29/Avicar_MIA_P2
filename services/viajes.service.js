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
    if(!user){
        throw boob.notFound('user not found')
    }
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = ViajesService;
