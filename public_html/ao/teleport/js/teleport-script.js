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
            ao_ws               : "",
            displayNativeInstallHeroBanner : true,
            displayCompanyLogo : true,
            displayNativeForSecuredComm : true,
            forceIOS            : false,
            forceAndroid        : false,
            pauseOnDesktop      : false,
            forceCF             : false,
            forceSU             : false,
            forceKindle         : false
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

    var getCompanyIdent = function() {
        var companyIdent = getUrlParameter("companyIdent");
        /*try {
            if (!companyIdent) {
                var temp = window.location.origin.replace("https://", "");
                companyIdent = temp.split(".")[0];
                if (companyIdent) {
                    companyIdent = companyIdent.replace("company", "");
                }
            }
        } catch(e) {}        
        return companyIdent;*/

        if (!companyIdent) {
            companyIdent = $("#company-ident").val();
        }

        return companyIdent;        
    }

    var getDisplayTeleportPage = function() {
        return $("#DisplayTeleportPage").val() == "Y" ? true:false;
    }

    var getBaseURL = function()
    {
        if (AO.isIOS) {
            $(".ao-app").addClass("ios");
        } else if (AO.isAndroid) {
            $(".ao-app").addClass("android");
            $(".ao-app-image").attr("src", "teleport/img/android/secure-portal-icon.png");
            $(".ao-app-box").attr("background-color", "#ffffff");
        }
        if (AO.forceCF) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isChatFOSS = true;
            document.title = 'ChatFOSS - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/cf-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/chatfoss-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/chatfoss-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("cf");
            $(".ao-app-promo-desc").html("ChatFOSS");
            $(".ao-instructions-heading").html("You have received a&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}            
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }
            return result;
        } else if (AO.forceSU) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'Personal - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/su-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/syncedup-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/syncedup-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("su");
            $(".ao-app-promo-desc").html("SyncedUp");
            $(".ao-instructions-heading").html("You have received a&nbsp;secure&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        }
        if (!window.location.origin)
           window.location.origin = window.location.protocol+"//"+window.location.host;
        if (window.location.origin.indexOf("localhost") > -1) {
            $(".navbar-brand").attr("src", "https://www.secure-comm.com/web/img/ao/logos/syncedup/logo-small.png?version=1");
            $(".ao-app").addClass("sp");
            if (AO.isAndroid) {
                baseURLAPI = "https://www.econumysecure.com";
            } else if (AO.isIOS) {
                baseURLAPI = "https://www.econumysecure.com";
            }             
            return "https://www.econumysecure.com";
        } else if (window.location.origin.indexOf("chatfoss.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isChatFOSS = true;            
            document.title = 'ChatFOSS - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/cf-logo.png");
            $(".ao-app").addClass("cf");
            $(".ao-app-promo-desc").html("ChatFOSS");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}            
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }
            return result;
        } else if (window.location.origin.indexOf("chatfoss.stayprivate.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isChatFOSS = true;
            document.title = 'CHATFOSS - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/cf-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/chatfoss-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/chatfoss-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("cf");
            $(".ao-app-promo-desc").html("ChatFOSS");
            $(".ao-instructions-heading").html("You have received a&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }           
            return result;
        } else if (window.location.origin.indexOf("chatfoss.alwaysorg.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isChatFOSS = true;
            document.title = 'CHATFOSS - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/cf-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/chatfoss-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/chatfoss-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("cf");
            $(".ao-app-promo-desc").html("ChatFOSS");
            $(".ao-instructions-heading").html("You have received a&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        } else if (window.location.origin.indexOf("personal.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'Personal - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/su-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/syncedup-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/syncedup-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("su");
            $(".ao-app-promo-desc").html("SyncedUp");
            $(".ao-instructions-heading").html("You have received a&nbsp;secure&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        } else if (window.location.origin.indexOf("syncedup.secure-comm.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'SyncedUp - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/su-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/syncedup-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/syncedup-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("su");
            $(".ao-app-promo-desc").html("SyncedUp");
            $(".ao-instructions-heading").html("You have received a&nbsp;secure&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result; 
        } else if (window.location.origin.indexOf("syncedup.stayprivate.com") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            AO.isPersonal = true;
            document.title = 'SYNCED UP - ' + pageTitle;
            var result = window.location.origin;
            $(".navbar-brand").attr("src", "teleport/img/su-logo.png");
            if (AO.isIOS) {
                $(".ao-app-image").attr("src", "teleport/img/ios/syncedup-icon.png");
            } else {
                $(".ao-app-image").attr("src", "teleport/img/android/syncedup-icon.png");
            }
            $("#ao-app-text").html("Open in<br>App");
            $(".ao-app").addClass("su");
            $(".ao-app-promo-desc").html("SyncedUp");
            $(".ao-instructions-heading").html("You have received a&nbsp;secure&nbsp;message");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;                       
        } else if (window.location.origin.indexOf("secure-comm") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin,
                companyIdent = getCompanyIdent();

            companyIdent = companyIdent.toLowerCase();

            $(".navbar-brand").attr("src", "https://www.secure-comm.com/web/img/ao/logos/" + companyIdent + "/logo-small.png?version=1"); 
            $(".ao-app").addClass("sp");           

            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        } else if (window.location.origin.indexOf("secured-comm") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin,
                companyIdent = getCompanyIdent();

            companyIdent = companyIdent.toLowerCase();

            $(".navbar-brand").attr("src", "https://www.secured-comm.com/web/img/ao/logos/" + companyIdent + "/logo-small.png?version=1"); 
            $(".ao-app").addClass("sp");           

            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://www.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;            
        } else if (window.location.origin.indexOf("stayprivate") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin,
                companyIdent = getCompanyIdent();

            companyIdent = companyIdent.toLowerCase();

            $(".navbar-brand").attr("src", "https://www.stayprivate.com/web/img/ao/logos/" + companyIdent + "/logo-small.png?version=1");
            $(".ao-app").addClass("sp");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        } else if (window.location.origin.indexOf("alwaysorg") > -1) {
            AO.ao_ws = "/ao_ws";
            AO.isDev = false;
            var result = window.location.origin,
                companyIdent = getCompanyIdent();

            companyIdent = companyIdent.toLowerCase();

            $(".navbar-brand").attr("src", "https://www.alwaysorg.com/web/img/ao/logos/" + companyIdent + "/logo-small.png?version=1");
            $(".ao-app").addClass("sp");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.alwaysorg.com";
            //}
            if (AO.isAndroid || AO.isIOS) {
                //baseURLAPI = "https://api.alwaysorg.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;
        } else if (window.location.origin.indexOf("econumysecure") > -1) {            
            var result = window.location.origin,
                companyIdent = getCompanyIdent();

            companyIdent = companyIdent.toLowerCase();

            $(".navbar-brand").attr("src", "https://www.econumysecure.com/web/img/ao/logos/" + companyIdent + "/logo-small.png?version=1");
            $(".ao-app").addClass("sp");
            //if (AO.isAndroid || AO.isIOS) {
            //    result = "https://www.econumysecure.com";
            //}
            if (AO.isAndroid || AO.isIOS) {
                //baseURLAPI = "https://www.econumysecure.com";
                baseURLAPI = "https://www.secure-comm.com/";
            } else if (AO.isIOS) {
                baseURLAPI = "https://api.alwaysorg.com";
            }            
            return result;            
        }
        return "https://www.econumysecure.com";            
        //return window.location.origin;
    }

    var updateWindowURL = false;        

    window.mobilecheck();
    if (AO.forceIOS) {
        AO.isIOS = true;
    } else if (AO.forceAndroid) {
        AO.isAndroid = true;
        if (AO.forceKindle) AO.isKindle = true; 
    }
    var promoCode = getUrlParameter("promo");
    var resetCode = getUrlParameter("reset");
    
    var baseURLAPI; //www replaces the companyIdent - this will allow for calls to the API to work correctly
    var baseURL = getBaseURL();    
    var baseAPI = "ao";

    /*var baseURLAPI;
    var baseURL;    
    var baseAPI = "ao";*/

    var pageTitle = AO.isPasswordReset ? "Password Reset" : "Teleport";
    var instLabel = AO.isPasswordReset ? "RESET PASSWORD" : "GET STARTED";
    var linkLabel = AO.isPasswordReset ? "password reset link." : "invitation link."; 


    //if (getCompanyIdent().toLowerCase() == "jdtest1" || getCompanyIdent().toLowerCase() == "jdtest2") {
    //    AO.displayNativeForSecuredComm = true;
    //}

    var instructions = '<p>If this page does not redirect after 5 seconds <a class="ao-anchor-link btn btn-secondary" href="#" role="button">click here &raquo;</a></p>';
    if (AO.isAndroid || AO.isIOS)        
    {
        if ( window.location.origin.indexOf("secured-comm") > -1 && !AO.displayNativeForSecuredComm) {
            //do nothing
        } else {
            if (AO.isIOS) {
                instructions = '<a class="ao-anchor-link btn btn-secondary ao-app-box" href="#" role="button"><p><img src="teleport/img/ios/safari-icon.png" width="60" height="60" class="ao-app-image"><br>Open in<br>Web Browser</p></a>';       
            } else {
                instructions = '<a class="ao-anchor-link btn btn-secondary ao-app-box" href="#" role="button"><p><img src="teleport/img/android/chrome-icon.png" width="60" height="60" class="ao-app-image"><br>Open in<br>Web Browser</p></a>';       
            }
        }        
    }
    
    $(".ao-app-promo-title").html("");

    $(".ao-to-site").html(instructions);

    var $install = $("#ao-install");
    var $launch = $(".ao-anchor-link");    

    var showNativeSetup = function() {
        if (AO.displayCompanyLogo) {
            $(".navbar-brand").addClass("fadeInLoad");
        } else {
            $(".navbar-brand").hide();
        }
        if (AO.displayNativeInstallHeroBanner) {
            $(".ao-section-app").addClass("fadeInLoad");
        } else {
            $(".ao-section-app").hide();
        }
        $(".container").css('display', 'block');
        $(".ao-native-instructions").show();

        if (AO.isIOS) {
            var param = AO.isPasswordReset ? "//reset=" + resetCode : "//Promo=" + promoCode,
                companyIdent = getUrlParameter("companyIdent");
            if (companyIdent) {
                param = param + "&companyIdent=" + companyIdent;
            }

            var url;
            if (AO.isDev) {
                url = 'aoiospgapdev:/' + param;
            } else {
                if (AO.isChatFOSS) {
                    url = 'cfn:/' + param;
                } else if (AO.isPersonal) {
                    url = 'pln:/' + param;
                } else {
                    url = 'aon:/' + param;
                }                 
            }            

$('head link[rel="manifest"]').attr('href', 'su-manifest.json');            

            if (AO.isChatFOSS) {
                $('meta[name=apple-itunes-app]').attr('content', 'app-id=1005628468, app-argument=' + url + "&companyIdent=" + getCompanyIdent());    
                $('head link[rel="manifest"]').attr('href', 'cf-manifest.json');          
            } else if (AO.isPersonal) {
                $('meta[name=apple-itunes-app]').attr('content', 'app-id=1042907503, app-argument=' + url + "&companyIdent=" + getCompanyIdent());
                $('head link[rel="manifest"]').attr('href', 'su-manifest.json');
            } else {
                $('meta[name=apple-itunes-app]').attr('content', 'app-id=1005595620, app-argument=' + url + "&companyIdent=" + getCompanyIdent());                
            }
        }        
    }

    var showBrowserSetup = function() {
        if (AO.displayCompanyLogo) {
            $(".navbar-brand").addClass("fadeInLoad");
        } else {
            $(".navbar-brand").hide();
        }
        $(".ao-section-app").hide();
        $(".container").css('display', 'block').css('top', '100px').css('position', 'absolute');
        $(".ao-browser-instructions").show();
        $("#ao-browser-instructions").fadeIn(3000);   
        if (AO.isAndroid || AO.isIOS) {
            setTimeout(function() {
                $("#loaderFS-wrapper").hide();
            }, 12000);            
        } else {
            $("#loaderFS-wrapper").fadeOut(1500);
        }        
    }

    var processInstall = function() {               
        var type;

        var appSubTypeInd = "DF";      
        if (AO.isChatFOSS) {
            appSubTypeInd = "CF";      
        } else if (AO.isPersonal) {
            appSubTypeInd = "PL";
        }

        if (AO.isAndroid) {
            if (AO.isKindle) {
                type = "KP"
                $("#ao-launch").hide();
            } else if (AO.isBlackberry) {
                type = "BP"
            } else {
                type = "AP"
            }                 
        } else if (AO.isIOS) {
            type = "IP";
        }

        $.ajax({
            url: baseURLAPI + AO.ao_ws + "/api/getMobileAppInstallURL.php",
            data: {"AppTypeInd": type, "AppSubTypeInd": appSubTypeInd},
            success: function(json){
                //console.log("Got here 3", decodeURIComponent(json["AppUrl"]));
                //alert(type + " " + appSubTypeInd + " " + decodeURIComponent(json["AppUrl"]));
                //if (AO.isAndroid) {
                //    window.open( decodeURIComponent(json["AppUrl"], '_system' ) );
                //} else {
                    var url = decodeURIComponent(json["AppUrl"]); //json["AppUrl"];
                    if (AO.isIOS) {
                        url += "&companyIdent=" + getCompanyIdent();
                    }
                    window.location = url;
                //}                
                //alert(type + " " + appSubTypeInd + " " + decodeURIComponent(json["AppUrl"]));
            },
            error: function(xhr, status, msg) {
                console.log("ERROR", baseURLAPI, type, appSubTypeInd, msg);
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
        //var now = new Date().valueOf();
        setTimeout(function () {
            //if (new Date().valueOf() - now > 2250) return;                 
            processInstall(); 
        }, 2000);            

        processLaunch();
    });

    $launch.on('click', function(e) {
        e.preventDefault();
        if (AO.isIOS || AO.isAndroid) {
            processLaunch(true);
        } else {
            processLaunch();
        }        
    });

    var processLaunch = function(isOpenBrowserVersion) {           
        if (isOpenBrowserVersion) {
            AO.isAndroid = false;
            AO.isIOS = false;
        }
        var param = AO.isPasswordReset ? "//reset=" + resetCode : "//Promo=" + promoCode;
        if (!(AO.isAndroid || AO.isIOS)) {
            param = AO.isPasswordReset ? "reset=" + resetCode : "invite=" + promoCode;
        } else {
            var companyIdent = getUrlParameter("companyIdent");
            if (companyIdent) {
                param = param + "&companyIdent=" + companyIdent;
            }
        }   

        var url;
        if (AO.isAndroid) {
            //url = "https://companyaaa.econumysecure.com/openMobileApp/Promo/" + promoCode;
            var androidScheme = "launchAOApp";
            if (AO.isKindle) {
                androidScheme += "Kindle"; //os=kindle";
            }
            if (AO.isChatFOSS) {
                androidScheme = androidScheme.replace("AO", "CF");
            } else if (AO.isPersonal) {
                androidScheme = androidScheme.replace("AO", "PL");
            }
            //Removing change to http - to avoid redirects causing problems
            //url = baseURL.replace("https", "http") + '/' + androidScheme + param;
            url = baseURLAPI + '/' + androidScheme + param;
        } else if (AO.isIOS) {
            //url = 'ao-ios-pgap-dev://Promo=' + promoCode;  
            /*var version = 8; 
            try {
                version = parseInt(bowser.version);
            } catch(e) {}*/

            if (AO.isDev) {
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
            }

            //Prevents iOS Safari from failing to start app, if the user clicks Cancel, and then attemtps to luanch again.
            //Usuelly the user will have to refresh the browser
            url += "&ts=" + Date.now();

            url += "&companyIdent=" + getCompanyIdent();

            /*if (version < 8) {
                url = url.replace("///", "//");
            }*/
        } else {
            url = baseURL + "/ao/?" + param;          
        }
        //alert(url);
        try {
            window.location.replace(url);
            if (!getDisplayTeleportPage()) {
                setTimeout(function() {
                    param = AO.isPasswordReset ? "//reset=" + resetCode : "//Promo=" + promoCode;
                    param = AO.isPasswordReset ? "reset=" + resetCode : "invite=" + promoCode;                    
                    window.location.replace(baseURL + "/ao/?" + param);
                }, 1000);
            }            
        } catch(e) {}        
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

    var start = function() {

        var complete = function() {
            if ( window.mobilecheck() || AO.forceIOS || AO.forceAndroid ) {
                if (AO.forceIOS) {
                    AO.isIOS = true;
                } else if (AO.forceAndroid) {
                    AO.isAndroid = true;
                }                
                if (AO.isBlackberry) {
                    AO.isAndroid = true;
                }
                if (window.location.origin.indexOf("secured-comm") > -1 && !AO.displayNativeForSecuredComm) {
                    showBrowserSetup();
                    updateWindowURL = true;
                    $('meta[name=apple-itunes-app]').remove();
                    $("link[rel='manifest']").remove();
                    AO.isAndroid = false;
                    AO.isIOS = false;
                } else {
                    if (AO.isAndroid) {
                        if (getDisplayTeleportPage()) {
                            showNativeSetup();
                            $("#loaderFS-wrapper").hide();
                        } else {
                            showBrowserSetup();
                            updateWindowURL = true;                            
                        }
                    } else if (AO.isIOS) {
                        if (getDisplayTeleportPage()) {
                            showNativeSetup();
                            $("#loaderFS-wrapper").hide();
                        } else {
                            showBrowserSetup();
                            updateWindowURL = true;                            
                        }
                    } else {
                        showBrowserSetup();
                        updateWindowURL = true;
                    }
                }
            } else {
                showBrowserSetup();
                updateWindowURL = true;
            }

            if (updateWindowURL) {
                if (AO.pauseOnDesktop) {
                    return;
                }
                processLaunch();
            }
        }

        /*if (!AO.globalCompanyIdent) {
            var jqxhr = $.get( window.location.origin + "/js/preload/companyPreload.php", function(e) {
              alert(e);
              //baseURL = getBaseURL();
              //complete();
            })
              .done(function() {
                //alert( "second success" );
              })
              .fail(function() {
                alert( "Instance could not be identifed" );
                AO.isAndroid = false;
                AO.isIOS = false;                
                //complete();
              })
              .always(function() {
                //alert( "finished" );
              });                        
        } else {
            complete();
        }*/

        complete();
    }

    start();

});