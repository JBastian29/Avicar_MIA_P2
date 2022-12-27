const boob = require('@hapi/boom')

class UserService {
  constructor() {}

  async create(data) {
    return newUser;
  }

  async find() {

    return response;
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

module.exports = UserService;
