var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findOne({ email: userDetails.email}, function getResult(errorvalue, result){
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }else{
                if(result !=undefined &&  result !=null){
                    resolve({status: false,msg: "El usuario ya existe"});
                }else{
                    var userModelData = new userModel();
                    userModelData.firstname = userDetails.firstname;
                    userModelData.lastname = userDetails.lastname;
                    userModelData.email = userDetails.email;
                    userModelData.password = userDetails.password;
                    var encrypted = encryptor.encrypt(userDetails.password);
                    userModelData.password = encrypted;
                    userModelData.save(function resultHandle(error, result) {
                        if (error) {
                            reject({status: false,msg: "A ocurrido algun error en la creación del usuario"});
                        } else {
                            resolve({status: true,msg: "usuario creado correctamente"});
                        }
                    });

                }
            }
        })
    });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}


module.exports.searchuserDBService = (userDetails)=>  {
    return new Promise(function myFn(resolve, reject)  {
        userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                if(result !=undefined &&  result !=null) {
                            resolve({status:true, msg:result})
                }
                else {
                    reject({status: false,msg: "Detalles de usuario invalido"});
                }
            }
        });
    });
}

module.exports.deleteuserDBService = (userDetails)=>{
    return new Promise(function myFn(resolve, reject){
        userModel.findOne({email: userDetails.email}, function getresult(error, result){
            if (error){
                reject({status:false,msg:"email no encontrado"})
            }else {
                if (result !=undefined && result !=null){
                    userModel.deleteOne({email:userDetails.email}, function del(error,result){
                        if (error){
                            reject({status:false, msg:error})
                        }
                    })
                    resolve({status:true, msg: "usuario eliminado"})
                }else {
                    reject({status: false,msg: "Dusuario invalido"});
                }

            }

        })
    })

}


module.exports.updateUseDBService = (userDetails)=> {
    var encrypted = encryptor.encrypt(userDetails.password);
    userDetails.password=encrypted;
    return new Promise(function myFn(resolve, reject)  {
        userModel.findOneAndUpdate({ email: userDetails.email},userDetails,function getresult(error, result) {

            if(error) {
                reject({status: false, msg: "No ACTUALIZADO"});
            }
            else {
                if(result !=undefined &&  result !=null) {
                    resolve({status: true,msg: "Usuario Encontrado - ACTUALIZADO- "});
                }
                else {
                    reject({status: false,msg: "Detalles de usuario a ACTUALIZADO invalido"});
                }
            }
        });
    });
}
