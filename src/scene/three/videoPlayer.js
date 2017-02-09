import TweenLite from 'gsap'
export default class VideoPlayer {
  constructor(domNode) {
    this.domNode = domNode
    this.iframe = domNode.querySelector('iframe')
    this.playing = false
  }

  play() {
    this.iframe.contentWindow.postMessage(
      '{"event":"command","func":"' + 'playVideo' + '","args":""}',
      '*');
    TweenLite.to(this.domNode, 1, { opacity: 1 })
    this.playing = true
  }

  pause() {
    this.iframe.contentWindow.postMessage(
      '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
      '*');
    TweenLite.to(this.domNode, 1, { opacity: 0.5 })
    this.playing = false
  }

  update(pos) {
    if(pos.z > 0 && this.playing){
      this.pause()
    }else if(pos.z > -800 && !this.playing){
      this.play()
    }
  }

}
