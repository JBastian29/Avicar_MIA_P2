const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');
const  fileUpload  = require('express-fileupload')

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middleware/error.handle');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin:(origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true)
    } else{
      callback(new Error("no permitido"))
    }
  }
}
app.use(cors(options));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.use(express.static('images'))
routerApi(app);
// app.use(logErrors);
// app.use(ormErrorHandler)
// app.use(boomErrorHandler)
// app.use(errorHandler);


app.listen(port, () => {
  console.log('Puerto ' +  port);
});
