/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready











/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		setting();
        app.receivedEvent('deviceready');
		
		////alert("ready");
		//window.FirebasePlugin.getToken(function(token) {
    
	//firebasetoken(token,window.localStorage.getItem("firebsetoken"))
//}, function(error) {
   
//});

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
 
        console.log('Received Event: ' + id);
 
        // start to initialize PayPalMobile library
        app.initPaymentUI();
    },
    initPaymentUI : function () {
     var clientIDs = {
     "PayPalEnvironmentProduction": "AcNA-yd-8z8a6A4FCoroxqCtpECXTXxETdS-qtPoUpjS3Au-rUKUUpAiJcI0u-FpTVTWhuPzBXSoRRCm",
        "PayPalEnvironmentSandbox": "ATtU7THi5UFej3kYA93K_mxVnG7GlyJ_iruRPC3i1WfraYuVbiAasSHU9NTZiinR254ux5MmuvZgmSaO"
      };
      PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
 
    },
    onSuccesfulPayment : function(payment) {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
	  if(paypal.type=="serv"){
	  addserviceorder(book.bookingdate,book.service,book.employee,"paypal","PAID",JSON.stringify(payment, null, 4),book.price,book.st+"-"+book.et)
	  }
	  else if(paypal.type=="prod"){
		   var cri=$("#cart_ref").html();
	var mobile=window.localStorage.getItem("mobile");
	var pass=window.localStorage.getItem("password");
	var d = new Date();
var dat= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
var sa=$("#cprofile_sa").val();
var ba=$("#cprofile_ba").val();
var lat=window.localStorage.getItem("lat");
var lon=window.localStorage.getItem("lon");

addorder(cri,mobile,pass,dat,ba,sa,"PAYPAL","`PAID","COMPLETED","UNDELIVERED",lat,lon);
	  }
    },
    // This code is only used for independent card.io scanning abilities
    onCardIOComplete: function(card) {
      console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
    },
    onAuthorizationCallback : function(authorization) {
      console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
      // for simplicity use predefined amount
      // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
     
var tot=$("#cart_total").html();
	////alert(tot);
	var amount=parseFloat(tot);
	 var paymentDetails = new PayPalPaymentDetails(amount, "0.00", "0.00");
      var payment = new PayPalPayment(amount, "USD", "Awesome Sauce", "Sale", paymentDetails);
      return payment;
    },
    configuration : function () {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
      return config;
    },
    onPrepareRender : function() {
      // buttons defined in index.html
      //  <button id="buyNowBtn"> Buy Now !</button>
      //  <button id="buyInFutureBtn"> Pay in Future !</button>
      //  <button id="profileSharingBtn"> ProfileSharing !</button>
      //  <button id="cardScanBtn">Advanced: Use card.io scan only</button>
      var buyNowBtn = document.getElementById("buyNowBtn");
      var buyInFutureBtn = document.getElementById("buyInFutureBtn");
      var profileSharingBtn = document.getElementById("profileSharingBtn");
      var cardScanBtn = document.getElementById("cardScanBtn");
 
      buyNowBtn.onclick = function(e) {
        // single payment
        PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
      };
 
      buyInFutureBtn.onclick = function(e) {
        // future payment
        PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
      };
 
      profileSharingBtn.onclick = function(e) {
        // profile sharing
        PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
      };
      
      cardScanBtn.onclick = function(e) {
        // card.io scanning independent of paypal payments. 
        // This is used for cases where you only need to scan credit cards and not use PayPal as funding option.
        CardIO.scan({
                     "requireExpiry": true,
                     "requireCVV": false,
                     "requirePostalCode": false,
                     "restrictPostalCodeToNumericOnly": true
                   },
                   app.onCardIOComplete,
                   app.onUserCanceled
                 );
       };
    },
    onPayPalMobileInit : function() {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), app.onPrepareRender);
    },
    onUserCanceled : function(result) {
      console.log(result);
    }
};
 
app.initialize();













document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//cordova.plugins.firebase.analytics.setUserId("12345");
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  // homescreen();
//window.FirebasePlugin.setUserId("jayesh");

};

var app2 = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app2.addRZPEventListener();
		
    },

    addRZPEventListener: function() {
        //document.getElementById('rzp-button').addEventListener('click', function(event) {
          //  RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
            //event.preventDefault();
        //})
    }
};
function razorpay(){
	var tot=$("#cart_total").html();
	////alert(tot);
	var amount=parseFloat(tot)*100;
	var rzpOptions = {
    key: "rzp_test_zHrC2WyGrwsyan",
    amount: amount, // 2000 paise = INR 20
    name: "Thadathil farm resort",
    description: "Purchase Description",
    image: "https://i.imgur.com/n5tjHFD.png",
    handler: function (response){
		
        //alert(response.razorpay_payment_id);
    },
    prefill: {
        name: "Harshil Mathur",
        email: "harshil@razorpay.com"
    },
    notes: {
        address: "Hello World"
    },
    theme: {
        color: "#F37254"
    }
};

var successCallback = function(payment_id) {
  //alert('payment_id: ' + payment_id)
  //console.log(book);
  var cri=$("#cart_ref").html();
	var mobile=window.localStorage.getItem("mobile");
	var pass=window.localStorage.getItem("password");
	var d = new Date();
var dat= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
var sa=$("#cprofile_sa").val();
var ba=$("#cprofile_ba").val();
var lat=window.localStorage.getItem("lat");
var lon=window.localStorage.getItem("lon");

addorder(cri,mobile,pass,dat,ba,sa,"RAZORPAY","`PAID","COMPLETED","UNDELIVERED",lat,lon);
};

var cancelCallback = function(error) {
  //alert(error.description + ' (Error '+error.code+')')
  
};

	RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
            event.preventDefault();
}
function payservice(){
	var tot=$("#booktotalprice").html();
	//alert(tot);
	var amount=parseFloat(tot)*100;
	var rzpOptions = {
    key: "rzp_test_zHrC2WyGrwsyan",
    amount: amount, // 2000 paise = INR 20
    name: "Thadathil farm resort",
    description: "Purchase Description",
    image: "https://i.imgur.com/n5tjHFD.png",
    handler: function (response){
		//console.log(book);
       // //alert(response.razorpay_payment_id);
    },
    prefill: {
        name: "Harshil Mathur",
        email: "harshil@razorpay.com"
    },
    notes: {
        address: "Hello World"
    },
    theme: {
        color: "#F37254"
    }
};

var successCallback = function(payment_id) {
	////alert("success");
  //alert('payment_id: ' + payment_id)
 // console.log(book);
   addserviceorder(book.bookingdate,book.service,book.employee,"razorpay","PAID",payment_id,book.price,book.st+"-"+book.et)
  
};

var cancelCallback = function(error) {
  //alert(error.description + ' (Error '+error.code+')')
  
};

	RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
            event.preventDefault();
}
app2.initialize();




window.fn = {};
  

window.fn.loadView = function(index) {
    document.getElementById('appTabbar').setActiveTab(index);
    document.getElementById('sidemenu').close();
};

window.fn.loadLink = function(url) {
    window.open(url, '_blank');
};

window.fn.pushPage = function(page, anim) {
    if (anim) {
        document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
    }
};
window.fn.open = function() {
	try{
  var menu = document.getElementById('menu');
	menu.open();}
	catch{logger("menu error");}
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menulist');
  content.load(page)
    .then(menu.close.bind(menu));
};

function servicecod(){
addserviceorder(book.bookingdate,book.service,book.employee,"COD","UNPAID",payment_id,book.price,book.st+"-"+book.et)
  	
}
function cod(){
	if(!validate(new Array("cprofile_fn","cprofile_ln"),new Array("First Name","Last Name"),new Array("text","text"))){return false;}
	if($("cprofile_sa").val()==""){popup("please enter shipping address");navigator.vibrate(500);return;}
	if($("cprofile_ba").val()==""){popup("please enter billing address");navigator.vibrate(500);return;}
	var cri=$("#cart_ref").html();
	var mobile=window.localStorage.getItem("mobile");
	var pass=window.localStorage.getItem("password");
	var d = new Date();
var dat= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
var sa=$("#cprofile_sa").val();
var ba=$("#cprofile_ba").val();
var lat=window.localStorage.getItem("lat");
var lon=window.localStorage.getItem("lon");


addorder(cri,mobile,pass,dat,ba,sa,"COD","UNPAID","COMPLETED","UNDELIVERED",lat,lon);
}