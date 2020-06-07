var fs = require("fs")
var rutas = require('./local')
var path = require('path');

const mongoose = require('mongoose');
const connBackEnd = mongoose.createConnection('mongodb://localhost:27017/almacenBackEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

const connFrontEnd = mongoose.createConnection('mongodb://localhost:27017/almacenFrontEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

let ProductoBack=connBackEnd.model('Producto',require('./ShemasBack/producto'))

let ProductoFront=connFrontEnd.model('Producto',require('./ShemaFront/producto'))


   function cambiarNombre(file){
       console.log(file)
      let i=0
      ProductoBack.findOne({img:file},function(err,produ){
          console.log(err)
         console.log(produ)
         if(produ!=null){
            console.log(produ)
            let  ext=file.split(".")[1];
            let  nameimg='product_'+produ._id+'.'+ext
             ProductoFront.findOneAndUpdate({code:produ.code},{img:nameimg}, { new: true },function(err,pro){
               i++
               if(pro!=null){
   
                 let origen = rutas.rutaOrigen + file
                     console.log(origen)   
                  let desti = rutas.rutaDestino + pro.img
                     console.log(desti)
                  
                  fs.copyFile(origen,desti,function(err){
                     if(err){
                        console.log(err)
                     }else{
                        console.log('archivo copiado')
                     
                       
                     }
                  }) 
               }
            }) 
               
              
         }else{
               console.log('no se copio')
         }
         
      })
    
      
   
   }

   // let origen='/home/diego/Escritorio/LimpTeam/LeampTeam-BackEnd/leampteam/imagenes/producto/'+file
   // let desti='/home/diego/Escritorio/LimpTeam/API-LeampTeam/imagenes/'+prod.img
   // let filesElim = fs.readdirSync(rutas.rutaDestino)
    
   //    filesElim.forEach( function (file) {
   //        fs.unlinkSync(rutas.rutaDestino+file)
   //    })
 
   try{
      console.log('ruta',rutas.rutaOrigen)
   let files = fs.readdirSync(rutas.rutaOrigen)
   console.log(files)
   files.forEach(function (file) {
      
      cambiarNombre(file)
      console.log(file)

   })
   }catch (err){
      console.log(err)
   }
  
    
     
      
   

