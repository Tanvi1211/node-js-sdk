module.exports = function (config, helper) {

	var module = {};
    var regAuthEndpoint = "/identity/v2/auth/registrationdata/";
    var regMngEndpoint = "/identity/v2/manage/registrationdata/";

    var helper = require('./../helper.js');

    // Get Record by Type and API Secret (GET)
    module.getBySecret = function ( type, parentid, skip, limit, fields ) {
        parentid = helper.checkNullOrUndefined(parentid);
        skip = helper.checkNullOrUndefined(skip);
        limit = helper.checkNullOrUndefined(limit);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + regMngEndpoint + type + "?parentid=" + parentid + "&skip=" + skip + "&limit=" + limit}, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Get Record by Type (GET)
    module.get = function ( type, parentid, skip, limit, fields ) {
        parentid = helper.checkNullOrUndefined(parentid);
        skip = helper.checkNullOrUndefined(skip);
        limit = helper.checkNullOrUndefined(limit);
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({uri: config.apidomain + regAuthEndpoint + type + "?apikey=" + config.apikey + "&parentid=" + parentid + "&skip=" + skip + "&limit=" + limit}, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Create Registration Data( POST )
    /*@params fromData (JSON) A valid json data (required)
    var formData = {
        "Data": [
        {
            "type": "",
            "key": "",
            "value": "",
            "parentid": "",
            "code": "",
            "isactive": true
        }
    ]
    }*/
    module.create = function (formData, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + regMngEndpoint,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            },true);
        });
    };

    // Update Record by id ( PUT )
    /*@params fromData (JSON) A valid json data (required)
     @params recordId A valid ID of record (required)
     var formData = {
         "IsActive": true,
         "Type": "",
         "Key": "",
         "Value": "",
         "ParentId": "",
         "Code": "acode"
     }
     */
    module.update = function ( recordId, formData, fields ) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "PUT",
                uri: config.apidomain + regMngEndpoint + recordId,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            },true);
        });
    };

    // Delete Record by Id( DELETE )
    module.remove = function (recordId, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "DELETE",
                uri: config.apidomain + regMngEndpoint + recordId
            }, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            },true);
        });
    };

    //Validate Code
    /*@params fromData (JSON) A valid json data (required)
     var formData = {
         "recordid":"<selected dropdown item’s record id>",
         "code":"<secret code>"
     }
     */
    module.validateCode = function (formData, fields) {
        helper.checkFields(fields, config);
        return new Promise(function (resolve, reject) {
            config.request({
                method: "POST",
                uri: config.apidomain + regAuthEndpoint + "validatecode?apikey=" + config.apikey,
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(formData)
            }, function (data) {
                if (helper.checkError(data)) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

	return module;
}