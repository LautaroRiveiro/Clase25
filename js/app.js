(function(){

var app = angular.module('ejemplosApp',[ ]);

//Si comento el bloque app.config, me sale error $sce:insecurl por la petición de geoplugin
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
    	'http://www.geoplugin.net/json.gp?callback',

    	//Si comento solamente esta ruta, me tira error $sce:insecurl por el ng-include en el index.html
    	'http://localhost/udemy/Clase25/html/grillaProfesores.html'
    ]);
});

app.controller('mainCtrl', ['$scope','$http', function($scope,$http){
  	
  	$scope.geo = {};
  	$scope.profesores = {};

	//http://www.geoplugin.net/json.gp?jsoncallback=JSON_CALLBACK
	$http.jsonp('http://www.geoplugin.net/json.gp?callback', {jsonpCallbackParam: 'jsoncallback'})
	.then(function(data){
		console.info(data);
		console.info(data.data);
		$scope.geo = data.data;
	},function(error){
		console.info(error);
	});


	$http.get('json/profesores.json')
	.then(function(data){
		console.info(data);
		$scope.profesores = data.data.profesores;
	},function(error){
		console.info(error);
	});



}]);

})();
