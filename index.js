var fs = require("fs")
const Producto=require('./model/product')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/almacenBackEnd', {useNewUrlParser: true, useUnifiedTopology: true});





function cambiarNombre(file){
    let ext=file.split(".")[1];
    let date=Date.now().toString()
   Producto.findOneAndUpdate({img:file},{img:'product_'+date+'.'+ext}, { new: true })
   .exec(function(err,prod){
   
        if(prod!=null){
        let origen='/home/diego/Escritorio/LimpTeam/LeampTeam-BackEnd/leampteam/imagenes/producto/'+file
        let desti='/home/diego/Escritorio/LimpTeam/API-LeampTeam/imagenes/'+prod.img
        fs.copyFileSync(origen,desti)  
        }
   })
   
  
   
//    function(err,prod){
//         let origen='/home/rafael/programacionrafa/ProyectoAlmacenDIego/LeampTeam-BackEnd/leampteam/imagenes/producto/'+file
//         let desti='/home/rafael/programacionrafa/ProyectoAlmacenDIego/API-LeampTeam/imagenes/producto/'+prod.img
//         fs.copyFileSync(origen,desti)  
//         console.log(prod)
        
//     })
}

 fs.readdir("/home/diego/Escritorio/LimpTeam/LeampTeam-BackEnd/leampteam/imagenes/producto/",function(err, files) {
     console.log(files)
    if (err) {
       return console.error(err);
    }
    files.forEach( function (file) {
        cambiarNombre(file)
       console.log( file );
    });
 });

 

