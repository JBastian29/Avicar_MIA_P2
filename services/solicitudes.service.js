const boob = require('@hapi/boom')
const viajes_cargados = require('./viajes.service')
const autos_cargados = require('./autos.service')
const {viajes} = require('./viajes.service')

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
      return {message: "Solicitud con id: " + id + ", no existe"}
    }
    return viajeEncontrado;
  }

  async findSpecificVuelo(id_user) {
    let solis_usuario=[]
    const solis_encontradas = this.solis.filter(item => item.id_turista == id_user);
    if (!solis_encontradas) {
      return {message: "Solicitud con id: " + id + ", no existe"}
    }
    solis_encontradas.forEach(async item =>{
      //solis_usuario.push(item.solicitud)
      if(item.tipo_servicio === 'vuelo'){
        let new_soli = {
          ...item.solicitud,
          estado_solicitud:item.estado_solicitud
        }
        solis_usuario.push(new_soli)
      }
    }
    );

    return solis_usuario;
    //   //     // console.log('entre if vuelo')
    //   //     // console.log(viajes_carg.viajes)
    //   //     // console.log(await viajes_carg.findOne(+item.id_servicio_solicitado))
    //   //     // solis_usuario.push(await viajes_carg.findOne(+item.id_servicio_solicitado))
    //   //     // console.log(viajes)
    //   //     solis_usuario.push(item.solicitud)
    //   // }else if(item.tipo_servicio === 'auto'){
    //   //   // console.log('entre if auto')
    //   //   // console.log(await viajes_carg.findOne(+item.id_servicio_solicitado))
    //   //   // solis_usuario.push(await autos_carg.findOne(+item.id_servicio_solicitado))
    //   // }
    // }
    // );
    //console.log(solis_usuario) 

    
    
  }

  async findSpecificAuto(id_user) {
    let solis_usuario=[]
    const solis_encontradas = this.solis.filter(item => item.id_turista == id_user);
    if (!solis_encontradas) {
      return {message: "Solicitud con id: " + id + ", no existe"}
    }
    solis_encontradas.forEach(async item =>{
      //solis_usuario.push(item.solicitud)
      if(item.tipo_servicio === 'auto'){
        let new_soli = {
          ...item.solicitud,
          estado_solicitud:item.estado_solicitud
        }
        solis_usuario.push(new_soli)
      }
    }
    );
    
    return solis_usuario;
      
  }

  async update(id, changes) {
    const index = this.solis.findIndex(item => item.id === +id);
    if (index === -1) {
      return {message: "Solicitud con id: " + id + ", no existe"}
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
      return {message: "Solicitud con id: " + id + ", no existe"}
    }
    this.solis.splice(index, 1);
    return { id };
  }
}

module.exports = SolicitudesService;