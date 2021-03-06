var app = angular.module('app', ['ngRoute','ngTagsInput','autocomplete','ui.bootstrap']);
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
    $rootScope.CurrentUser=response.data.name;
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
	               alert('registered Successfully!');
	               
	                });
	    };
  }])

/*app.controller('viewbooks', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books';

    $scope.intitPage=function(){
	 	$scope.page={
	    		 pageSize: 9,
	    		 pageCount: 0
	     };
	 }
	 	     
    $scope.showbook=function(bookid){
    	$http({
    	        method: 'GET',
    	        url: '/bookk/'+bookid,
    	    }).then(function(response) {
    	    	    	    	
    	        $rootScope.abcde = angular.copy(response.data);
    	    
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
		$scope.autofetch = function(search) {
			//alert("Injected");

			        // var status=$scope.state.title;
			        $http({
			            method: 'GET',
			            url: '/autosearchbytitle/'+search  ,
			            
			                          
			        }).then(function(response) {
			        
			            $scope.names = response.data;
			            
			        });
			    }
			    
			    
			    
			    $scope.fetchbytitle = function(query) {

			      
			        $http({
			            method: 'GET',
			            url: '/searchbytitle/' +query,
			           
			   
			        }).then(function(response) {
			            $scope.books =[];
			            $scope.books.push(response.data);
			        });
			    }


}])
*/
  app.controller('viewbooks', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Books';

   
    
    
    $scope.maxSize=5;
    $scope.currentPage=0;

    $scope.getAllBooks=function(){
    	$scope.pageSize=6;
          $http.get('/books?pc='+$scope.currentPage+'&ps='+$scope.pageSize)
               .success(function(data){
            	  
                        $rootScope.allTaskCount=data.totalElements;
                        $rootScope.books=data.content;
                       debugger;
                        $scope.bigTotalItems = data.totalElements;
                        
          })
      
    }
    $scope.getAllBooks();
     $scope.setPage = function(currentpage) { 
    $scope.currentPage=currentpage;

    $scope.getAllBooks();
     }
    $scope.showbook=function(bookid){
    	$http({
    	        method: 'GET',
    	        url: '/bookk/'+bookid,
    	    }).then(function(response) {
    	    	    	    	
    	        $rootScope.abcde = angular.copy(response.data);
    	    
    })
    }
	 			
	 
		$scope.autofetch = function(search) {
			
			        $http({
			            method: 'GET',
			            url: '/autosearchbytitle/'+search  ,
			            
			                          
			        }).then(function(response) {
			        
			            $scope.names = response.data;
			            
			        });
			    }
			    
			    
			    
			    $scope.fetchbytitle = function(query) {

			      
			        $http({
			            method: 'GET',
			            url: '/searchbytitle/' +query,
			           
			   
			        }).then(function(response) {
			            $scope.books =[];
			            $scope.books.push(response.data);
			        });
			    }


}])


app.controller('viewcatofbookctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'Categories';

    $http({
        method: 'GET',
        url: '/book/category/'+$routeParams.bookid,
        
    }).then(function(response) {
    
        $rootScope.catofbooks = response.data;
    });

}])



app.controller('viewmybooksctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'My Books';
    debugger;

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
            url: '/categories/'+query,
        });
    }
        
    $scope.savebook = function() {
    
        $http({
            method: 'POST',
            url: '/admin/addBook',
            data: $rootScope.books
        }).then(function(response) {
            if (response.data.status) {
               /* alert('book Added Successfully!');*/
                $rootScope.books = {};
                $location.url("/home");
            } else {
               /* alert('book Addition Failed!');*/
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
            /*alert('authentication Successfull');*/
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
            /*alert($rootScope.authenticated);*/
            
        });
    }

    
    $http({
		method : 'GET',
		url : '/getProfile',
	}).then(function(response) {
	
		$rootScope.Mydetails= angular.copy(response.data);
	});	
    $rootScope.EditProfile=function(){
    	$http({
			method : 'GET',
			url : '/getProfile',
		}).then(function(response) {
		
			$rootScope.Mydetails= angular.copy(response.data);
		});	
    }
    
    $scope.editsubmit=function(){
    	$http({
			method : 'POST',
			url : '/editmember',
			data:$rootScope.Mydetails
		}).then(function(response) {
            if (response.data.status) {
               /* alert('Member Edited Successfully!');*/
             /*   $rootScope.books = {};*/
                $location.url("/viewprofile");
            } else {
                /*alert('Member Editing Failed!');*/
            }
        })	
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
    $scope.EditProfile=function(){
    	$http({
			method : 'GET',
			url : '/getProfile',
		}).then(function(response) {
			$rootScope.Mydetails= response.data;
		});	
    }
    
    

}])

app.controller('returnbookctrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
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
					url :'/clerk/markabook/'+accountid,
				}).then(function(response) {
				
					if(response.data){
					/*	alert('Book Successfully Returned...!');*/
						$scope.returnbook=response.data;
			
						alert($scope.returnbook.fine);
						$location.url("/accesshistory");
					}
					else {
						/*alert('Return not successfull...!');*/
					}
				});
					
			}
	}])

app.controller('editcategoryctrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.editCategory = function() {
    	debugger;
            $http({
            method: 'POST',
            url: '/admin/editcategoryname',
            data: $rootScope.catname
           
        }).then(function(response) {
                if (response.data.status) {
            /* alert('Category edited Successfully!');*/
             $http({
                 method: 'GET',
                 url: '/categories',
             }).then(function(response) {
                 $rootScope.categories = response.data;
             });

             
            } else {
          /*   alert('Category editing Failed!');*/
            }
        });
    }

}])
app.controller('viewcategories', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.title = 'List of Categories';
   $scope.showcat=function(catId){
	   debugger;
    	$http({
    	        method: 'GET',
    	        url: '/category/'+catId,
    	    }).then(function(response) {
    	    	  	    	
    	        $rootScope.catname = angular.copy(response.data);
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
            url: '/admin/addCategory',
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

debugger;
    //get all fine rules from fines table
    $http({
        method: 'GET',
        url: '/viewfine',

    }).then(function(response) {
    	debugger;
        $rootScope.finesview = response.data;
    });
    $scope.editfine=function(id){
    	$http({
    	        method: 'GET',
    	        url: '/editfine/'+id,
    	    }).then(function(response) {
    	    	    	    	
    	        $rootScope.fine = response.data;
    	    
    })
    }
	 	

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


   /* $http({
        method: 'GET',
        url: '/viewfine',
    }).then(function(response) {
        $rootScope.fines = angular.copy(response.data);
    });

   */
	$scope.edit=function()
	{
		 $http({
	            method: 'POST',
	            url: '/admin/editf',
	            data: $rootScope.fine


	        }).then(function(response) {
	            if (response.data.status) {
	                
	             alert("edited successfully");
	             $http({
	                 method: 'GET',
	                 url: '/viewfine',

	             }).then(function(response) {
	             	debugger;
	                 $rootScope.finesview = response.data;
	             });
	             
	            } else {
	                alert("unsuccessfull");
	            }
	        });
	}

}])


//controller to issue a book
app.controller('issuebookctrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    $scope.state=[];
$http({
        method: 'GET',
        url: '/viewallbooks',
        
         
         
    }).then(function(response) {
        $rootScope.books = response.data;
    });
    /*
    fetchbytitle*/
    $scope.fetchbytitle = function() {

        // var status=$scope.state.title;
        $http({
            method: 'GET',
            url: '/searchbytitle/' + $scope.state.title,
            /*
             * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
             */
        }).then(function(response) {
        	
            $rootScope.book = response.data;
        });
    }
    /*
    fetchbytitle*/
    
   $rootScope.accountId={};
   $rootScope.bookdetail = {};
   $rootScope.bookdetail.quantity = {};
  $rootScope.bookdetail.quantity.accountId="";
 //   $rootScope.a="";
    $rootScope.change=function(accountId){
    	$scope.bookdetail.quantity.accountId=accountId;
    	
    }
    
   
   /* $scope.issue=function(){
   	 var MemberId = document.forms["issueform"]["memid"].value;
   	 if(MemberId=='/^[0-9]*$/')
    	{
    	alert("entered");
    	}
   	 else
   		 {
   		 alert("enter memberid to issue");
   		 }
   		 }*/
    $scope.get=function(query)
    {
    	
    	  
        $http({
            method: 'GET',
            url: '/getusername/'+query,
                  }).then(function(response) {
                	  
                	  
            $scope.s = response.data;
            
        });
    }
    $scope.issueBook = function() {
    	
    	//$rootScope.bookdetail.quantity.accountId=$rootScope.a;
        $http({
            method: 'POST',
            url: '/clerk/issue',
            data: $rootScope.bookdetail


        }).then(function(response) {
            if (response.data.status) {
                /*alert('issued Successfully!');
               */
              $scope.alertmsg=true;
                $location.url("/accesshistory");
               $rootScope.bookdetail = {};
                $rootScope.book = {};
            } else {
              /*  alert('issuing Failed!');*/
            }
        });
    }
}]);

/*//controller to search a member to access history
app.controller('accesshistoryctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $http({
        method: 'GET',
        url: '/bookdetails',

    }).then(function(response) {
        $rootScope.bookdetails = response.data;
    });

}])
*/
//controller to search a member to access history
app.controller('accesshistoryctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	 $scope.maxSize=5;
	    $scope.currentPage=0;

	    $scope.getAll=function(){
	        $scope.pageSize=6;
	          $http.post('/clerk/bookdetails?pc='+$scope.currentPage+'&ps='+$scope.pageSize)
	               .success(function(data){
	            	  
	                        $rootScope.allTaskCount=data.totalElements;
	                        $rootScope.bookdetails=data.content;
	                        
	                        $scope.bigTotalItems =data.totalElements;
	          })
	      
	    }
	    $scope.getAll();
	     $scope.setPage = function(currentpage) { 
	    $scope.currentPage=currentpage;

	    $scope.getAll();
	     }
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
        
      
        for( var i=0;i<=$rootScope.x.copies;i++){
        	var y=i;
       if( $rootScope.x.quantity[y].status=='Available')
    	  $scope.available=i;
       /*else
   	{
   	var blue=0;
   	$scope.available=blue;
   	}
  */
       }
        
    });
    
    $scope.addcopy=function(bookid)
    {
    	
    	$http({
    		method : 'POST',
    		url :'/admin/addcopy1/'+bookid,
    	}).then(function(response) {
    		$rootScope.x = response.data;
    		/*location.reload();*/
    		 $http({
    	            method: 'GET',
    	            url: '/book/' + $routeParams.bookid,
    	        }).then(function(response) {
    	            $rootScope.x = response.data;
    	        });

    	});
    	    }


    $scope.delete = function(quantity,index) {

    	if(quantity.status=="Available"){
        $http.delete('/admin/deletecopy/' + quantity.accountId)
            .success(function(data, status, headers) {
            	
            /*    alert("deleted successfully");*/
              
                $http({
                    method: 'GET',
                    url: '/book/' + $routeParams.bookid,
                }).then(function(response) {

                    $rootScope.x = response.data;
                    for( var i=0;i<=$rootScope.x.copies;i++){
                    	var y=i;
                   if( $rootScope.x.quantity[y].status=='Available')
                	  $scope.available=i;
                   /*else
               	{
               	var blue=0;
               	$scope.available=blue;
               	}
              */
                   }
                   
                });
            })
            .error(function(data, status, header, config) {
               /* alert("deleted failed");*/
            });
    	}
    	else{
    		/*alert("Can't be deleted because the status is Unavailable..")*/
    	}
    }
    
    //view categories for a book
    $http({
        method: 'GET',
        url: '/book/category/'+$routeParams.bookid,
       
    }).then(function(response) {
    
        $rootScope.catofbooks = response.data;
    });

}]);



app.controller('editbookctrl',['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
	$scope.title = 'Edit Book!';
	 $scope.EditBook= function() {
         $http({
         method: 'POST',
         url: '/admin/BookEditing',
         data: $rootScope.abcde
        
     }).then(function(response) {
    	 
             if (response.data.status) {
            	
          /*alert('book edited Successfully!');*/
          $http({
              method: 'GET',
              url: '/viewallbooks',
                        }).then(function(response) {
              $rootScope.books = response.data;
          });
          
         
         } else {
        	
         /* alert('book editing Failed!');*/
         }
     });
 }
}])

