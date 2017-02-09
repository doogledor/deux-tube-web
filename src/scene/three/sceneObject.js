import THREE from './three'
import VideoPlayer from './videoPlayer';

const Vector2 = THREE.Vector2

const getAngle = (vector) => (Math.atan2(vector.y, vector.x))

export default class SceneObject {
  constructor(threeObj, obj, MAX_Z) {
    this.position = new Vector2(threeObj.position.x, threeObj.position.y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);

    this.threeObj = threeObj
    this.videoPlayer = new VideoPlayer(obj.domNode)
    this._incre = MAX_Z / obj.duration / 60

    this.active = false
  }

  get position() {
    return this.threeObj.position
  }

  set position(vec) {
    if (this.threeObj) {
      this.threeObj.position = vec
    }
  }

  get active() {
    return this._active
  }

  set active(a) {
    //this.threeObj.visible = a
    this._active = a
  }

  reset() {
    this.velocity.set(new Vector2(0, 0))
  }

  move() {
    if(!this._active){
      return
    }
    this.position.x = this.position.x
    this.position.y = this.position.y
    this.position.z = this.position.z - this._incre
    this.videoPlayer.update(this.position)
  }

  start() {
    this.active = true
    setTimeout(() => {
      this.videoPlayer.play()
    }, 4000)
  }
}
