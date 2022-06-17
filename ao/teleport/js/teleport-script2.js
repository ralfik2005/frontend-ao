(function() {
    if(window.AO === undefined) {
    	AO = {
        	mobilecheckPerformed: false,
        	isMobile            : false,    		
        	isAndroid           : false,
        	isIOS               : false,
            isDev               : true,
            isChatFOSS          : false,
            isPersonal          : false,
            isPasswordReset     : window.location.pathname.indexOf("pwdreset")>0 ? true:false,
            isKindle            : false,
            isBlackberry        : bowser.blackberry,
            ao_ws               : ""
    	};
    }
})();

$(document).ready(function(){      
    if (typeof String.prototype.replaceAll != 'function') {
      String.prototype.replaceAll = function (find, replace) {
        return this.split(find).join(replace);
      };
    }

    var getUrlParameter = function(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) 
            {
                return sParameterName[1];
            }
        }
    }

    var getBaseURL = function()
    {
        if (!window.location.origin)
           window.location.origin = window.location.protocol+"//"+window.location.host;
        if (window.location.origin.indexOf("localhost") > -1) {
            return "https://www.econumysecure.com";
        } else if (window.location.origin.indexOf("chatfoss.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isChatFOSS = true;
            document.title = 'ChatFOSS - ' + pageTitle;
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.alwaysorg.com";
            }
            return result;
        } else if (window.location.origin.indexOf("personal.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'Personal - ' + pageTitle;
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.alwaysorg.com";
            }
            return result;
        } else if (window.location.origin.indexOf("syncedup.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'SyncedUp - ' + pageTitle;
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.alwaysorg.com";
            }
            return result;                        
        } else if (window.location.origin.indexOf("secure-comm") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.alwaysorg.com";
            }
            return result;
        } else if (window.location.origin.indexOf("alwaysorg") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.alwaysorg.com";
            }
            return result;
        } else if (window.location.origin.indexOf("econumysecure") > -1) {            
            var result = window.location.origin;
            if (AO.isAndroid || AO.isIOS) {
                result = "https://www.econumysecure.com";
            }
            return result;            
        }
        return "https://www.econumysecure.com";            
        //return window.location.origin;
    }

	var updateWindowURL = false;        

    window.mobilecheck();
    var promoCode = getUrlParameter("promo");
    var resetCode = getUrlParameter("reset");
    var isNative = getUrlParameter("native") || "N";
    var baseURL = getBaseURL();
    var baseAPI = "ao";

    var pageTitle = AO.isPasswordReset ? "Password Reset" : "Teleport";
    var instLabel = AO.isPasswordReset ? "RESET PASSWORD" : "GET STARTED";
    var linkLabel = AO.isPasswordReset ? "password reset link." : "invitation link."; 


    var instructions = "<p>Secure Portal</p>";
    var platformInstructions = "<p style=\"font-size: 10px;\">If nothing happens within five seconds, please click the " + instLabel + " button below.</p>";

    var $install = $("#ao-install");
    var $launch = $("#ao-launch");

    var showInstallButton = function() {
        $install.css("display", "block");
    }

    var processInstall = function() {               
        var type;
        if (AO.isAndroid) {
            if (isNative == "Y") {
                if (AO.isKindle) {
                    type = "KN"
                } else if (AO.isBlackberry) {
                    type = "BN"
                } else {
                    type = "AN"
                }                
            } else {
                if (AO.isKindle) {
                    type = "KP"
                } else if (AO.isBlackberry) {
                    type = "BP"
                } else {
                    type = "AP"
                }                 
                //type = "AP"
            }
        } else if (AO.isIOS) {
            if (isNative == "Y") {
                type = "IN"
            } else {
                type = "IP"
            }
            if (AO.isChatFOSS) {
                alert("You will now be redirected to the App Store where you can download the ChatFOSS app. Once it is installed please click again on the " + linkLabel);              
            } else if (AO.isPersonal) {
                alert("You will now be redirected to the App Store where you can download the SyncedUp app. Once it is installed please click again on the " + linkLabel);              
            } else {
                alert("You will now be redirected to the App Store where you can download the Secure Portal app. Once it is installed please click again on the " + linkLabel);              
            }
        }
        if (AO.iOS && isNative == "N") {
            //return;
        }  
        var appSubTypeInd = "DF";      
        if (AO.isChatFOSS) {
            appSubTypeInd = "CF";      
        } else if (AO.isPersonal) {
            appSubTypeInd = "PL";
        }
        $.ajax({
            url: baseURL + AO.ao_ws + "/api/getMobileAppInstallURL.php",
            data: {"AppTypeInd": type, "AppSubTypeInd": appSubTypeInd},
            success: function(json){
                //console.log("Got here 3", decodeURIComponent(json["AppUrl"]));
                window.location = decodeURIComponent(json["AppUrl"]);
                //alert(url + " " + type + " " + appSubTypeInd + " " + decodeURIComponent(json["AppUrl"]));
            },
            error: function(xhr, status, msg) {
                console.log("ERROR", baseURL, type, appSubTypeInd, msg);
                //alert(msg);
            }
        });
    }
    /*URL Schemes
        Android:
            1) Native
                ao-and-native://Promo=123
            2) PGAP
                aon://Promo=123
        iOS:
            1) Native dev
                ao-ios-native-dev://Promo=123
            2) PGAP dev
                ao-ios-pgap-dev://Promo=123
            3) PGAP prod
                aon://Promo=123
    */

    $install.on('click', function(e) {
        e.preventDefault();
        processInstall();
    });

    $launch.on('click', function(e) {
        e.preventDefault();
        processLaunch();
    });

    var processLaunch = function() {           
        var param = AO.isPasswordReset ? "//reset=" + resetCode : "//Promo=" + promoCode;
        if (!(AO.isAndroid || AO.isIOS)) {
            param = AO.isPasswordReset ? "reset=" + resetCode : "invite=" + promoCode;
        }   

        var url;
        if (AO.isAndroid) {
            //url = "https://companyaaa.econumysecure.com/openMobileApp/Promo/" + promoCode;
            var androidScheme = isNative=="Y" ? "launchAOAppNative":"launchAOApp";
            if (AO.isKindle) {
                androidScheme += "Kindle";
            }
            if (AO.isChatFOSS) {
                androidScheme = androidScheme.replace("AO", "CF");
            } else if (AO.isPersonal) {
                androidScheme = androidScheme.replace("AO", "PL");
            }
            url = baseURL.replace("https", "http") + '/' + androidScheme + param;
        } else if (AO.isIOS) {
            //url = 'ao-ios-pgap-dev://Promo=' + promoCode;  
            /*var version = 8; 
            try {
                version = parseInt(bowser.version);
            } catch(e) {}*/

            if (isNative == "Y") {
                if (AO.isChatFOSS) {
                    url = 'cfosnative:/' + param;
                } else if (AO.isPersonal) {
                    url = 'plosnative:/' + param;
                } else {
                    url = 'aoosnative:/' + param;
                }                
                //url = baseURL + "/openiOSNativeApp/Promo/" + promoCode;
            } else if (AO.isDev) {
                url = 'aoiospgapdev:/' + param;
                //url = baseURL + "/openiOSApp/Promo/" + promoCode;                
            } else {
                if (AO.isChatFOSS) {
                    url = 'cfn:/' + param;
                } else if (AO.isPersonal) {
                    url = 'pln:/' + param;
                } else {
                    url = 'aon:/' + param;
                }                 
                //url = baseURL + "/openiOSApp/Promo/" + promoCode;
            }

            /*if (version < 8) {
                url = url.replace("///", "//");
            }*/
        } else {
            url = baseURL + "/ao/?" + param;
        }
//alert(url);
        window.location.replace(url);
    }
    //Does not work - Cross origin requests only supported by the protocal http, data, chrome, chrome-extension, https, chrome-extension-resource
    /*var urlExists = function(url, callback){
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(){
          callback(true);
        },
        error: function() {
          callback(false);
        }
      });
    }*/

    if (window.mobilecheck()) {
        if (AO.isBlackberry) {
            AO.isAndroid = true;
            baseURL = getBaseURL();
        }
    	if (AO.isAndroid) {
            showInstallButton();

            platformInstructions = "<p>To install the app, please use the \"INSTALL APPLICATION\" button.</p>";
            platformInstructions += "<p>Once installed, please click the " + instLabel + " button.</p>";

            setTimeout(function () { 
               processInstall() 
            }, 2000);            

            //window.location.replace('http://www.alwaysorg.com/aoandroid//Promo=' + promoCode);
			processLaunch();
    	} else if (AO.isIOS) {
            showInstallButton();

            platformInstructions = "<p>To install the app, please use the \"INSTALL APPLICATION\" button.</p>";
            platformInstructions += "<p>Once installed, please click the " + instLabel + " button.</p>";

            var now = new Date().valueOf();
			setTimeout(function () {
                if (new Date().valueOf() - now > 2250) return;                 
                processInstall(); 
            }, 2000);    		
			
            processLaunch();
    	} else {
    		updateWindowURL = true;
    	}
    } else {
    	updateWindowURL = true;
    }

    if (updateWindowURL) {
	   processLaunch();
    }
    
    $("#ao-instructions").html(instructions + platformInstructions);
    
});