const express = require('express')
const cors = require('cors');
const XMLHttpRequest = require('xhr2');
const app = express()
const port = 3001

app.use(cors())

app.get('/review/:id/:limit', async (req, res) => {
    const url = "https://minecraft.buzz/processing/reviews_show_more.php?server_id="+req.params.id;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          res.send(xhr.responseText);
       }};
    
    const data = "limit="+req.params.limit;
    
    xhr.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
