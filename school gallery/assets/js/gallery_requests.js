const URL = "http://127.0.0.1:3000/api"


function ste() {
    fetch(`${URL}/gallery`)
    .then(results=>results.json())
    .then(data =>console.log(data))
    .catch(error=>console.error(error))
}
setInterval(() => {
   ste 
}, 2000);