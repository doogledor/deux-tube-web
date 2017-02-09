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
          const dd = JSON.parse(d)
          dd.duration = Math.floor(Math.random() * 100) + 100
          return dd;
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
