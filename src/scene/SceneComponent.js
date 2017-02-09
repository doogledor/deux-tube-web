import _ from 'lodash';
import Inferno from 'inferno';
import Component from 'inferno-component';
import JSONLOADER from '../jsonLoader';
import VideoC from './videoComponent';

import Scene from './three/scene'

import './scene.scss';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.domScene = null
    this.state = {
      recent: null
    }
  }

  makeNodes(data) {
    this.nodes = _.compact(data
      .map(obj => {
        if (!obj.youtube) {
          return null
        }
        return Object.assign({}, {
          domNode: null,
          onLoaded:(domNode=>{
          })
        }, obj.youtube)
      })
    )
    return this.nodes
  }

  makeScene() {
    this.scene = Scene(this.domScene, this.nodes)
  }

  componentDidMount(els) {
    JSONLOADER.loadRecent()
      .then(d => {
        this.setState({ recent: this.makeNodes(d) })
        this.makeScene()
      })
  }

  videos() {
    if (this.state.recent) {
      return this.state.recent
        .map(obj => {
          return VideoC(obj)
        })
    }
    return <div></div>
  }
  render() {
    return (
      <div className="Scene" ref={domScene => (this.domScene = domScene )}>
        {this.videos()}
      </div>
    )
  }
}

export default MyComponent
