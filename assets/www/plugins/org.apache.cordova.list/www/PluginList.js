cordova.define("org.apache.cordova.list.PluginList",function(require, exports, module){
	var exec = require('cordova/exec');
	
	var PluginList = function() {};
	
	PluginList.prototype.doSomething = function(onSuccess, onFailed) {
        exec(onSuccess, onFailed, 'PluginList', 'do_something', []);
    }

	PluginList.prototype.checkboxlist = function(parameter, onSuccess, onFailed) {
        exec(onSuccess, onFailed, 'PluginList', 'checkboxlist', [parameter]);
    }
	
	PluginList.prototype.radiolist = function(parameter, onSuccess, onFailed) {
        exec(onSuccess, onFailed, 'PluginList', 'radiolist', [parameter]);
    }

	PluginList.prototype.doOtherThings = function(param1, param2, onSuccess, onFailed) {
        exec(onSuccess, onFailed, 'PluginList', 'do_other_things', [param1, param2]);
    }

    module.exports = new PluginList();
});