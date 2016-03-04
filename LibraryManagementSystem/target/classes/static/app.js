var app = angular.module('app', ['ngRoute','ngTagsInput']);
app.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $routeProvider
            .when('/home', {
                templateUrl: 'book.html',
                controller: 'viewbooks'
            })
            .when('/add', {
                templateUrl: 'addcategory.html',
                controller: 'addcategoryctrl'
            })
           .when('/viewprofile', {
            templateUrl: 'viewprofile.html',
            controller: 'viewprofilectrl'
            })
           .when('/editprofile', {
            templateUrl: 'editprofile.html',
            controller: 'editprofilectrl'
            })
           .when('/new', {
                templateUrl: 'newbook.html',
                controller: 'addbookctrl'
            })
            .when('/edit/:id', {
                templateUrl: 'editbook.html',
                controller: 'editbookctrl'
            })
            .when('/view', {
                templateUrl: 'viewcategory.html',
                controller: 'viewcategories'
            })
           .when('/fine', {
                templateUrl: 'fine.html',
                controller: 'viewfinectrl'
            })
            .when('/viewhistory/:id', {
                templateUrl: 'viewhistory.html',
                controller: 'viewhistoryctrl'
            })

        .when('/issuebook', {
                templateUrl: 'issuebook.html',
                controller: 'issuebookctrl'
            })
            .when('/track', {
                templateUrl: 'track.html',
                controller: 'trackctrl'
            })
            .when('/accesshistory', {
                templateUrl: 'accesshistory.html',
                controller: 'accesshistoryctrl'
            })
            .when('/viewbook/:categoryId', {
                templateUrl: 'viewbookbycategory.html',
                controller: 'viewbookctrl'
            })
            .when('/returnbook', {
                templateUrl: 'return.html',
                controller: 'returnbookctrl'
            })
           .when('/editcategory/:categoryId', {
                templateUrl: 'editcategory.html',
                controller: 'editcategoryctrl'
            })
            .when('/viewcopy/:bookid', {
                templateUrl: 'viewBook.html',
                controller: 'viewcopyctrl'
            })
            .when('/mybooks', {
                templateUrl: 'mybooks.html',
                controller: 'viewmybooksctrl'
            })

        .when('/index', {
            templateUrl: 'index.html',
            controller: 'animationctrl'
        })
        .when('/viewcat/:bookid', {
                templateUrl: 'viewcatofbook.html',
                controller: 'viewcatofbookctrl'
            })
          .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerctrl'
        })
        //.otherwise({
        // redirectTo: '/view'
        //});
    }
]);


app.run(function($rootScope, $http, $location) {

$http({
    method: 'GET',
    url: '/log',

}).then(function(response) {

    $rootScope.response = response.data;
    if ($rootScope.response.status == 'true') {
        $rootScope.authenticated = true;  
        if ($rootScope.response.role == 'user') {
            $rootScope.user = true;
            $rootScope.admin = false;
            $rootScope.clerk=false;
            
        } 
        else
        	if ($rootScope.response.role == 'clerk') {
                $rootScope.user = false;
                $rootScope.admin = false;
                $rootScope.clerk=true;
            }
            
        
        else {
            $rootScope.admin = true;
            $rootScope.user = false;
            $rootScope.clerk=false;
        }
    } else {
        $rootScope.authenticated = false;
        }

})
$rootScope.logOut= function(){
	$http({
		method : 'POST',
		url : '/logout',     
	
	}).then(function(response) {
	    
		$rootScope.authenticated = false;
		$rootScope.admin=false;
		$rootScope.user=false;
		$rootScope.clerk=false;
		$rootScope.auth.userName="";
		$rootScope.auth.password="";
	}, function (response){
/*		alert('Logout error call back Successfully');
  */      
		$rootScope.authenticated = false;
		$rootScope.admin=false;
		$rootScope.user=false;
		$rootScope.clerk=false;
		$rootScope.auth.userName="";
		$rootScope.auth.password="";	
	});
	/*alert('Logout Successfully');*/
	
}

});

app.directive("passwordVerify", function() {
	   return {
	      require: "ngModel",
	      scope: {
	        passwordVerify: '='
	      },
	      link: function(scope, element, attrs, ctrl) {
	        scope.$watch(function() {
	            var combined;

	            if (scope.passwordVerify || ctrl.$viewValue) {
	               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
	            }                    
	            return combined;
	        }, function(value) {
	            if (value) {
	                ctrl.$parsers.unshift(function(viewValue) {
	                    var origin = scope.passwordVerify;
	                    if (origin !== viewValue) {
	                        ctrl.$setValidity("passwordVerify", false);
	                        return undefined;
	                    } else {
	                        ctrl.$setValidity("passwordVerify", true);
	                        return viewValue;
	                    }
	                });
	            }
	        });
	     }
	   };
	});


app.controller('registerctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
	 $rootScope.members = {};
		    $scope.register = function() {
	        $http({
	            method: 'POST',
	            url: '/savemember',
	            data: $rootScope.members


	        }).then(function(response) {
	              /*  alert('registered Successfully!');*/
	                $rootScope.members = response.data;
	                $rootScope.user=response.data;
	              
	                });
	    };
  }])

app.controller('viewbooks', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books';

    $scope.intitPage=function(){
	 	$scope.page={
	    		 pageSize: 3,
	    		 pageCount: 0
	     };
	 }
	 	     
    $scope.showbook=function(bookid){
    	$http({
    	        method: 'GET',
    	        url: '/bookk/'+bookid,
    	    }).then(function(response) {
    	    	alert(response.data);
    	        $scope.abc = response.data;
    })
    }
	 			
	 	$scope.getBooks=function(){
	 		$http.post('/books' , $scope.page).then(function(response) {
	 			$rootScope.books = response.data.content;	
	 			$scope.page=$rootScope.getNumber(response.data.totalPages);
	 		
	 		});
	 	}

	 	$scope.toPageId = function(data){
	 		$scope.intitPage();
	 		$scope.page.pageCount = data;
	 		$scope.getBooks();
	 	}
	 	$scope.intitPage();
	 	$scope.getBooks();
	
		$rootScope.getNumber=function(num){
			return new Array(num);
		}
}])



app.controller('viewcatofbookctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'Categories';

    $http({
        method: 'GET',
        url: '/book/category/'+$routeParams.bookid,
        /*
         * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
         */
    }).then(function(response) {
        $rootScope.catofbooks = response.data;
    });

}])



app.controller('viewmybooksctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'My Books';

    $http({
        method: 'GET',
        url: '/viewmybooks',
        /*
         * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
         */
    }).then(function(response) {
        $rootScope.mybooks = response.data;
    });

    /*
     * $http({ method : 'GET', url : '/bookdetails', headers : { 'Authorization' :
     * 'Basic ' + encodedAuthData } }).then(function(response) {
     * $rootScope.mybookdetails= response.data; });
     */
}])


app.controller('addbookctrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
	$scope.title = 'Add new Book!';
    $rootScope.books={};
    
    $scope.loadTags = function(query) {
        return $http({
            method: 'GET',
            url: '/categories',
        });
    }
        
    $scope.savebook = function() {
    	debugger;
        $http({
            method: 'POST',
            url: '/addBook',
            data: $rootScope.books
        }).then(function(response) {
            if (response.data.status) {
                alert('book Added Successfully!');
                $rootScope.books = {};
                $location.url("/home");
            } else {
                alert('book Addition Failed!');
            }
        })
    }

}])



app.controller('animationctrl', ['$scope', '$rootScope', '$http','$location', function($scope, $rootScope, $http,$location) {
    $scope.title = 'hai welcome to LMS!';
$rootScope.auth={};
$rootScope.authenticated=false;
    $scope.login = function() {
        var authData = $rootScope.auth.userName + ':' + $rootScope.auth.password;
        var encodedAuthData = btoa(authData);
        $http({
            method: 'GET',
            url: '/log',
            headers: {
                'Authorization': 'Basic ' + encodedAuthData
            }
        }).then(function(response) {

            $rootScope.response = response.data;
           
            $rootScope.CurrentUser=response.data.name;
            alert('authentication Successfull');
            $rootScope.authenticated = true;
            $location.url("/view");
            if ($rootScope.response.role == 'user') {
                $rootScope.user = true;
            
                $rootScope.admin = false;
                $rootScope.clerk=false;
            }
            else
            	if ($rootScope.response.role == 'clerk') {
                    $rootScope.user = false;
                    $rootScope.admin = false;
                    $rootScope.clerk=true;
                }
                
            
            
            else {
                $rootScope.admin = true;
                $rootScope.user = false;
                $rootScope.clerk=false;
            }

/*            $location.path('/');
*/

        }, function(response) {
            $rootScope.authenticated = false;
       /*     alert('authentication failed');*/
            alert($rootScope.authenticated);
            
        });
    }
}]);





//controller to view a member's profile and notifications
app.controller('viewprofilectrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        $scope.title = 'hai welcome to profile!';
        $http({
            method: 'GET',
            url : '/getProfile',
        }).then(function(response) {
            $rootScope.profile= response.data;
        });



    }])
    //controller to edit a member's profile
app.controller('editprofilectrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.title = 'Edit your profile!';
    

}])

app.controller('returnbookctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	$scope.title="Pankaj";
	$scope.member={};
	$scope.fetchbymember=function(){
		$http({
			method : 'GET',
			url : '/searchbymember/'+ $scope.member.id,
			/*headers : {
					'Authorization' : 'Basic ' + encodedAuthData
				}*/
		}).then(function(response) {
			$rootScope.bookdetails= response.data;
		});
	}
			
			$scope.mark=function(accountid){
				$http({
					method : 'POST',
					url :'/markabook/'+accountid,
				}).then(function(response) {
					if(response.data.status){
					/*	alert('Book Successfully Returned...!');*/
						location.reload();
					}
					else {
						/*alert('Return not successfull...!');*/
					}
				});
					
			}
	}])

app.controller('editcategoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $http({
        method: 'GET',
        url: '/editCategory/'+$routeParams.categoryId,
    }).then(function(response) {
        $rootScope.categories = angular.copy(response.data);
    });

    
    $scope.test=function(){
    	alert("You");
    }
    $scope.editCategory = function() {
        $http({
            method: 'POST',
            url: '/editCategory/'+$routeParams.categoryId,
            data: $rootScope.categories
        }).then(function(response) {
            if (response.data.status) {
               /* alert('Category edited Successfully!');*/
            } else {
               /* alert('Category editing Failed!');*/
            }
        });
    }

}])
app.controller('viewhistoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $http({
        method: 'GET',
        url: '/viewmybooks',
    }).then(function(response) {
        $rootScope.mybooks= response.data;
    });

}])



app.controller('viewcategories', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Categories';
    $scope.showcat=function(catId){
    	$http({
    	        method: 'GET',
    	        url: '/category/'+catId,
    	    }).then(function(response) {
    	    	alert(response.data);
    	        $scope.catname = response.data;
    })
    }
    $http({
        method: 'GET',
        url: '/categories',
    }).then(function(response) {
        $rootScope.categories = response.data;
    });



}])

app.controller('addcategoryctrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', function($scope, $rootScope, $http, $routeParams, $location) {


    $rootScope.categories = {};
    $scope.addcategory = function() {
        $http({
            method: 'POST',
            url: '/addCategory',
            data: $rootScope.categories
        }).then(function(response) {
            if (response.data.status) {
            	$location.url("/view");
               /* alert('Category Added Successfully!');*/
            } else {
               /* alert('Category Addition Failed!');*/
            }
        });
    }
}])


//controller for viewing fines and adding a new fine rule
app.controller('viewfinectrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    //get all fine rules from fines table
    $http({
        method: 'GET',
        url: '/viewfine',

    }).then(function(response) {
        $rootScope.finesview = response.data;
    });

    //post a  fine rules to fines table
    $scope.addfinerule = function() {
        $http({
            method: 'POST',
            url: '/addfinerule',
            data: $rootScope.finesview
        }).then(function(response) {
            if (response.data.status) {
               /* alert('finerule Added Successfully!');*/
            } else {
              /*  alert('finerule Addition Failed!');*/
            }
        });
    }

}])



//modal for edit a fine rule
app.controller('editfinectrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $http({
        method: 'GET',
        url: '/viewfine',
    }).then(function(response) {
        $rootScope.fines = angular.copy(response.data);
    });

    $scope.editCategory = function() {
        $http({
            method: 'POST',
            url: '/editfine',
            data: $rootScope.categories
        }).then(function(response) {
            if (response.data.status) {
               /* alert('Category edited Successfully!');*/
            } else {
                /*alert('Category editing Failed!');*/
            }
        });
    }

}])


//controller to issue a book
app.controller('issuebookctrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    $scope.state = {};

    $http({
        method: 'GET',
        url: '/viewallbooks',
        /*
         * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
         */
    }).then(function(response) {
        $rootScope.books = response.data;
    });
    $scope.fetchbytitle = function() {

        // var status=$scope.state.title;
        $http({
            method: 'GET',
            url: '/searchbytitle/' + $scope.state.title,
            /*
             * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
             */
        }).then(function(response) {
            $rootScope.books = response.data;
        });
    }
    $scope.accountId={};
    $scope.change=function(accountId){
    	$scope.a=accountId;
    	
    }
   /* $scope.newItemType = 'abc';
    $scope.change = function () {
        console.log($scope.newItemType)
    };*/
    /*$scope.change=function(accountId){
    	$scope.a=$scope.books[bookId].quantity.accountId;
    }*/
/*$scope.a=$scope.books[bookId].quantity.accountId;*/
    $rootScope.bookdetail = {};
    $scope.issueBook = function() {
        $http({
            method: 'POST',
            url: '/abc',
            data: $rootScope.bookdetail


        }).then(function(response) {
            if (response.data.status) {
                alert('issued Successfully!');
                $location.url("/view");
               /* $rootScope.bookdetail = {};
                $rootScope.books = {};*/
            } else {
                alert('issuing Failed!');
            }
        });
    }
}]);

//controller to search a member to access history
app.controller('accesshistoryctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $http({
        method: 'GET',
        url: '/bookdetails',

    }).then(function(response) {
        $rootScope.bookdetails = response.data;
    });

}])

app.controller('viewbookctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books..!';

    $http({
        method: 'GET',
        url: '/viewcatbooks/book/'+$routeParams.categoryId,
    }).then(function(response) {
        $rootScope.booksbycategories = response.data;
    });

   /* $scope.index = $rootScope.categories[$routeParams.categoryId];*/

}])



/*controller to view each book and copies,add a copy*/
app.controller('viewcopyctrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', function($scope, $rootScope, $http, $routeParams, $location) {

    $scope.title = 'Copies of book';

    $http({
        method: 'GET',
        url: '/book/' + $routeParams.bookid,
    }).then(function(response) {
        $rootScope.x = response.data;
    });
    
    $scope.addcopy=function(bookid)
    {
    	debugger;
    	$http({
    		method : 'POST',
    		url :'/addcopy1/'+bookid,
    	}).then(function(response) {
    		$rootScope.x = response.data;
    		location.reload();
    	});
    	
    }


    $scope.delete = function(quantity,index) {

    	if(quantity.status=="Available"){
        $http.delete('/deletecopy/' + quantity.accountId)
            .success(function(data, status, headers) {
                alert("deleted successfully");
                /*  $rootScope.x.quantity.splice(index, 1);  */
                location.reload();
            })
            .error(function(data, status, header, config) {
               /* alert("deleted failed");*/
            });
    	}
    	else{
    		/*alert("Can't be deleted because the status is Unavailable..")*/
    	}
    }

}]);



app.controller('editbookctrl',['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
	$scope.title = 'Edit Book!';
	/*$http({
        method: 'GET',
        url: '/editBook/'+$routeParams.categoryId,
    }).then(function(response) {
        $rootScope.categories = angular.copy(response.data);
    });*/
}])

