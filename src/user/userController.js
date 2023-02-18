var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    var result = null;
    try {
        result = await userService.createUserDBService(req.body);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.searchuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req,res)=> {
    var result = null
    try {
        result = await userService.deleteuserDBService(req.body);
        if (result.status) {
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message": result.msg});
        }
    } catch (error) {
        console.log(error);
        res.send({"status": false, "message": error.msg});
    }
}

var updateUseDBServiceControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.updateUseDBService (req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg});
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc,updateUseDBServiceControllerFunc };
