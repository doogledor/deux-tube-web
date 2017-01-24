import Inferno from 'inferno';

const Video = (props) => {
    const { id } = props
    return ( <div ref = {
        (domNode) => {
          props.domNode = domNode;
          props.onLoaded(domNode)
        }
      }
      class = "f__video" >
      <iframe width="640" height="360" src={`http://youtube.com/embed/${id}?rel=0&showinfo=0`} frameborder="0"></iframe> < /div>)
    };

    export default Video
