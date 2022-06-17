var app = {
    // Application Constructor
    initialize: function() {
        if (typeof String.prototype.replaceAll != 'function') {
          String.prototype.replaceAll = function (find, replace) {
            return this.split(find).join(replace);
          };
        }        
        this.start();
    },  

    start: function() {    
        FastClick.attach(document.body);        

        var previousResults = [];

        var self            = this,
            startButton     = $("#start"),
            resultsTable    = $("#resultsTable tbody"),

            currentTotalHeader  = $("#currentTotalHeader"),
            totalTimeElement    = $("#totalTime"),
            cTime               = $("#cTime"),
            rCount              = $("#rCount"),
            rDuration           = $("#rDuration"),
            iCount              = $("#iCount"),
            iDuration           = $("#iDuration"),
            isRunNative         = $("#isNative").prop("checked"),

            errorElement        = $("#error");

        var version         = "1.0",
            storage         = window.localStorage,
            currentVersion  = storage.getItem("version");

        var totalTime           = 0,
            startTime           = 0,
            totalRecords        = 0,
            totalRecordsTime    = 0,
            totalImages         = 0,
            totalImagesTime     = 0,
            totalCustAndPreload = 0;

        if (currentVersion != version) {
            //clear local storage
            storage.setItem("version", version);            
            //storage.removeItem("scores");            
        } else {
            if ( JSON.parse(storage.getItem("previousResults")) ) {
                previousResults = JSON.parse(storage.getItem("previousResults"));
            }
        }

        if (window.location.host.indexOf("localhost") == 0 || 
            window.location.host.indexOf("1") == 0 || //like localhost
            window.location.host.indexOf("e c o numy".replaceAll(" ", "") + "secure.com") > -1) {
            //do nothing
        } else {
            $("#username").val("aaaa1");
        }            

        startButton.click(function() {
            start();
        });           

        var start = function() {        
            setUpConstants();

            startButton.attr('disabled', 'disabled');
            startButton.addClass("spinner spinner-inverse spinner-sm");
            startButton.html("Running...");
            resultsTable.empty();

            isRunNative = $("#isNative").prop("checked")            

            currentTotalHeader.html("Running Total Time");
            totalTimeElement.html("");
            cTime.html("");
            rCount.html("");
            rDuration.html("");
            iCount.html("");
            iDuration.html("");   

            errorElement.empty();         

            totalTime           = 0;
            totalRecords        = 0,
            totalRecordsTime    = 0,
            totalImages         = 0,
            totalImagesTime     = 0,
            totalCustAndPreload = 0;            

            startTime = Date.now();

            var username        = $("#username").val(),
                compident       = $("#compident").val(),
                password        = $("#password").val(),
                company         = $("#company").val(),
                url             = "",
                callStart       = 0,
                callEnd         = 0,
                devId           = parseInt(Math.random()*1000000000000),
                systemUserName  = "",
                authToken       = "",
                userRelations   = {},
                relatedUsers    = {},
                nonSoloRelationList = [];

            var companyPreloadOne = function() {
                //companyPreload
                url = self.NON_API_BASE_URL + "js/preload/companyPreload.php?devId=" + devId;
                callStart = Date.now();
                getHTTP(url, {}, function() {
                    callEnd = Date.now();
                    append("companyPreload devId", callStart, callEnd, 1, "C");
                    if (isRunNative) {
                        getCompanyApiDeployBaseUrl();                        
                    } else {
                        customerPHP();
                    }                                        
                });                
            }

            var getCompanyApiDeployBaseUrl = function() {
                url = "https://api.alwaysorg.com/ao_ws/api/getCompanyApiDeployBaseUrl.php"; //self.BASE_URL + self.GET_COMPANY_API_DEPLOY_BASE_URL;
                var data = {
                    "UserName"          : username,
                    "UserPwd"           : password,
                    "CompanyIdent"      : compident
                };                
                callStart = Date.now();
                getHTTP(url, data, function(json) {
                    callEnd = Date.now();
                    append("getCompanyApiDeployBaseUrl", callStart, callEnd, 1, "R");
                    getLogoRetina(json);
                });                
            }

            var getLogoRetina = function(json) {
                var url = json.ApiDeployBaseUrl + "web/img/ao/logos/aaa/logo-mob-retina.png";

                var performNextAPI = function () {
                    callEnd = Date.now();
                    append("getLogoRetina", callStart, callEnd, 1, "I");
                    customerPHP();
                }

                var image = new Image();

                image.onload = function () {
                    performNextAPI();
                }

                image.onerror = function(e) {                                        
                    console.log(e, url);
                    reportError("getLogoRetina", url, "");
                    performNextAPI();                                            
                }                                    

                callStart = Date.now();

                image.src = url;
            }            

            var customerPHP = function() {
                var url = self.NON_API_BASE_URL.indexOf("www") > -1 ? self.NON_API_BASE_URL.replace("www", company) : self.NON_API_BASE_URL;
                url += "css/customer.php";
                callStart = Date.now();
                getHTTP(url, {}, function(json) {
                    callEnd = Date.now();
                    append("customer.php", callStart, callEnd, 1, "C");
                    authUserLogin();
                });                
            }

            var authUserLogin = function() {
                url = self.BASE_URL + self.LOGIN_API;
                var data = {
                    "UserName"          : username,
                    "UserPwd"           : password,
                    "CompanyIdent"      : compident,
                    "ReturnKeysFlag"    : "Y",
                    "DeviceIdentifier"  : devId
                };
                callStart = Date.now();
                getJSONPost(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.LOGIN_API, callStart, callEnd, 1, "R");
                    systemUserName = json.SystemUserName;
                    authToken      = json.AuthToken;
                    if (isRunNative) {
                        getIsContactDirectoryAvailable();                    
                    } else {
                        getUserInfo();
                    }                    
                });
            }

            var getIsContactDirectoryAvailable = function() {
                url = self.BASE_URL + self.IS_CONTACT_DIRECTORY_AVAILABLE;
                var data = {
                    "AuthToken"         : authToken,
                    "UserName"          : systemUserName
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.IS_CONTACT_DIRECTORY_AVAILABLE, callStart, callEnd, 1, "R");
                    getUserInfo();
                });                
            }

            var getUserInfo = function() {
                url = self.BASE_URL + self.GET_USER_INFO;
                var data = {
                    "AuthToken"         : authToken,
                    "UserName"          : systemUserName
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_USER_INFO, callStart, callEnd, 1, "R");
                    getAppVersion();
                });                
            }

            var getAppVersion = function() {
                url = self.BASE_URL + self.GET_APP_VERSION;
                var data = {
                    "AuthToken"         : authToken,
                    "UserName"          : systemUserName,
                    "AppTypeInd"        : "W"
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_APP_VERSION, callStart, callEnd, 1, "R");
                    getUserRelations();
                });                
            }  

            var getUserRelations = function() {
                url = self.BASE_URL + self.GET_USER_RELATIONS;
                var data = {
                    "AuthToken"         : authToken,
                    "UserName"          : systemUserName
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_USER_RELATIONS, callStart, callEnd, json.RelationTypeList.length + json.UserRelationList.length, "R");                    
                    userRelations = json;
                    $.each(json.UserRelationList, function(i, val) {
                        if (val.TypeIdent != "SOLO") {
                            $.each(val.TypeRelList, function(x, rel) {
                                nonSoloRelationList.push(rel.Id);
                            });
                        }
                    });
                    getRelatedUsers();                    
                });                
            }

            var getRelatedUsers = function() {
                url = self.BASE_URL + self.GET_RELATED_USERS;
                var data = {
                    "AuthToken"         : authToken,
                    "UserName"          : systemUserName
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_RELATED_USERS, callStart, callEnd, json.RelatedUserList.length, "R");
                    relatedUsers = json;
                    getConverseHistory50();
                });                
            }                                  

            var getConverseHistory50 = function() {
                url = self.BASE_URL + self.GET_CONVERSE_HISTORY;
                var data = {
                    "AuthToken"             : authToken,
                    "UserName"              : systemUserName,
                    "ExclEmptyTextChatFlag" : "Y",
                    "GroupTextChatMsgsFlag" : "Y",
                    "IncIPTextChatFlag"     : "Y",                    
                    "NumEntries"            : 50,
                    "OnlyCurrRelsFlag"      : "Y",
                    "ReturnTotalNumFlag"    : "Y",
                    "RelationIdList"        : nonSoloRelationList.join(";")
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_CONVERSE_HISTORY + " 50", callStart, callEnd, json.ConverseHistList.length, "R");
                    getConverseHistoryTotals();
                });                
            }

            var getConverseHistoryTotals = function() {
                url = self.BASE_URL + self.GET_CONVERSE_HISTORY_TOTALS;
                var data = {
                    "AuthToken"             : authToken,
                    "UserName"              : systemUserName,                    
                    "GetHistPerRelFlag"     :"Y",
                    "OnlyCurrRelsFlag"      :"Y",
                    "ReadConverseFilter"    :"N",
                    "ReturnTotalNumFlag"    :"Y"
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_CONVERSE_HISTORY_TOTALS, callStart, callEnd, json.RelItemTotalList.length, "R");
                    getCompleteHistoryForEachRelationship();
                });                 
            }

            var getCompleteHistoryForEachRelationship = function() {
                if (userRelations.UserRelationList.length > 0) {
                    var userRelationListCount = userRelations.UserRelationList.length,
                        userRelationListIndex = 0,
                        currentTypeRelListCount = 0,
                        currentTypeRelListIndex = 0;

                    var processNextRelationListEntry = function() {
                        if (userRelationListIndex < userRelationListCount) {
                            currentTypeRelListCount = userRelations.UserRelationList[userRelationListIndex].TypeRelList.length;
                            currentTypeRelListIndex = 0;

                            processNextTypeRelListEntry();
                        } else {
                            getAccountManagement();
                        }
                    }

                    var processNextTypeRelListEntry = function() {
                        if (currentTypeRelListIndex < currentTypeRelListCount) {                            
                            getHistory(userRelations.UserRelationList[userRelationListIndex].TypeRelList[currentTypeRelListIndex].Id);                            
                        } else {
                            userRelationListIndex++;
                            processNextRelationListEntry();
                        }
                    }

                    var getHistory = function(relId) {
                        getConverseHistory(relId, function(json) {
                            //1. All Email Images
                            //2. All TC + Thumbnail Images
                            //3. All Vault + Thumbnail Images
                            getEmailThumbnails(relId, json);
                        });
                    }

                    var getEmailThumbnails = function(relId, json) {
                        var converseHistListCount = json.ConverseHistList.length;
                            converseHistListIndex = 0,
                            emailThumbnailCount   = 0,
                            callStart             = Date.now();

                        var processNextConverseHistItem = function() {
                            if (converseHistListIndex < converseHistListCount) {
                                if (json.ConverseHistList[converseHistListIndex].ItemType == "MsgItem") {
                                    if (json.ConverseHistList[converseHistListIndex].ItemData.FileInfoList.length > 0) {

                                        processGetMessageThumbnails(json.ConverseHistList[converseHistListIndex].ItemData, json.ConverseHistList[converseHistListIndex].ItemData.FileInfoList);
                                    } else {
                                        converseHistListIndex++;
                                        processNextConverseHistItem();                                        
                                    }
                                } else {
                                    converseHistListIndex++;
                                    processNextConverseHistItem();
                                }
                            } else {
                                if (emailThumbnailCount > 0) {
                                    callEnd = Date.now();
                                    append("--- Fetching Email Thumbnail Previews", callStart, callEnd, emailThumbnailCount, "I");
                                }
                                getTextChatMessages(relId);
                            }
                        }

                        var processGetMessageThumbnails = function(itemData, fileList) {
                            var fileListCount = fileList.length,
                                fileListIndex = 0;

                            var processGetNextMessageThumbnail = function() {
                                if (fileListIndex < fileListCount) {
                                    var file = fileList[fileListIndex],
                                        url = self.BASE_URL + self.GET_CONVERSE_FILE_PREVIEW + '?';

                                    if (file.PreviewInd != "N") {
                                        url += 'AuthToken=' + authToken + '&UserName=' + systemUserName + '&RelationId=' + relId + 
                                            '&ConverseId=' + itemData.MsgId + '&ConverseType=' + itemData.MsgType + '&FileId=' + file.Id;

                                        var image = new Image();

                                        image.onload = function () {
                                            emailThumbnailCount++;
                                            fileListIndex++;
                                            processGetNextMessageThumbnail();
                                        }

                                        image.onerror = function(e) {                                        
                                            console.log(e, url, file);
                                            reportError(file, relId, "email");
                                            emailThumbnailCount++;
                                            fileListIndex++;
                                            processGetNextMessageThumbnail();                                            
                                        }                                    

                                        image.src = url;
                                    } else {
                                        fileListIndex++;
                                        processGetNextMessageThumbnail();                                        
                                    }
                                } else {
                                    converseHistListIndex++;
                                    processNextConverseHistItem();                                    
                                }
                            } 

                            processGetNextMessageThumbnail();                                                          
                        }

                        processNextConverseHistItem();

                    }

                    var getTextChatMessages = function(relId) {
                        getTCMessageHistory(relId, function(json) {
                            getTextChatMessagesThumbnails(relId, json);
                        });                        
                    }

                    var getTextChatMessagesThumbnails = function(relId, json) {
                        var msgHistListCount = json.MsgHistList.length;
                            msgHistListIndex = 0,
                            tcThumbnailCount = 0,
                            callStart        = Date.now();

                        var processNextMsgHistItem = function() {
                            if (msgHistListIndex < msgHistListCount) {
                                if (json.MsgHistList[msgHistListIndex].ItemData.FileInfoList.length > 0) {

                                    processGetMessageThumbnails(json.MsgHistList[msgHistListIndex].ItemData, json.MsgHistList[msgHistListIndex].ItemData.FileInfoList);
                                } else {
                                    msgHistListIndex++;
                                    processNextMsgHistItem();                                        
                                }
                            } else {
                                if (tcThumbnailCount > 0) {
                                    callEnd = Date.now();
                                    append("--- Fetching Text Chat Thumbnail Previews", callStart, callEnd, tcThumbnailCount, "I");
                                }
                                getVault(relId);   
                            }
                        }

                        var processGetMessageThumbnails = function(itemData, fileList) {
                            var fileListCount = fileList.length,
                                fileListIndex = 0;

                            var processGetNextMessageThumbnail = function() {
                                if (fileListIndex < fileListCount) {
                                    var file = fileList[fileListIndex],
                                        url = self.BASE_URL + self.GET_CONVERSE_FILE_PREVIEW + '?';

                                    if (file.PreviewInd != "N") {
                                        url += 'AuthToken=' + authToken + '&UserName=' + systemUserName + '&RelationId=' + relId + 
                                            '&ConverseId=' + itemData.MsgId + '&ConverseType=' + itemData.MsgType + '&FileId=' + file.Id;

                                        var image = new Image();

                                        image.onload = function () {
                                            tcThumbnailCount++;
                                            fileListIndex++;
                                            processGetNextMessageThumbnail();
                                        }

                                        image.onerror = function(e) {
                                            console.log(e, url, file);
                                            reportError(file, relId, "textchat");
                                            tcThumbnailCount++;
                                            fileListIndex++;
                                            processGetNextMessageThumbnail();                                            
                                        }                                    

                                        image.src = url;
                                    } else {
                                        fileListIndex++;
                                        processGetNextMessageThumbnail();                                        
                                    }
                                } else {
                                    msgHistListIndex++;
                                    processNextMsgHistItem();                                    
                                }
                            } 

                            processGetNextMessageThumbnail();                                                          
                        }

                        processNextMsgHistItem();
                    }

                    var getVault = function(relId) {                        
                        url = self.BASE_URL + self.GET_VAULT_FILE_LIST;
                        var data = {
                            "AuthToken"         : authToken,
                            "UserName"          : systemUserName,
                            "RelationId"        : relId
                        };
                        callStart = Date.now();                
                        getJSONP(url, data, function(json) {
                            callEnd = Date.now();
                            append("--- " + self.GET_VAULT_FILE_LIST, callStart, callEnd, json.VaultFileList.length, "R");
                            getVaultThumbnails(relId, json);
                        });                        
                    }

                    var getVaultThumbnails = function(relId, json) {
                        var vaultFileListCount = json.VaultFileList.length;
                            vaultFileListIndex = 0,
                            vaultThumbnailCount = 0,
                            callStart        = Date.now();

                        var processNextVaultFileItem = function() {
                            if (vaultFileListIndex < vaultFileListCount) {
                                var file = json.VaultFileList[vaultFileListIndex],
                                    url = self.BASE_URL + self.GET_VAULT_FILE_PREVIEW + '?';

                                if (file.Type == "F") {
                                    if (file.PreviewInd != "N") {
                                        url += 'AuthToken=' + authToken + '&UserName=' + systemUserName + '&RelationId=' + relId + '&FileId=' + file.Id;

                                        var image = new Image();

                                        image.onload = function () {
                                            vaultThumbnailCount++;
                                            vaultFileListIndex++;
                                            processNextVaultFileItem();
                                        }

                                        image.onerror = function(e) {
                                            console.log(e, url, file);
                                            reportError(file, relId, "vault");
                                            vaultThumbnailCount++;
                                            vaultFileListIndex++;
                                            processNextVaultFileItem();                                            
                                        }                                    

                                        image.src = url;
                                    } else {
                                        vaultFileListIndex++;
                                        processNextVaultFileItem();                                     
                                    }
                                } else {
                                    vaultFileListIndex++;
                                    processNextVaultFileItem(); 
                                }
                            } else {
                                if (vaultThumbnailCount > 0) {
                                    callEnd = Date.now();
                                    append("--- Fetching Vault Thumbnail Previews", callStart, callEnd, vaultThumbnailCount, "I");
                                }
                                currentTypeRelListIndex++;
                                processNextTypeRelListEntry();  
                            }
                        }

                        processNextVaultFileItem();
                    }

                    processNextRelationListEntry();
                } else {
                    getAccountManagement();
                }
            }

            var getAccountManagement = function() {
                //Already have the following info:
                //self.GET_USER_INFO                  = "getUserInfo.php";
                //self.GET_RELATED_USERS              = "getRelatedUsers.php";
                //self.GET_USER_RELATIONS             = "getUserRelations.php";                
                url = self.BASE_URL + self.GET_MANAGED_USERS;
                var data = {
                    "AuthToken"             : authToken,
                    "UserName"              : systemUserName,                    
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append(self.GET_MANAGED_USERS, callStart, callEnd, json.RoleList.length, "R");
                    
                    url = self.BASE_URL + self.GET_RELATIONSHIP_ROLES;
                    callStart = Date.now();
                    getJSONP(url, data, function(json) {
                        callEnd = Date.now();
                        append(self.GET_RELATIONSHIP_ROLES, callStart, callEnd, json.RelationRoleList.length, "R");
                        finalise();
                    });
                }); 
            }

            var finalise = function() {
                startButton.attr('disabled', false);
                startButton.addClass("spinner spinner-inverse spinner-sm");                
                startButton.html("Run Again");

                currentTotalHeader.html("Total Time");                

                totalTimeElement.html(millisToMinutesAndSeconds(totalTime));

                if (totalRecordsTime > 10000) {
                    rDuration.html(millisToMinutesAndSeconds(totalRecordsTime));
                }

                if (totalImagesTime > 10000) {
                    iDuration.html(millisToMinutesAndSeconds(totalImagesTime));
                }

                if (totalCustAndPreload > 10000) {
                    cTime.html(millisToMinutesAndSeconds(totalCustAndPreload));
                }
            }

            var getConverseHistory = function(relId, callback) {
                url = self.BASE_URL + self.GET_CONVERSE_HISTORY;

                var data = {
                    "AuthToken"             : authToken,
                    "UserName"              : systemUserName,
                    "ExclEmptyTextChatFlag" : "Y",
                    "GroupTextChatMsgsFlag" : "Y",
                    "IncIPTextChatFlag"     : "Y",
                    "OnlyCurrRelsFlag"      : "Y",
                    "ReturnTotalNumFlag"    : "Y",
                    "RelationId"            : relId
                };
                callStart = Date.now();                
                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append("- " + self.GET_CONVERSE_HISTORY + " " + relId, callStart, callEnd, json.ConverseHistList.length, "R");
                    callback(json);
                });                
            } 

            var getTCMessageHistory = function(relId, callback) {
                url = self.BASE_URL + self.GET_MESSAGE_HISTORY;

                var data = {
                    "AuthToken"             : authToken,
                    "UserName"              : systemUserName,
                    "MsgTypeFilter"         : "T",
                    "RelationId"            : relId
                };

                callStart = Date.now();   

                getJSONP(url, data, function(json) {
                    callEnd = Date.now();
                    append("--- Fetching Text Messages", callStart, callEnd, json.MsgHistList.length, "R");
                    callback(json);
                });                
            }                        

            companyPreloadOne();
        }

        var getHTTP = function(url, data, successCallback, failureCallback) {
            console.log("Utils: getJSONP: getting " + url);

            $.ajax({
                type: "GET",
                url: url,
                data: data,
                async:true,
                crossDomain:true,
                success: function(json) {
                    console.log( "Utils: getURL: JSON Data: success", url, json);
                    successCallback( json );
                },
                error: function(xhr, status, msg) {
                    console.log( "Utils: getURL: getURL: Error Request Failed: ", xhr, status, msg);
                }
            });         
        }         

        var getJSONP = function(url, data, successCallback, failureCallback) {
            console.log("Utils: getJSONP: getting " + url);

            $.ajax({
                type: "GET",
                url: url,
                data: data,
                async:true,
                dataType:"json",
                crossDomain:true,
                success: function(json) {
                    console.log( "Utils: getURL: JSON Data: success", url, json);
                    successCallback( json );
                },
                error: function(xhr, status, msg) {
                    console.log( "Utils: getURL: getURL: Error Request Failed: ", xhr, status, msg);
                }
            });         
        }  

        var getJSONPost = function(url, data, successCallback, failureCallback) {
            console.log("Utils: getJSONPost: getting " + url + " " + data + " " + JSON.stringify( data ) );

            $.ajax({
                type : 'POST',
                url : url,
                data : data,
                success : function(json){
                    console.log( "Utils: getURL: JSON Data: success", url, json);
                    successCallback( json );
                },
                error: function(xhr, status, msg) {
                    console.log( "Utils: getPost: Error Request Failed: " + url + " error:", xhr, status, msg);
                }           
            }) 
        }

        var reportError = function(file, relId, type) {
            errorElement.append("<br>Failed loading " + type + " thumbnail for file: ", file.Id, "rel: ", relId, " see console log.");
        }
        
        var append = function(url, startTime, endTime, count, type) {
            var duration = endTime - startTime;
                color = duration > 1000 ? ' style="color:blue"' : ""; 

            totalTime += duration;

            totalTimeElement.html(totalTime);

            if (type == "R") {
                totalRecords += count;
                totalRecordsTime += duration;

                rCount.html(totalRecords);
                rDuration.html(totalRecordsTime);
            } else if (type == "I") {
                totalImages  += count;
                totalImagesTime += duration;

                iCount.html(totalImages);
                iDuration.html(totalImagesTime);                
            } else if (type == "C") {
                totalCustAndPreload += duration;
                cTime.html(totalCustAndPreload);
            }

            resultsTable.append("<tr" + color + "><td>" + url + "</td><td>" + duration + "</td><td>" + count + "</td><td>" + 0 + "</td></tr>");
        }

        var toCamelCase = function(str) {
          // Lower cases the string
          return str.toLowerCase()
            // Replaces any - or _ characters with a space 
            .replace( /[-_]+/g, ' ')
            // Removes any non alphanumeric characters 
            .replace( /[^\w\s]/g, '')
            // Uppercases the first character in each group immediately following a space 
            // (delimited by spaces) 
            .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
            // Removes spaces 
            //.replace( / /g, '' );
        }

        var toTitleCase = function(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        var millisToMinutesAndSeconds = function(millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        var setUpConstants = function() {            
            self.NON_API_BASE_URL = window.location.origin + "/ao/";

            self.BASE_URL = "https://www.econumysecure.com/ao_ws/api/";            
            if (window.location.host.indexOf("localhost") == 0 || 
                window.location.host.indexOf("1") == 0 || //like localhost
                window.location.host.indexOf("e c o numy".replaceAll(" ", "") + "secure.com") > -1) {

                self.NON_API_BASE_URL = "https://www.econumysecure.com/ao/";
            } else {
                if ( window.location.host.indexOf("secured-comm.com") > -1 ) {            
                    self.BASE_URL        = "https://api.secured-comm.com/ao_ws/api/";                    
                } else {
                    self.BASE_URL        = "https://api.alwaysorg.com/ao_ws/api/"; //"../ao_ws/api/";
                }
            }

            self.LOGIN_API                      = "authUserLogin.php";
            self.LOGOUT_API                     = "recordUserLogOut.php";
            self.PROCESS_PIN_FOR_LOGIN          = "processPinForLogin.php";
            self.GET_USER_INFO                  = "getUserInfo.php";
            self.GET_APP_VERSION                = "getAppVersion.php";
            self.GET_RELATED_USERS              = "getRelatedUsers.php";            
            self.GET_USER_RELATIONS             = "getUserRelations.php";
            self.GET_CONVERSE_HISTORY           = "getConverseHist.php";
            self.GET_CONVERSE_HISTORY_TOTALS    = "getConverseHistTotals.php";
            self.GET_CONVERSE_FILE_PREVIEW      = "getConverseFilePreview.php";
            self.GET_MESSAGE_HISTORY            = "getMessageHist.php";
            self.GET_VAULT_FILE_LIST            = "getVaultFileList.php";
            self.GET_VAULT_FILE_PREVIEW         = "getVaultFilePreview.php";

            self.GET_COMPANY_API_DEPLOY_BASE_URL= "getCompanyApiDeployBaseUrl.php";
            self.IS_CONTACT_DIRECTORY_AVAILABLE = "isContactDirectoryAvailable.php";

            //Account Management
            //self.GET_USER_INFO                  = "getUserInfo.php";
            self.GET_MANAGED_USERS              = "getManagedRoles.php";
            self.GET_RELATIONSHIP_ROLES         = "getRelationshipRoles.php";
            //self.GET_RELATED_USERS              = "getRelatedUsers.php";
            //self.GET_USER_RELATIONS             = "getUserRelations.php";
        }
    }  
};

app.initialize();
//app.receivedEvent();