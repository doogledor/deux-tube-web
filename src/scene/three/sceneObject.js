import THREE from './three'

const Vector2 = THREE.Vector2

const getAngle = (vector) => (Math.atan2(vector.y, vector.x))

export default class SceneObject {
  constructor(threeObj) {
    this.position = new Vector2(threeObj.position.x, threeObj.position.y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);

    this.threeObj = threeObj
  }

  update(fields) {

    // our starting acceleration this frame
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;

    // for each passed field
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      // find the distance between the particle and the field
      var vectorX = field.position.x - this.position.x;
      var vectorY = field.position.y - this.position.y;

      // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
      var force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.1);

      // add to the total acceleration the force adjusted by distance
      totalAccelerationX += vectorX * force;
      totalAccelerationY += vectorY * force;

      totalAccelerationX *= 0.01
      totalAccelerationY *= 0.01
    }
    // update our particle's acceleration
    this.acceleration = new Vector2(totalAccelerationX, totalAccelerationY);
  }

  get position(){
    return this.threeObj.position
  }

  set position(vec){
    if(this.threeObj){
      this.threeObj.position = vec
    }
  }

  reset(){
    this.velocity.set(new Vector2(0,0))
  }

  move() {
    this.position.x = this.position.x
    this.position.y = this.position.y
    this.position.z = this.position.z + 0.05
  }
}
