import xhr from 'xhr-request';
import Q from 'bluebird';
const L = (() => {
  function loadRecent() {
    return new Q((yes, no) => {
      xhr(`${ASSETS}json/chewb-recent.json?z=${Math.random()}`, {
        json: true
      }, function(err, data) {
        if (err) {
          no(err)
        }
        const p = data.map(d=>{
          return JSON.parse(d)
        })
        yes(p)
      })
    })
  }
  return {
    loadRecent: loadRecent
  }
})()

export default L
