	ons.ready(function() {
		gettemplates();
		ons.enableDeviceBackButtonHandler();
		loading("#cat");
		loading("#slide1");
		loading("#slide2");
		loading("#slide3");
		loading("#slide4");
homescreen();
showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
				//window.localStorage.setItem("key", "value");
					
	  var carousel = document.addEventListener('postchange', function(event) {
		//console.log('Changed to ' + event.activeIndex);
		
		
		if(event.activeIndex==3){
			loading("#listcart");
			loadcart();
		}
		if(event.activeIndex==2){
			loading(".listrow");
			loadlist(1,106,100)	
		}
		if(event.activeIndex==1){
			loading(".listrow");
			loadlist(0,"",100);
		}
		
	  });
	});
	
function homescreen(){
	
	var textu="";
	
	var settings1 = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/categories",
	  
	  "method": "GET",
	 
	};
	var settings2 = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/subcategories",
	  
	  "method": "POST",
	  
	};
	
	
	var settings3 = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"seokey":"treatment"
				},
				};
	
	
	$.ajax(settings1).done(function (response) {
		//console.log(response);
		window.localStorage.setItem("catdata",response);
									const obj = parsedata(response);
									var textu='';
									//console.log(obj);
									for (var i=0;i<obj.data.length;i++){
											   textu=textu+'<div class="swiper-slide" onclick="loadlist(1,'+obj.data[i]["id"]+')"> <img src="'+obj.data[i]["image"]+'" width="100%" alt="">';
											   //textu=textu+'<h5  style="position: absolute;bottom: 20%; text-align: center; background: rgba(0,0,0,.4);color: #fff;padding: 8px; left: 50%;transform: translateX(-50%);width: 80%;font-size: 14px;">'+obj.data[i]["name"]+'</h5>';
											   textu=textu+'</div>	   ';
	
	
	 
	  
	}
	//textu=textu+ '<div class="swiper-pagination"></div>';
	  //$("#carousel1").append(text);
	  $("#cat").html(textu);
	  var swiper = new Swiper('#category-container', {
            spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: 1,
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoHeight: false,
            nested: true,
        });
	});
	
	
	
	
	
	$.ajax(settings2).done(function (response) {
		slugsliders(response,"offer","image",1,"slide1","heading1","Our Special Products",false);
		slugsliders(response,"farm","image",1,"slide3","heading3","Our Farm Products",false);
									
	});
	$.ajax(settings3).done(function (response) {
		const obj = parsedata(response);
		sksliders(obj,30,"Treatment","image",3,"slide2","heading2","Our Packages",false);
		sksliders(obj,30,"Consultation","image",3,"slide4","heading4","Consultation",false);							
	});
	}
	function login(obj) {
	 var mobile = $("#username").val();
	var password = $("#password").val();
	var settings = {
			  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/login",
			  
			  "method": "POST",
			  "data": {
				"mobile" : mobile,
				"password" : password
			  },
		};
	
		$.ajax(settings).done(function (response) {
										const obj = parsedata(response);
										if(obj["response"]=="success"){
											homescreen();
											popup(obj["message"]);
											window.localStorage.setItem("mobile",mobile);
											window.localStorage.setItem("password",password);
											window.localStorage.setItem("logged","true");
											
											changepage("tabbar.html",2);
											}
											else{popup(obj["message"]);}
											}).fail(function(){
			popup("Invalid username or password");
			});
		
	}// JavaScript Document
	function changepage(page,type){
		const navigator = document.querySelector('#appNavigator');
		if(type==1){
		navigator.pushPage(page, {data: {title: 'home'}});
		}else if (type==2){
		navigator.resetToPage(page);
		}
	}
	function loadprod(inp,change=1){
		loading("#proddet");
			var prodid=inp.getAttribute("prodid");
								if(change==1){
											changepage("prod.html",1);
											}		
						var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
  "method": "POST",
  "data": {
	  "productid":prodid
  },
};					
$.ajax(settings).done(function (response) {
								const obj = parsedata(response);
								//console.log(obj);
								for (var i=0;i<obj.data.length;i++){
									if(obj.data[i]["id"]==prodid.toString()){
									var images = obj.data[i]["product_gallery"].split(",");
									var imgtext="";
									if(images.length>1){
										for(var j=0;j<images.length;j++){
										imgtext=imgtext+'<div class="swiper-slide"><img src="'+images[j]+'" width="100%" alt=""></div>';
										}
									}else{
										imgtext=imgtext+'<div class="swiper-slide"><img width="100%" src="'+obj.data[i]["product_media"]+'" alt="product1"></div>';
										}
						var text2=window.localStorage.getItem("prodes");
						text2 = text2.replaceAll("[[pid]]",obj.data[i]["id"]);
						text2 = text2.replaceAll("[[galslides]]",imgtext);
	   text2 = text2.replace("[[name]]",obj.data[i]["product_name"]);
	   text2 = text2.replace("[[desc]]",obj.data[i]["product_description"]);
		 text2 = text2.replace("[[sp]]",obj.data[i]["sale_price"]);
		 text2 = text2.replace("[[rp]]",obj.data[i]["regular_price"]);
		 text2 = text2.replace("[[rat]]",obj.data[i]["rating"]);
		  text2 = text2.replace("[[ts]]",Math.floor(100-(parseInt(obj.data[i]["sale_price"])*100/parseInt(obj.data[i]["regular_price"]))));
		  text2 = text2.replace("[[rat]]",obj.data[i]["rating"]);
		  if(Number.isInteger(parseInt(obj.data[i]["product_brand"]))){
		  text2=text2.replaceAll("[[bs]]",'<ons-button onclick=brandstore('+obj.data[i]["product_brand"]+') > Brand Store</ons-button>')
		  }else{
			 text2=text2.replaceAll("[[bs]]",'');
			 }
$("#proddet").html(text2);
	galleryswiper();
	if(Number.isInteger(parseInt(obj.data[i]["product_brand"]))){		
			try{	
										
										var settings3 = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"brand":obj.data[i]["product_brand"]
				},
				};
	$.ajax(settings3).done(function (response2) {
		//console.log(response2);
		const obj = parsedata(response2);
	
		if(obj.data.length>1){
				sksliders(obj,30,"","product_media",2,"relatedp","relatedpheading","Related Products",true,2)
		}		
	});
	}catch{
										console.log("no related products");
									}	
				}		
				if(Number.isInteger(parseInt(obj.data[i]["product_category"]))){			
									try{	
										
										var settings3 = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"category":obj.data[i]["product_category"]
				},
				};
	$.ajax(settings3).done(function (response2) {
		const obj2 = parsedata(response2);
		if(obj2.data.length>1){
	
										sksliders(obj2,30,"","product_media",2,"similarp","similarpheading","Similar Products",true,2)
		}								
	});
									}catch{
										console.log("no similar products");
									}	
				}
									try{	
										var keys=obj.data[i]["seo_key"].split(',');
										var settings3 = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"seokey":keys[0]
				},
				};
	$.ajax(settings3).done(function (response2) {
		const obj = parsedata(response2);
	
		if(obj.data.length>1){
										sksliders(obj,30,keys[0],"product_media",2,"fbt","fbtheading","Frequently Bought Together",true,2)
		}						
	});
									}catch{
										console.log("no FTB products");
									}								
										}
									}
								});					
productwiseattribute(prodid);								
								
								
													}
		function sendotp(){
			popup("OTP has been sent to your email and/or Mobile");
				changepage('reset.html',2);
			}
function listsubcategories(cat){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/subcategories",
  
  "method": "POST",
  "data": {
	  "category":cat
  },
};
$.ajax(settings).done(function (response) {
  const obj = parsedata(response);
									var text='<ons-list>';
										for (var i=0;i<obj.data.length;i++){
											  text=text+'<ons-list-item><a onclick="loadlist(1,'+obj.data[i]["id"]+')"  >'+obj.data[i]["name"]+'</a></ons-list-item>';
	}
	text=text+ '</ons-list>';
	changepage('subcategory.html',1);
	  setTimeout(() => {  document.getElementById("listsubcateg").innerHTML=text; }, 20);
});
}
	function categories(){
	var settings = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/categories",
	  "method": "GET",
	  "data": {
	  },
	};
	$.ajax(settings).done(function (response) {
									const obj = parsedata(response);
									var text='';
										for (var i=0;i<obj.data.length;i++){
											  text=text+'<ons-carousel-item><img onclick="loadlist(1,'+obj.data[i]["id"]+')" width="100%" src="'+obj.data[i]["image"]+'"/></ons-carousel-item>';
	}
	text=text+ '</ons-carousel>';
	  $("#carousel").append(text);
	});
	}
	function categorylist(){
	var settings = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/categories",
	  "method": "GET",
	  "data": {
	  },
	};
	$.ajax(settings).done(function (response) {
									const obj = parsedata(response);
									var text='<ons-list>';
										for (var i=0;i<obj.data.length;i++){
											  text=text+'<ons-list-item><a onclick="listsubcategories('+obj.data[i]["id"]+')"  >'+obj.data[i]["name"]+'</a></ons-list-item>';
	}
	text=text+ '</ons-list>';
	changepage('category.html',1);
	  setTimeout(() => {  document.getElementById("listcateg").innerHTML=text; }, 20);
	});
	}
	function register()
{
        var settings = {
          "url": "https://thadathilfarmresort.com/shoppingcat/public/api/register",
          "method": "POST",
          "data": {
            "first_name" : $("#rfname").val(),
            "last_name"  : $("#rlname").val(),
            "email"      : $("#remail").val(),
            "password"   : $("#rpassword").val(),
            "mobile"     : $("#rmobile").val()
          },
        };
        $.ajax(settings).done(function (response) {
		  const obj = parsedata(response);
										if(obj["response"]=="success"){
											popup(obj["message"]);
											window.localStorage.setItem("mobile",$("#rmobile").val());
											window.localStorage.setItem("password",$("#rpassword").val());
											window.localStorage.setItem("logged","true");
											
											loading("#cat");
		loading("#slide1");
		loading("#slide2");
		loading("#slide3");
		loading("#slide4");
		homescreen();
											changepage("tabbar.html",2);
											}
											else{
												popup(obj["message"]);
												}
        });
}
	function product(){
	var settings = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/product",
	  "method": "GET",
	  "data": {
	  },
	};
	$.ajax(settings).done(function (response) {
	});
	}
	function brand(){
	var settings = {
	  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/brand",
	  "method": "GET",
	  "data": {
		  "category_id":2
	  },
	};
	$.ajax(settings).done(function (response) {
		const obj =parsedata(response);
	changepage("list.html",1);
	var text="";
       for (var i=0;i<obj.data.length;i++){
		text= text + '<ons-col brandid='+obj.data[i]["id"]+' onclick="loadbrandprods(this)" width="150px" style="padding:5px;border:solid 1px #E3E0DD ; height:250px; margin-left :auto;margin-right :auto;margin-top :5px;font-family: "Times New Roman", Times, serif;"><div style="height:100%;width:100%;position:relative;bottom:0px;background:url('+"'"+obj.data[i]["image"]+"'"+'); background-repeat: no-repeat;background-size: 100% 100%;" ><div style = "background-color:#ffffff; opacity:70%; width:100%; height:25%; position:relative;  top:75%; left:0px;  z-index:100;">'+obj.data[i]["name"]+'</strong></div></div></ons-col> ';			 
	  }
	setTimeout(() => {  document.getElementsByClassName("listrow").innerHTML=text; }, 2);
	});
	}
	function logger(data){
		console.log(data);
		}
	var prev = function() {
	  var carousel = document.getElementById('carousel');
	  carousel.prev();
	};
	var next = function() {
	  var carousel = document.getElementById('carousel');
	  carousel.next();
	};
	function loadlist(type,value,flag=0){
		 window.localStorage.setItem("type",type);
	 window.localStorage.setItem("flag",flag);
	 window.localStorage.setItem("value",value);
	var view=window.localStorage.getItem("view");
	if(type==0){//all products
			var settings = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {},
				};
			}
		else if(type==1){ //category
			var settings = {
			"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
			"method": "POST",
			"data": {
				"category":value
				},
			};
			}else if(type==2)//search
			{
				FirebaseAnalytics.Param.SEARCH_TERM (value)
				var settings = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"key":value
				},
				};
			}
	else if(type==3)//seokey
			{
				var settings = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"seokey":value
				},
				};
			}
			loading(".listrow");
			const navigator = document.querySelector('#appNavigator');
	if(flag!=100){
		navigator.pushPage("list.html", {data: {title: 'Search'}});
	}
$.ajax(settings).done(function (response) {
	 window.localStorage.setItem("sdata",response);
	// logger(response);
	listaction();
});
		}
		function toggleview(){
			var view = window.localStorage.getItem("view");
			window.localStorage.setItem("flag","100");
			if(view=="grid"){window.localStorage.setItem("view","list");$("#viewicon").removeClass("fa fa-list"); $("#viewicon").addClass("fa fa-th");}
			if(view=="list"){window.localStorage.setItem("view","grid");$("#viewicon").removeClass("fa fa-th"); $("#viewicon").addClass("fa fa-list");}
			listaction();
		}
		function refreshview(){
			var view=window.localStorage.getItem("view");
			if(view=="grid"){$(".list1row").css("display","none");$(".list2row").css("display",""); }
			if(view=="list"){$(".list2row").css("display","none");$(".list1row").css("display","");}
			}
	function forgotpassword(){
var mobile=$("#fmobile").val();var email=$("#femail").val();
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/forgotpassword",
  "method": "POST",
  "data": {
    "mobile":mobile,
    "email":email,
  },
};
$.ajax(settings).done(function (response) {
								const obj = parsedata(response);
  if(obj["response"]=="Successfully"){
	  popup(obj["message"]);
	  changepage('reset.html',2);
	  }
});
}
		function addtocart(productid){
			
			 
			 
			if(!loadcart()){
				return false;
			}
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/addtocart",
  "method": "POST",
  "data": {
    "product_id":productid,
    "qty":1,
    "mobile" :window.localStorage.getItem("mobile"),
    "password":window.localStorage.getItem("password")
  },
};
$.ajax(settings).done(function (response) {
  showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
  vibrate(400);
  popup("Product added to cart ");
});
}
function product(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/product",
  "method": "GET",
  "data": {
    "category":"36"
  },
};
$.ajax(settings).done(function (response) {
});
}
function updatepassword(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/updatepassword",
  "method": "POST",
  "data": {
    "otp":otp,
    "password":password,
    "confirmpassword" : confirmpassword
  },
};
$.ajax(settings).done(function (response) {
 });
}
function showcart(mobile,password)
{
    var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/showcart",
		  "method": "POST",
		  "data": {
		    "mobile" : mobile,
		    "password" : password,
		  },
	};
	$.ajax(settings).done(function (response) {
	  	const obj = parsedata(response);
		var cartdesign=window.localStorage.getItem("cartdesign");
		var textu=""
		var atotal=0;
		var dtotal=0;
		var stotal=0;
		var totalshipping=0;
		var n=obj.data.length;
		
		var cl = document.querySelector('#cartlogo');
		cl.setAttribute("badge",n);
		if(n>0){window.localStorage.setItem("cri",obj.data[0]["cart_ref_id"]);
		
		
		document.querySelector("#checkoutbtn").removeAttribute("disabled")
		for(var i=0;i<n;i++){
			cartdesign2=cartdesign;
			cartdesign2=cartdesign2.replaceAll("[[pid]]",obj.data[i]["product_id"]);
			cartdesign2=cartdesign2.replace("[[img]]",obj.data[i]["product_image"]);
			cartdesign2=cartdesign2.replace("[[pn]]",obj.data[i]["product_name"]);
			cartdesign2=cartdesign2.replace("[[sp]]",obj.data[i]["sale_price"]);
			cartdesign2=cartdesign2.replaceAll("[[cid]]",obj.data[i]["cart_id"]);
			cartdesign2=cartdesign2.replace("[[qty]]",qtyoption(obj.data[i]["minqty"],obj.data[i]["maxqty"],obj.data[i]["qty"]));
			cartdesign2=cartdesign2.replace("[[dd]]","");
			cartdesign2=cartdesign2.replace("[[dc]]","");
			textu=textu+cartdesign2;
			var atotal=atotal+parseFloat(obj.data[i]["qty"])*parseFloat(obj.data[i]["sale_price"]);//add regular price
			var dtotal=dtotal+parseFloat(obj.data[i]["qty"])*parseFloat(obj.data[i]["sale_price"]);
			var stotal=stotal+0;  //add shipping charge
			}
		}
				totalsaving=atotal-dtotal;
				totalpayable=dtotal+stotal //discounted total+shipping
			var textu=textu+'<div class="sub-total" style="width: 95%; background: #fff;margin: 0 auto; border-radius: 6px;padding: 10px; box-sizing: border-box;"><p>Sub Total <span style=" float: right;">'+atotal+'</span></p><p>Shipping charge <span style=" float: right;">'+totalshipping+'</span></p><p>Total saving <span style=" float: right;">'+totalsaving+'</span></p><p><strong>Total Payble <span style=" float: right;">'+totalpayable+'</span></strong></p> </div>';
			
			$("#cart #listcart").html(textu);
	});
	}
function paymentdetails()
{
    var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/paymentdetails",
  "method": "GET",
  "data": {
  },
};
$.ajax(settings).done(function (response) {
  });
}
function buynow(){
	PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
}
function loadcart(){
	loading("#cart #listcart");
		if(window.localStorage.getItem("logged")!="true"){
	  	changepage('login.html',1);	
		return false;
		}
	showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
	return true;
	}
function attribute(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/attribute",
  "method": "GET",
  "data": {
   },
};
$.ajax(settings).done(function (response) {
  });
}
function terms(attributeid){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/terms",
  "method": "POST",
  "data": {
    "attribute_id":attributeid,
  },
};
$.ajax(settings).done(function (response) {
 });
}
function loadbrandprods(inp){
var brandid=inp.getAttribute("brandid");	
	loadlist(3,brandid);
}
function galleryswiper (){
	  var detail = new Swiper('.swiper-detail', {
      spaceBetween: 30,
      slidesPerView: 1,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      autoHeight: false,
  });
}
function profile()
{
    changepage("profile.html",1)
     var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/profile",
		  "method": "POST",
		  "data": {
		    "mobile" : window.localStorage.getItem("mobile"),
		    "password" : window.localStorage.getItem("password"),
		  },
	};
		$.ajax(settings).done(function (response) {
		var obj = parsedata(response);
	  $("#profile_fn").val(obj.data["firstName"]);
	  $("#profile_ln").val(obj.data["LastName"]);
	  $("#profile_sa").val(obj.data["shipping_address"]);
	  $("#profile_ba").val(obj.data["billing_address"]);
		});
}
///update profile data
function updateprofile()
{
	 var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/updateprofile",
		  "method": "POST",
		  "data": {
		    "mobile" : window.localStorage.getItem("mobile"),
		    "password" : window.localStorage.getItem("password"),
		    "firstName" : $("#profile_fn").val(),
		    "lastName" : $("#profile_ln").val(),
		    "email" : "jayeshmon.lbs@gmail.com",
		   "phone" : window.localStorage.getItem("mobile"),
		    "shipping_address" : $("#profile_sa").val(),
		    "billing_address": $("#profile_ba").val()
		  },
	};
	$.ajax(settings).done(function (response) {
	});
}
function deletecart(cartid){
	vibrate(400);
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/deletecart",
  "method": "POST",
  "data": {
    "cart_id":cartid,
  },
};
$.ajax(settings).done(function (response) {
   popup("Item deleted");
});
showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
}
function setting(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/setting",
  "method": "GET",
  "data": {
  },
};
$.ajax(settings).done(function (response) {
  logger(response);
});
}
function icon(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/icon",
  "method": "GET",
  "data": {
  },
};
$.ajax(settings).done(function (response) {
});
}
function cod(){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/cod",
  "method": "GET",
  "data": {
  },
};
$.ajax(settings).done(function (response) {
	
});
}
function addorder(cart_ref_id,mobile,pass,orderdate,billing_address,shipping_address,paymentmethod,paymentstatus,orderstatus,delivery_status){

var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/addorder",
  "method": "POST",
  "data": {
    "cart_ref_id":cart_ref_id,
    "mobile":mobile,
    "password":pass,
    "order_date":orderdate,
    "billing_address":billing_address,
    "shipping_address":shipping_address,
    "payment_method":paymentmethod,
    "payment_status":paymentstatus,
    "order_status":orderstatus,
    "delivery_status":delivery_status
  },
};
$.ajax(settings).done(function (response) {
  const obj=parsedata(response);
  if(obj.response=="success"){
	  document.querySelector("#checkoutbtn").setAttribute("disabled","true");
	  document.querySelector("#codbtn").setAttribute("disabled","true");
	  try{
	  deletewholecart(window.localStorage.getItem("cri"));
	  popup(obj.message);
	  
	  homescreen();
	  }
	  catch{
		  popup("Error");
	  }
  }
 
});
}
function getorderdata()
{
   var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/orderdata",
  "method": "POST",
  "data": {
        "mobile" : window.localStorage.getItem("mobile"),
        "password" : window.localStorage.getItem("password")
  },
};
$.ajax(settings).done(function (response) {
  const obj=parsedata(response);
  console.log(obj);
  var te='';
  var orderid="";
   te= te+' <ons-list-item expandable class=filterbrandtitle id="filterbrandtitle"><div class="expandable-content">';
		
  for(var i=0;i<obj.data.length;i++){
	console.log(obj.data[i]);
		if(orderid=="" || obj.data[i]["order_id"]!=orderid){
			te=te+' </div></ons-list-item>';
			 te= te+' <ons-list-item expandable class=filterbrandtitle id="filterbrandtitle">'+obj.data[i]["order_id"]+'<div class="expandable-content">';
			  orderid=obj.data[i]["order_id"];
		  } 
	   te= te+'<details style="float: left; width:100%; margin: 5px 2.5% 20px; padding: 10px 12px;box-sizing: border-box;border-radius: 6px; width: 95%;border:solid 1px #000">';
	    
		te=te+' <summary style="outline: 0;border : solid 1px #fff">'+obj.data[i]["productname"]+'Qty: ('+obj.data[i]["qty"]+'Nos)</summary>';
           te=te+'<div class="faq__content" style="border solid 1px #ccc">';
            te=te+' <p><h4>Rate Product</h4></p><textarea class="textarea inputs" id="review" rows="3" placeholder="Review"></textarea><img src="./img/rat.png" width="15%" /><img src="./img/rat.png" width="15%" /><img src="./img/rat.png" width="15%" /><img src="./img/rat.png" width="15%" /><img src="./img/rat.png" width="15%" /></p>';
          te=te+' </div>';
 	  te=te+'</details>';
	  if(orderid=="" || obj.data[i]["order_id"]!=orderid){
			  
			   te=te+' </div></ons-list-item>';
			   te= te+' <ons-list-item expandable class=filterbrandtitle id="filterbrandtitle">'+obj.data[i]["order_id"]+'<div class="expandable-content">';
		 
		  }
	 	 
 }
 te=te+' </div></ons-list-item>';
    $("#myord").html(te);
});
}
function deletewholecart(){
	vibrate(1000);
	popup("Cart Cleared");
	try{
	var cri=window.localStorage.getItem("cri");
	}catch{
		cri="";
	}
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/deletecartwhole",
  "method": "POST",
  "data": {
    "cart_ref_id":cri
  },
};
$.ajax(settings).done(function (response) {
  showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
});
}
function qtyoption(minqty,maxqty,qty){
	var textu=""
	for (var i=minqty;i<=maxqty;i++){
		if(i==qty){
			textu=textu+' <option selected="selected" value="'+i+'"> '+i+'</option>';
		}else{
		textu=textu+' <option value="'+i+'"> '+i+'</option>';
		}
	}
	return textu;
}
function recalculate(obj){
var cartid=obj.getAttribute("cartid");
var qty=obj.value;
updatecart(cartid,qty);
}
function updatecart(cartid,quantity){
	popup("Cart Updated");
	vibrate(400);
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/updatecart",
  "method": "POST",
  "data": {
    "cart_id":cartid,
    "qty":quantity
  },
};
$.ajax(settings).done(function (response) {
 showcart(window.localStorage.getItem("mobile"),window.localStorage.getItem("password"));
 popup("Item updated");
});
}
function gettemplates(){
	var newcartdesign='<ons-row class="addcard-list" style="align-items: center;      background: #fff;      padding: 5px;      border-bottom: 1px solid #ddd;      width: 95%;      margin: 10px auto;      border-radius: 6px;">        <ons-col style="flex: 0 0 50%;      max-width: 50%;      text-align: center;      padding: 6px 0 15px;"><b onclick="loadprod(this)" prodid="[[pid]]">[[pn]]</b></ons-col>        <ons-col style="flex: 0 0 50%;      max-width: 50%;      text-align: center;      padding: 6px 0 15px;"><b>[[sp]]</b></ons-col>        <div class="delivred" style="  text-align: center;           width: 65%;           display: flex;           justify-content: center;           align-items: center;           padding: 10px 11px;"><img onclick="loadprod(this)" prodid="[[pid]]" width="30px" height="30px" src="img/delivery.png" style="margin-right: 5px;"> [[dd]] | <span style="  color:#549c2f;; margin-left: 5px;">Free</span></div>        <div class="cart-img"><img width="50px" height="50px" src="[[img]]"></div>        <ons-col style="flex: 0 0 50%;      max-width: 50%;      text-align: center;      padding: 6px 0 15px;">           <span style="padding-right: 5px;">Qty</span>            <select cartid="[[cid]]" onchange = "recalculate(this)"style="background:#f5f5f5">              [[qty]]           </select>        </ons-col>        <ons-col style="flex: 0 0 50%;      max-width: 50%;      text-align: center;      padding: 6px 0 15px;">           <span> <i class="fa fa-bookmark-o"></i></span>           <span  style="padding-left:8px"> <i onclick="deletecart([[cid]])" class="fa fa-trash-o"></i></span>        </ons-col>     </ons-row>';
	var cartdesign = window.localStorage.getItem("cartdesign");
		if(newcartdesign!=cartdesign){
				window.localStorage.setItem("cartdesign",newcartdesign);
		}
		var newproddesign=' <div class=" swiper-detail" >        <div class="swiper-wrapper">           [[galslides]]        </div>        <!-- Add Pagination -->            </div>     <div class="container" style="padding: 10px 15px;">        <h2 style="margin:5px 0">[[name]] <span style="text-align: right;display: inline-block;float: right;">[[sp]]</span></h2>        <p style="margin:0; float: left;width:70%">[[desc]]</p>        <span style="text-align: right;display: inline-block;float: right;text-decoration:line-through;width:30%">[[rp]]</span>        <p style="float: left;width:100%;margin:5px 0 0;">Total Saving <span style="color:#549c2f;;font-weight:500"> [[ts]]</span></p>        <p style="float: left;width:100%;margin:5px 0 0;"><span class="rating">[[rat]]&nbsp;<i style="font-size:15px;">*</i></span></p>        <p style="text-align: left;padding-right: 10px;float: left;width: 100%;"><i onclick="addtowishlist([[pid]])" style="padding-right: 5px;font-size: 18px;" class="fa fa-bookmark-o"></i> Add to WishList</p>        <div class="size" style="   float: left;width: 100%;">           <div class="delivred" style="  display: flex;align-items: center;">Delivered on <img width="30px" height="30px" style="margin:5px 10px"src="img/delivery.png"/> 27 Nov. 2020 | <span style="   color: #549c2f;              margin-left: 5px;">[[dc]]</span></div>                             </div>    <div id="mods"></div>    <details style="float: left; width:100%; margin: 5px 2.5% 20px; background: #fff;padding: 10px 12px;box-sizing: border-box;border-radius: 6px; width: 95%;">           <summary style="outline: 0;">Product specification</summary>           <div class="faq__content">              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor suscipit, iure tenetur eveniet, vero tempore delectus? Perferendis, quisquam ullam consequuntur?</p>           </div>        </details>        <!-- <ons-input type="number" id="qty" placeholder="Qty" min="[[MQ]]" max="[[MAXQ]]"></ons-input> -->        <p><ons-button class="btncart" onclick="addtocart([[pid]])" style="width:95%;margin:5px auto;border-radius: 6px;text-align: center;display: block;background: #111;"  >Add TO Cart</ons-button></p>        <p>           <ons-button class="btnbuy"  onclick="buynow([[pid]])" style="width:95%;margin:5px auto;border-radius: 6px;  background: #549c2f;text-align: center;display: block;" >Buy Now</ons-button>        </p>     </div>';
		newproddesign=newproddesign+'<h3  style="padding: 0 10px;"  id="relatedpheading"></h3><div class="swiper-container" id="relatedp-container"><div class="swiper-wrapper" id="relatedp"></div></div>  [[bs]]  ';		
		newproddesign=newproddesign+'<h3  style="padding: 0 10px;"  id="similarpheading"></h3><div class="swiper-container" id="similarp-container"><div class="swiper-wrapper" id="similarp"></div></div>     ';		
		newproddesign=newproddesign+'<h3  style="padding: 0 10px;"  id="fbtheading"></h3><div class="swiper-container" id="fbt-container"><div class="swiper-wrapper" id="fbt"></div></div>     ';		
		var proddesign = window.localStorage.getItem("prodes");
		if(newproddesign!=proddesign){
					window.localStorage.setItem("prodes",newproddesign);
		}
		var newgriddesign='<ons-col style="    flex: 0 0 49%;max-width: 49%;background: #fff;padding:5px;border:solid 1px #E3E0DD ;position: relative; margin-left :1px;margin-right :1px;margin-top:5px;">        <div onclick="loadprod(this)" prodid="[[pid]]" style="height:100%;width:100%;   height: 160px;background:url([[img]]); background-repeat: no-repeat;background-size: 100% 100%;"></div>        <div class="share" style="position: absolute;left: 10px;top:168px"><i class="fa fa-share-alt"></i></div>        <div class="product-des" style="background-color:#ffffff; padding:5px;    box-sizing: border-box; width:100%; height:25%;  z-index:100;">           <p style="text-align: right;margin: 0;"><i class="fa fa-bookmark-o"></i></p>           <strong onclick="loadprod(this)" prodid="[[pid]]" style="width:100%;font-size:18px;margin-bottom:4px;margin-top:10px;display:block;overflow-wrap: break-word;">[[name]]</strong>           <p style="margin:4px 0"> [[desc]]</p>           <p>  <span style="background: #f7dd3f;display: inline-block;    padding: 5px 8px;    color: #fff;    margin: 5px 0; border-radius: 8px;">[[rat]]&nbsp;<i style="font-size:15px;">*</i></span><br><b style="color:#549c2f;">[[sp]]</b><span style="margin-left:10px;color:#777;font-size:13px;text-decoration:line-through;">[[rp]]</span>              <button style="background: #573b19;    color: #fff;    padding: 8px 12px;    margin: 10px 0;    border: 0;    border-radius: 20px;" onclick="addtocart([[pid]])"><i class="fa fa-shopping-cart" style="margin-right: 5px;" ></i>Add to cart</button>        </p></div>        <div class="ribon" style=" position: absolute;   background: #549c2f;color: #fff; padding: 5px;font-size: 10px;border-radius: 0px 12px;left: 2px; top: 10px;opacity: .9;">[[off]]</div>        </ons-col>';				
var griddesign = window.localStorage.getItem("griddesign");
if(newgriddesign!=griddesign){
				window.localStorage.setItem("griddesign",newgriddesign);
		}
	var newlistdesign='<ons-col  style="width:95%;border: 1px solid rgb(227, 224, 221); margin-left: 2px; margin-right: 2px; margin-top: 10px; display: flex; background: rgb(255, 255, 255); position: relative;  border-radius: 6px; flex: 0 0 100%;" times="" new="" roman",="" times,="" serif;"="">                <div class="img-sec" style="width: 40%; text-align: center;" >                   <div ><img prodid="[[pid]]" onclick="loadprod(this)"  src="[[img]]" class="prodct-img" style="max-width: 100%;        height: 145px;" ></div>                </div>                <div class="product-des"  style="background-color:#ffffff; padding:5px; position: relative;   box-sizing: border-box; width:60%;   z-index:100;">                   <p style="position: absolute;right: 10px;top:5px;margin: 0;"><i class="fa fa-bookmark-o"></i></p>                   <strong prodid="[[pid]]" onclick="loadprod(this)"  style="width:100%;font-size:18px;margin-bottom:4px;display:block;padding-right: 50px;">[[name]]</strong>                   <p  style="margin:3px 0"> [[desc]]</p>                   <span style=" background: #f7dd3f; display: inline-block;            padding: 5px 8px;            color: #fff;            margin: 5px 0;            border-radius: 8px" >[[rat]]&nbsp;<i style="font-size:15px;">*</i></span>                   <div><b style="color:#549c2f;">[[sp]]</b><span style="margin-left:10px;font-size:13px;color:#777;text-decoration:line-through;">[[rp]]</span></div>                   <button style="  background: #573b19;color: #fff;            padding: 8px 12px;            margin: 10px 0;            border: 0;            border-radius: 20px;" value="[[pid]]" onclick="addtocart(this.value)" ></i>Add to cart</button>                </div>                <div class="ribon" style=" position: absolute;   background: #549c2f;color: #fff; padding: 5px;font-size: 10px;border-radius: 0px 12px;left: 2px; top: 10px;opacity: .9;">[[off]]</div>                <div class="share" style="position: absolute;left: 10px;bottom: 20px;"><i class="fa fa-share-alt"></i></div>                </ons-col>';
	var listdesign = window.localStorage.getItem("listdesign");
	if(newlistdesign!=listdesign){
				window.localStorage.setItem("listdesign",newlistdesign);
		}
	window.localStorage.setItem("view","grid");
}
function listaction(){
	var response=window.localStorage.getItem("sdata");
	var type=window.localStorage.getItem("type");
	var flag=window.localStorage.getItem("flag");
	var view=window.localStorage.getItem("view");
var obj = parsedata(response);
	obj=sortdata(obj);
	
	var text2="";
	  var text3="";   
 var list=window.localStorage.getItem("listdesign");
var grid=window.localStorage.getItem("griddesign");	
	for (var i=0;i<obj.data.length;i++){ 
var gridtext=grid;
	  gridtext = gridtext.replaceAll("[[pid]]",obj.data[i]["id"]);
	   gridtext = gridtext.replace("[[name]]",obj.data[i]["product_name"]);
	    gridtext = gridtext.replace("[[img]]","'"+obj.data[i]["product_media"]+"'");
		 gridtext = gridtext.replace("[[sp]]",obj.data[i]["sale_price"]);
		 gridtext = gridtext.replace("[[rp]]",obj.data[i]["regular_price"]);
		 //gridtext = gridtext.replace("[[desc]]",obj.data[i]["product_description"].substring(0,50));
		 gridtext = gridtext.replace("[[desc]]",obj.data[i]["product_description"]);
		 gridtext = gridtext.replace("[[rat]]",obj.data[i]["rating"]);
		 var off=Math.floor(100-(parseInt(obj.data[i]["sale_price"])*100/parseInt(obj.data[i]["regular_price"])));
		  var offt="";
		 if(isNaN(off)){
			 offt="SALE";
			 
			 }
		else 
		{
			offt=off+'% Off';
			 if(off==0){
				 offt="Featured";
			 }
		}
		  gridtext = gridtext.replace("[[off]]",offt);
	  text2=text2+gridtext;
	  var listtext=list;
	  listtext = listtext.replaceAll("[[pid]]",obj.data[i]["id"]);
	   listtext = listtext.replace("[[name]]",obj.data[i]["product_name"]);
	    listtext = listtext.replace("[[img]]",obj.data[i]["product_media"]);
		 listtext = listtext.replace("[[sp]]",obj.data[i]["sale_price"]);
		 listtext = listtext.replace("[[rp]]",obj.data[i]["regular_price"]);
		  //listtext = listtext.replace("[[desc]]",obj.data[i]["product_description"].substring(0,50));
		  listtext = listtext.replace("[[desc]]",obj.data[i]["product_description"]);
		 listtext = listtext.replace("[[rat]]","0.0");
		 var off=Math.floor(100-(parseInt(obj.data[i]["sale_price"])*100/parseInt(obj.data[i]["regular_price"])));
		  var offt="";
		 if(isNaN(off)){
			 offt="SALE";
			 }
		else 
		{
			offt=off+'% Off';
			 if(off==0){
				 offt="Featured";
			 }
		}
		  listtext = listtext.replace("[[off]]",offt);
		  text3=text3+listtext;
	}
	 if(type==0){
				if(view=="list"){setTimeout(() => { $(".listrow").html(text3);}, 2);$("#viewicon").removeClass("fa fa-list"); $("#viewicon").addClass("fa fa-th");}else if(view=="grid"){setTimeout(() => { $(".listrow").html(text2);$("#viewicon").removeClass("fa fa-th"); $("#viewicon").addClass("fa fa-list");}, 2);}
				}
			else{
			if(view=="list"){setTimeout(() => { $(".listrow").html(text3);}, 2);$("#viewicon").removeClass("fa fa-list"); $("#viewicon").addClass("fa fa-th");}else if(view=="grid"){setTimeout(() => { $(".listrow").html(text2);$("#viewicon").removeClass("fa fa-th"); $("#viewicon").addClass("fa fa-list");}, 2);}
			}
}
function changesort(obj){
	window.localStorage.setItem("sort",obj.value);
	listaction();
}
function sortdata(json){
	var type=window.localStorage.getItem("sort");
	if(type==1){
	json.data.sort(function(a, b){
    return a.sale_price - b.sale_price;
	});
	}
	else if(type==2){
		json.data.sort(function(a, b){
    return b.sale_price - a.sale_price;
	});
	}
	else if(type==3){
		json.data.sort(function(a, b){
			var off1=Math.floor(100-(parseInt(a.sale_price)*100/parseInt(a.regular_price)));
			var off2=Math.floor(100-(parseInt(b.sale_price)*100/parseInt(b.regular_price)));
    return off1-off2
	});
	}
	else if(type==4){
		json.data.sort(function(a, b){
			var off1=Math.floor(100-(parseInt(a.sale_price)*100/parseInt(a.regular_price)));
			var off2=Math.floor(100-(parseInt(b.sale_price)*100/parseInt(b.regular_price)));
    return off2-off1;
	});
	}else if(type==5){
		json.data.sort(function(a, b){
    return a.product_category - b.product_category;
	});
	}
	else if(type==6){
		json.data.sort(function(a, b){
    return b.product_category - a.product_category;
	});
	}
return json;
}function loading(page){
	
	setTimeout(() => {$(page).html('<img src="img/loading.gif" style="margin-top:0px;margin-left:0px;width:100%"/>');}, 2);
}
function welcometext(){
}
function signout(){
	window.localStorage.setItem("mobile","");
	window.localStorage.setItem("password","");
	window.localStorage.setItem("logged","false");
changepage("login.html",1)	
}
function popup(msg){
	ons.notification.toast(msg, { timeout: 1000, animation: 'fall' });
}
function vibrate(time){
	navigator.vibrate(time);
}
function checkout(){
	changepage("checkout.html",1);
	var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/profile",
		  "method": "POST",
		  "data": {
		    "mobile" : window.localStorage.getItem("mobile"),
		    "password" : window.localStorage.getItem("password"),
		  },
	};
	$.ajax(settings).done(function (response) {
		
		var obj = parsedata(response);
	  $("#cprofile_fn").val(obj.data["firstName"]);
	  $("#cprofile_ln").val(obj.data["LastName"]);
	  $("#cprofile_sa").val(obj.data["shipping_address"]);
	  $("#cprofile_ba").val(obj.data["billing_address"]);
	  
	});
	getcartdetails();
}
function getcartdetails(){
    var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/showcart",
		  "method": "POST",
		  "data": {
		    "mobile" : window.localStorage.getItem("mobile"),
		    "password" : window.localStorage.getItem("password"),
		  },
	};
	$.ajax(settings).done(function (response) {
	
		const obj=parsedata(response);
		console.log(response)
		console.log(obj)
		if(obj.data.length>0){
		$("#cart_ref").html(obj.data[0]["cart_ref_id"]);
		
		document.querySelector("#codbtn").removeAttribute("disabled")
		}
		var to=0;
		for(var i=0;i<obj.data.length;i++){
			to=to+obj.data[i]["total"];
		}
		$("#cart_total").html(to);
	});
}
function cod(){
	var cri=$("#cart_ref").html();
	var mobile=window.localStorage.getItem("mobile");
	var pass=window.localStorage.getItem("password");
	var d = new Date();
var dat= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
var sa=$("#cprofile_sa").val();
var ba=$("#cprofile_ba").val();
addorder(cri,mobile,pass,dat,ba,sa,"COD","UNPAID","COMPLETED","UNDELIVERED");
}
function myorders(){
	getorderdata();
	changepage("myorders.html",1);
}
function parsedata(response){
	var obj=JSON.parse(response);
	return obj;
}
function slugsliders(response,catslug,imgsz,slidesperviews,div,headingid,headingtext,ntext){
	$("#"+headingid).html(headingtext);
								const obj = parsedata(response);
									var textu='';
									for (var i=0;i<obj.data.length;i++){
										var slug=[];
										try{
											slug=obj.data[i]["slug"].split('_');
										}
										catch{
											slug[0]="";
										}
										if(slug[0]==catslug){
										
											   textu=textu+'<div class="swiper-slide" onclick="loadlist(1,'+obj.data[i]["id"]+')"> <img src="'+obj.data[i][imgsz]+'" width="100%" alt="">';
											   if(ntext){
											   	   textu=textu+'<h5 style="position: absolute;bottom: 20%; text-align: center; background: rgba(0,0,0,.4);color: #fff;padding: 8px; left: 50%;transform: translateX(-50%);width: 80%;font-size: 14px;">'+obj.data[i]["name"]+'</h5>';
											   }
											   textu=textu+' </div>';
										}
	}
	 $("#"+div).html(textu);
	 var swiper = new Swiper("#"+div+'-container', {
              spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: slidesperviews,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoHeight: false,
            nested: true,
        });
}
function sksliders(obj,maxslides,catslug,imgsz,slidesperviews,div,headingid,headingtext,ntext,change=1){
	$("#"+headingid).html(headingtext);
									var textu='';
									obj.data=shuffle(obj.data);
									for (var i=0;i<obj.data.length;i++){
										if(i==maxslides){break;}
										   textu=textu+'<div style="overflow-wrap: break-word;" class="swiper-slide" prodid="'+obj.data[i]["id"]+'" onclick="loadprod(this,'+change+')"> <img style="z-index:-1" src="'+obj.data[i]["product_media"]+'" width="100%" alt="">';
										     if(ntext){
											   	   textu=textu+'<h5 style= text-align: center; background: rgba(0,0,0,.4);color: #fff;padding: 8px; left: 50%;transform: translateX(-50%);width: 80%;font-size: 14px;">'+obj.data[i]["product_name"]+'</h5><b style="color:#549c2f;">'+obj.data[i]["sale_price"]+'</b><span style="margin-left:10px;color:#777;font-size:13px;text-decoration:line-through;">'+obj.data[i]["regular_price"]+'</span>';
											   }
											    textu=textu+'</div>';
									} 
									$("#"+div).html(textu);
	 var swiper = new Swiper("#"+div+'-container', {
              spaceBetween: 30,
            centeredSlides: false,
            slidesPerView: slidesperviews,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoHeight: false,
            nested: true,
        });
}
function buynow(pid){
	loading(".listcart");
	addtocart(pid);
	changepage("cart.html",1)
}
function addtowishlist(productid){
var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/addwishlist",
  "method": "POST",
  "data": {
    "productid" : productid,
    "mobile" :window.localStorage.getItem("mobile"),
    "password" :window.localStorage.getItem("password")
  },
};
$.ajax(settings).done(function (response) {
  const obj = parsedata(response);
	if(obj["response"]=="success"){
  popup("Added to Wishlist")
	}
});
}
function brandstore(bid){
	
}
function loadfiltercat(){
	loading("#filtercont")
	var response = window.localStorage.getItem("catdata");
	  const obj = parsedata(response);
	  var cattext=' <ons-list-item expandable id="filtercattitle">Category<div class="expandable-content">';
	  for(var i=0;i<obj.data.length;i++){
		  
		 cattext=cattext+' <ons-list-item tappable>';
       cattext=cattext+'<label class="left">';
         cattext=cattext+'<ons-radio onchange="selectfiltercat('+obj.data[i]["id"]+",'"+obj.data[i]["name"]+"'"+')"  value="'+obj.data[i]["id"]+'" name="categoryselect"></ons-radio>';
       cattext=cattext+'</label>';
       cattext=cattext+'<label for="cat_'+obj.data[i]["id"]+'" class="center">';
       cattext=cattext+obj.data[i]["name"];
       cattext=cattext+'</label>';
     cattext=cattext+'</ons-list-item>';
	 var sub=obj.data[i]["subcategoryonelevel"];
	  
	 for (var j =0;j<sub.length;j++){
		
		  cattext=cattext+' <ons-list-item tappable>';
       cattext=cattext+'<label class="left">';
         cattext=cattext+'       <ons-radio onchange="selectfiltercat('+sub[j]["id"]+",'"+sub[j]["name"]+"'"+')" value="'+sub[j]["id"]+'" name="categoryselect"></ons-radio>';
       cattext=cattext+'</label>';
       cattext=cattext+'<label for="cat_'+sub[j]["id"]+'" class="center">';
       cattext=cattext+"------"+sub[j]["name"];
       cattext=cattext+'</label>';
     cattext=cattext+'</ons-list-item>';
	 }
	 
	 
	  }
	   cattext=cattext+' </div></ons-list-item>';
	   
	 cattext=cattext+' <ons-list-item expandable id="pricetitle">Price<div class="expandable-content">';
	  
	  cattext=cattext+'<ons-row><ons-col><ons-input id="minpricefil" value=0 type="number"></ons-input></ons-col><ons-col><ons-input value="10000" id="maxpricefil" type="number"></ons-input></ons-col></ons-row>';
    
	  cattext=cattext+' </div></ons-list-item>';
	
	 
	  $("#filtercont").html(cattext);
	   setTimeout(() => {  document.getElementById("filtercont").innerHTML=cattext; }, 2);
	   changepage("filter.html",1);

}
function selectfiltercat(catid,catname){
		  document.querySelector('#filtercattitle').hideExpansion();
		  document.querySelector('#pricetitle').showExpansion();
		  //$(".filterattrtitle").remove();
		  attributecategorywise(catid);
		  brandfilterlisting(catid);
		  $("#filtercattitle .top .center").html("Category : "+catname)
		  $(".filterbrandtitle").remove();
		  
}
function attributecategorywise(categoryid)
{
   var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/attributegetcategorywise",
  
  "method": "POST",
  "data": {
    "category_id":categoryid,
    
  },
};
$.ajax(settings).done(function (response) {
 
 const obj = parsedata(response);
console.log(obj)
console.log(obj.data.length)
var cattext='';
	  for(var i=0;i<obj.data.length;i++){
		  cattext=cattext+' <ons-list-item expandable class="filterattrtitle" id="filterattrtitle-'+i+'">'+obj.data[i]["name"]+'<div class="expandable-content">'; 
		  var terms=obj.data[i]["term"];
		
		  for(var j=0;j<terms.length;j++){
		   cattext=cattext+' <ons-list-item tappable>';
       cattext=cattext+'<label class="left">';
         cattext=cattext+'       <ons-radio id="term_'+terms[j].id+'" onchange="termselect('+terms[j].id+",'"+obj.data[i]["name"]+"','"+terms[j]["name"]+"',"+i+')" value="'+terms[j].id+'"name="termselect-'+i+'"></ons-radio>';
       cattext=cattext+'</label>';
       cattext=cattext+'<label for="term_'+terms[j].id+'" class="center">';
       cattext=cattext+terms[j].name;
       cattext=cattext+'</label>';
     cattext=cattext+'</ons-list-item>';
	 
		  }
		  cattext=cattext+' </div></ons-list-item>';
		  
	  }
	 console.log(cattext);
	  $("#filtercont").append(cattext);
	  
 
});
}
function termselect(termid,attributename,termname,index){
	
	 $("#filterattrtitle-"+index+" .top .center").html(attributename+": "+termname)
	  document.querySelector("#filterattrtitle-"+index).hideExpansion();
	  }
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
function brandfilterlisting(catid){
		var settings3 = {
				"url": "https://thadathilfarmresort.com/shoppingcat/public/api/productfilter",
				"method": "POST",
				"data": {
				"category":catid
				},
				};
	$.ajax(settings3).done(function (response2) {
		
		var obj=parsedata(response2);
		console.log(obj);
		
		var brandtext=' <ons-list-item expandable class=filterbrandtitle id="filterbrandtitle">Brands<div class="expandable-content">'; 
		
		//obj.brand[i]["name"]
		
		
		  
	brandtext=brandtext+' <ons-list-item tappable>';
       brandtext=brandtext+'<label class="left">';
         brandtext=brandtext+'       <ons-radio id="term_'+obj.brand.id+'" onchange="brandselect('+obj.brand.id+')" value="'+obj.brand.id+'"name="brandselect"></ons-radio>';
       brandtext=brandtext+'</label>';
       brandtext=brandtext+'<label for="brand_'+obj.brand.id+'" class="center">';
       brandtext=brandtext+obj.brand.name;
       brandtext=brandtext+'</label>';
     brandtext=brandtext+'</ons-list-item>';
		  
		  brandtext=brandtext+' </div></ons-list-item>';
		  logger(brandtext);
	  $(".filterbrandtitle").remove();
	  $("#filtercont").append(brandtext);
	  
		
		
	});
}
function brandstore(brandid){
	changepage("brandstore.html",1);
	loading("#brandstore");
	
}
function applyfilter(){
	var cat = $("input[name=categoryselect]:checked").val()
	var termsarr=Array();
	var minprice=$("#minpricefil").val();
	var maxprice=$("#maxpricefil").val();
	for(var i=0;i<$(".filterattrtitle").length;i++){
	 termsarr.push($('input[name=termselect-'+i+']:checked').val());
	}
	
	var settings = {
		  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/wholeproductfilter",
		  
		  "method": "POST",
		  "data": {
			   "category" :cat,
    "minprice" :minprice,
    "maxprice" :maxprice,
   "key" :"",
    //"brand" :brand,
    "term" :termsarr.join(',')
			  
			  
			  
			  
		   

		  },
	};
console.log(settings);

	$.ajax(settings).done(function (response) {
		console.log(parsedata(response));
	  window.localStorage.setItem("sdata",response);
	//logger(response);
	listaction();
	changepage("list.html",1)
	});

	
	
}
function productwiseattribute(productid){

var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/productwiseattribute",
  
  "method": "POST",
  "data": {
    
    "product_id" :productid,
    
    
  },
};

$.ajax(settings).done(function (response) {
  logger(response);
  var obj=parsedata(response);
  console.log(obj);
  var atttext="";
  for(var i = 0;i<obj.data.length;i++){
	  atttext=atttext+'<ons-select class="select">  <select class="select-input"><option>'+obj.data[i]["name"]+'</option>';
	        var term=obj.data[i]["terms"];
			for(var j=0;j<term.length;j++){
				atttext=atttext+'<option value="'+term[j].id+'">'+term[j].name+'</option>';
			}
	  
	  atttext=atttext+'</select></ons-select>';
  }
  alert(atttext);
  $("#mods").html(atttext);
});

}
function categorywisebrand(category){

var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/categorywisebrand",
  
  "method": "POST",
  "data": {
    
    "category" :category,
    
    
  },
};

$.ajax(settings).done(function (response) {
  logger(response);
var obj=parsedata(response);
console.log(obj);
  });


}
function wishlist(productid,mobile,password){

var settings = {
  "url": "https://thadathilfarmresort.com/shoppingcat/public/api/wishlist",
  
  "method": "POST",
  "data": {
    
    "mobile" :mobile,
    "password" :password
    
  },
};

$.ajax(settings).done(function (response) {
  logger(response);
});

}

function updatetoken(oldtoken,newtoken,mobile,pass){
	
}

function subscribetopic(token,topic,mobile,pass){
	
	
}


