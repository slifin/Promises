function Item(){
	var that = {},
	get = function(){
		return new Promise(function(allow,reject){
			setTimeout(allow(that.obj), 1);
		});
	},
	set = function(obj){
		return new Promise(function(allow,reject){
			setTimeout(function(){
				that.obj = obj;
				allow();
			}, 1);
		});
	},
	save = function(obj){
		return Promise.all([set(obj),get]);
	},
	writeToElem = function(obj){
		if (!('dom' in obj)) 
			return Promise.reject('oh noes no dom key');
		elem = document.getElementById(obj.dom);
		delete obj.dom;
		elem.innerHTML = JSON.stringify(obj);
		return Promise.resolve();
	};
	that.get = get;
	that.set = set;
	that.save = save;
	that.writeToElem = writeToElem;
	return that;
}

var Toy = Item();
Toy.set({id:1,title:'cool toy',dom:'test'})
.then(Toy.get)
.then(Toy.writeToElem)
//possible reject in writeToElem so we catch for rejects here (second func)
.then(function(){},function(err){console.log(err);});

//wait till two async methods have both completed but don't queue them
//(see save() get/set are both async)
var Sausage = Item();
Sausage.save({id:1,title:'le sausage'}).then(function(sausage){
	console.log(Sausage.obj);
});






