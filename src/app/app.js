(function(){
	var app = angular.module('yn',["ngRoute","ngCookies","angularjs-crypto"]);

// ==================================================================
//************* Initilize Header and footer directives **************
// ==================================================================
  app.directive('header', function() {
      return {
          restrict: 'E', 
          templateUrl: 'head.html',
          controller : 'headerctrl',
      };
   	}
	);
	app.directive('footer', function() {
      return {
          restrict: 'E', 
          templateUrl: 'footer.html'
      };
   }
  );
// ==================================================================
// ****************** End Directives ********************************
// ==================================================================

//<<<<<<<<<<<<<<<<<<<<<<<========================>>>>>>>>>>>>>>>>>>>>
// ==================================================================
//*************************** Routing *******************************
// ==================================================================
  app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller : "home",
    })
    .otherwise({
        templateUrl : "error.html"
    });
  });
// ==========================================================
// ******************** End Routing *************************
// ==========================================================

// ***************************************************
// ============== Controllers Header And Footer ==============
// ***************************************************
  //============ Header controller ========================
  app.controller('headerctrl',[function($cookies,$rootScope){

  }]);
  //=========== footer controller ============
  app.controller('footerc',function(){
    
  });
// ***************************************************
// ============== End Header And Footer ==============
// ***************************************************


// ****************************************************
// ============= Home Page Controller =================
// ****************************************************

  app.controller('home',['$http','$rootScope','$filter','$sce','$timeout',function($http,$rootScope,$filter,$sce,$timeout){
    var vm = this;    
    vm.score = 0;
    vm.level = 1;
    vm.allshapeswithcolor = [];
    vm.sideshapes = [];
    vm.tempshapes = [];
    vm.step = 0;
    vm.colors = ['yellow','green','red','blue'];
    vm.shapes = [
        {"shape" : 'circle',"values" : {'cx':'40','cy':'40','r':'30'}},
        {"shape":'rect','values':{'width':'50','height':'50'}},
        {"shape":'ellipse','values':{'cx':'40','cy':'40','rx':'40','ry':'25'}},
        {"shape":'polygon','values':{"points":'30,10 10,60 60,60'}}];
    vm.genrandomnum = function(){
      if(vm.level>=4){
        vm.pln = 4;
      }else{
        vm.pln = vm.level+1;
      }
      return Math.floor(Math.random() * vm.pln);
    }
    vm.generateshapes = function(){
      return {'shape':vm.shapes[vm.genrandomnum()],'color':vm.colors[vm.genrandomnum()]};
    }
    for(var i=0;i<20;i++){
      vm.allshapeswithcolor.push(vm.generateshapes());
    }
    
    for(var i=0;i<4;i++){
      vm.sideshapes.push({'first' : vm.generateshapes(),'second' : vm.generateshapes()})
    }
    


    vm.counter = 60;
    var stopped;
    
    vm.countdown = function() {
      stopped = $timeout(function() {
         console.log(vm.counter);
        if(vm.counter == 0){
          alert('Game Over.');
          vm.step = 0;
          vm.score=0;
          vm.level=1;
          vm.counter = 60;
           var stopped;
          vm.allshapeswithcolor = [];
           for(var i=0;i<20;i++){
             vm.allshapeswithcolor.push(vm.generateshapes());
           }
           vm.sideshapes = [];
           for(var i=0;i<4;i++){
             vm.sideshapes.push({'first' : vm.generateshapes(),'second' : vm.generateshapes()})
           }
        }
       vm.counter--;   
       vm.countdown();
          
      }, 1000);
    };

    vm.countdown();
    vm.identify = function(ind){
      vm.tempshapes.push(vm.allshapeswithcolor[ind]);
      var st = false;
      if(vm.tempshapes.length == 2){
        //========== compare temp with sideshapes ================
        //console.log(vm.sideshapes[0].first.shape.shape);
        for(var i=0;i<4;i++){
          if(vm.sideshapes[i].first.shape.shape == vm.tempshapes[0].shape.shape 
            && vm.sideshapes[i].first.color == vm.tempshapes[0].color 
            && vm.sideshapes[i].second.shape.shape == vm.tempshapes[1].shape.shape 
            && vm.sideshapes[i].second.color == vm.tempshapes[1].color){
            st=true;
            var nwind = i;
            break;
          }
        }
        if(st){
          vm.step++;
          vm.sideshapes.splice(nwind,1);
          vm.sideshapes.push({'first' : vm.generateshapes(),'second' : vm.generateshapes()});
          vm.score+=10;
          if(Math.floor(vm.step/10)+1>vm.level){
            alert('Congradulations..... Your going to next round.');
            vm.step = 0;
            vm.level+=1;
            vm.allshapeswithcolor = [];
            vm.counter = 60-vm.step;
            for(var i=0;i<20;i++){
              vm.allshapeswithcolor.push(vm.generateshapes());
            }
            vm.sideshapes = [];
            for(var i=0;i<4;i++){
              vm.sideshapes.push({'first' : vm.generateshapes(),'second' : vm.generateshapes()})
            }
          }
        }else{
          vm.score-=1;
        }
        
        vm.tempshapes = [];
      }
    }
  }]);

// *******************************************************
//================ End Home Page Controller ============== 
// *******************************************************

//==================================================================================================
//+++++++++++++++++++++++++++++++ End controllers ++++++++++++++++++++++++++++++++++++++++++++++++++
//==================================================================================================



  //==========================================
})();

