var fs = require("fs")
var rutas = require('./local')


const mongoose = require('mongoose');
const connBackEnd = mongoose.createConnection('mongodb://localhost:27017/almacenBackEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

const connFrontEnd = mongoose.createConnection('mongodb://localhost:27017/almacenFrontEnd',
{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});

let ProductoBack=connBackEnd.model('Producto',require('./ShemasBack/producto'))

let ProductoFront=connFrontEnd.model('Producto',require('./ShemaFront/producto'))


   function cambiarNombre(file){
      let i=0
      ProductoBack.findOne({img:file},function(err,produ){
         if(produ!=null){
            
            let  ext=file.split(".")[1];
            let  nameimg='product_'+produ._id+'.'+ext
             ProductoFront.findOneAndUpdate({code:produ.code},{img:nameimg}, { new: true },function(err,pro){
               i++
               if(pro!=null){
   
                 let origen=rutas.rutaOrigen+file   
                        
                  let desti=rutas.rutaDestino+pro.img
                  
                  
                  fs.copyFile(origen,desti,function(err){
                     if(err){
                        console.log(err)
                     }else{
                        console.log('archivo copiado')
                     
                       
                     }
                  }) 
               }
            }) 
               
              
         }
         
      })
    
      
   
   }

   // let origen='/home/diego/Escritorio/LimpTeam/LeampTeam-BackEnd/leampteam/imagenes/producto/'+file
   // let desti='/home/diego/Escritorio/LimpTeam/API-LeampTeam/imagenes/'+prod.img
   let filesElim=fs.readdirSync(rutas.rutaDestino)
    
      filesElim.forEach( function (file) {
          fs.unlinkSync(rutas.rutaDestino+file)
      })
 
   
  let files=fs.readdirSync(rutas.rutaOrigen)
    
     
      files.forEach( function (file) {
        cambiarNombre(file)
        
      })
   

 

