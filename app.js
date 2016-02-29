var app = angular.module('app', ['ngRoute']);
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
                controller: 'editbook'
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

            .when('/viewlist', {
                templateUrl: 'listcategories.html',
                controller: 'listcategoriesctrl'
            })
        .when('/issuebook', {
                templateUrl: 'issuebook.html',
                controller: 'issuebookctrl'
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
            
            .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerctrl'
        })


        .when('/index', {
            templateUrl: 'index.html',
            controller: 'indexctrl'
        })


        //.otherwise({
        // redirectTo: '/view'
        //});
    }
]);


app.run(function($rootScope, $http, $location,$window) {

	
	$rootScope.title = 'Genres';
	 $http({
	        method: 'GET',
	        url: '/categories',
	    }).then(function(response) {
	        $rootScope.cat = response.data;
	    });
	
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

        } else {
            $rootScope.admin = true;
            $rootScope.user = false;

        }
    } else {
        $rootScope.authenticated = false;
        }

})
$rootScope.logOut= function(){
	alert('Logout Successfully')
	$http({
		method : 'POST',
		url : '/logout',     
	
	}).then(function(response) {
		$rootScope.authenticated = false;
		$rootScope.admin=false;
		$rootScope.user=false;
		$rootScope.auth.userName="";
		$rootScope.auth.password="";	
		
		
	});
	$rootScope.authenticated = false;
	$rootScope.admin=false;
	$rootScope.user=false;
	$rootScope.auth.userName="";
	$rootScope.auth.password="";	
	
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


app.controller('viewbooks', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books';

    $http({
        method: 'GET',
        url: '/books',
        /*
         * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
         */
    }).then(function(response) {
        $rootScope.books = response.data;
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



app.controller('addbookctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.title = 'Add new Book!';
    $rootScope.books = {};
    $http({
        method: 'GET',
        url: '/categories',
    }).then(function(response) {
        $rootScope.categories = response.data;
    })

    $scope.savebook = function() {
        $http({
            method: 'POST',
            url: '/addBook',
            data: $rootScope.books
        }).then(function(response) {
            if (response.data.status) {
                alert('book Added Successfully!');
                $rootScope.books = {};
            } else {
                alert('book Addition Failed!');
            }
        })
    }

}])


app.controller('indexctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
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
           /* alert('authentication Successfull');*/
            $rootScope.authenticated = true;
            if ($rootScope.response.role == 'user') {
                $rootScope.user = true;
                $rootScope.admin = false;
            } else {
                $rootScope.admin = true;
                $rootScope.user = false;
            }

/*            $location.path('/');
*/

        }, function(response) {
            $rootScope.authenticated = false;
            /*alert('authentication failed');*/
            /*alert($rootScope.authenticated);*/
        });
    }
}]);





//controller to view a member's profile and notifications
app.controller('viewprofilectrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        $scope.title = 'hai welcome to profile!';



    }])
    //controller to edit a member's profile
app.controller('editprofilectrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.title = 'Edit your profile!';



}])

app.controller('returnbookctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.title = 'clerk can return book here!';
    $http({
        method: 'GET',
        url: '/bookdetails',
        /*
         * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
         */
    }).then(function(response) {
        $rootScope.bookdetails = response.data;
    });



}])

app.controller('editcategoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $http({
        method: 'GET',
        url: '/categories',
    }).then(function(response) {
        $rootScope.categories = angular.copy(response.data);
    });

    $scope.editCategory = function() {
        $http({
            method: 'POST',
            url: '/editCategory/',
            data: $rootScope.categories
        }).then(function(response) {
            if (response.data.status) {
                alert('Category edited Successfully!');
            } else {
                alert('Category editing Failed!');
            }
        });
    }

}])
app.controller('viewhistoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $http({
        method: 'GET',
        url: '/member/' + $routeParams.memid,
    }).then(function(response) {
        $rootScope.track = response.data;
    });



}])

/*app.controller('listcategoriesctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $scope.title = 'Genres';
 $http({
        method: 'GET',
        url: '/categories',
    }).then(function(response) {
        $rootScope.cat = response.data;
    });



}])*/

app.controller('viewcategories', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Categories';

    $http({
        method: 'GET',
        url: '/categories',
    }).then(function(response) {
        $rootScope.categories = response.data;
    });



}])

app.controller('addcategoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {


    $rootScope.categories = {};
    $scope.addcategory = function() {
        $http({
            method: 'POST',
            url: '/addCategory',
            data: $rootScope.categories
        }).then(function(response) {
            if (response.data.status) {
                alert('Category Added Successfully!');
            } else {
                alert('Category Addition Failed!');
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
                alert('finerule Added Successfully!');
            } else {
                alert('finerule Addition Failed!');
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
                alert('Category edited Successfully!');
            } else {
                alert('Category editing Failed!');
            }
        });
    }

}])


//controller to issue a book
app.controller('issuebookctrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    $scope.state = {};

    $http({
        method: 'GET',
        url: '/books',
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
                $rootScope.bookdetail = {};
                $rootScope.books = {};
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
        url: '/members',

    }).then(function(response) {
        $rootScope.history = response.data;
    });

}])

app.controller('viewbookctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books..!';

    $http({
        method: 'GET',
        url: '/viewcatbooks/book/'+routeParams.categoryId,
    }).then(function(response) {
        $rootScope.categories = response.data;
    });

    $scope.index = $rootScope.categories[$routeParams.categoryId];

}])

app.controller('registerctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
	 $rootScope.members = {};
		    $scope.register = function() {
	        $http({
	            method: 'POST',
	            url: '/savemember',
	            data: $rootScope.members


	        }).then(function(response) {
	                alert('registered Successfully!');
	                $rootScope.members = response.data;
	                $rootScope.user=response.data;
	              
	                });
	    };
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
                $rootScope.x.quantity.splice(index, 1);
            })
            .error(function(data, status, header, config) {
                alert("deleted failed");
            });
    	}
    	else{
    		alert("Can't be deleted because the status is Unavailable..")
    	}
    }

}]);




