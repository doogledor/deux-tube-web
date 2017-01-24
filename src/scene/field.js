export default class Field{
  constructor(position, mass){
    this._position = position
    this._mass = mass
  }

  get position(){
    return this._position
  }

  get mass(){
    return this._mass
  }
}