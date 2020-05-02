var fs = require("fs")

const mongoose = require('mongoose');
const connBackEnd = mongoose.createConnection('mongodb://localhost:27017/almacenBackEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

const connFrontEnd = mongoose.createConnection('mongodb://localhost:27017/almacenFrontEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

let ProductoBack=connBackEnd.model('Producto',require('./ShemasBack/producto'))

let ProductoFront=connFrontEnd.model('Producto',require('./ShemaFront/producto'))

  async function cambiarNombre(file){
      let ext=file.split(".")[1];
      let date=Date.now().toString()
     await ProductoBack.findOne({img:file})
      .exec(async function(err,produ){

        await ProductoFront.findOneAndUpdate({code:produ.code},{img:'product_'+date+'.'+ext}, { new: true }) 
         .exec(function(err,prod){
            if(prod!=null){
            let origen='/home/rafael/programacionrafa/ProyectoAlmacenDIego/LeampTeam-BackEnd/leampteam/imagenes/producto/'+file
            let desti='/home/rafael/programacionrafa/ProyectoAlmacenDIego/API-LeampTeam/imagenes/producto/'+prod.img
            fs.copyFileSync(origen,desti) 
         }
         })
      })
   }

   fs.readdir("/home/rafael/programacionrafa/ProyectoAlmacenDIego/LeampTeam-BackEnd/leampteam/imagenes/producto/",function(err, files) {
      console.log(files)
      if (err) {
         return console.error(err);
      }
      files.forEach( function (file) {
         cambiarNombre(file)
         console.log( file );
      });
   });

 

