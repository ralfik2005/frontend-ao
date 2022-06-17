<?php
function get_android_install_manifest()
{
    error_log('server host = ' . $_SERVER['HTTP_HOST']);
    $host_arr = explode('.', $_SERVER['HTTP_HOST']);
    $subdomain = $host_arr[0];
    error_log('subdomain = ' . $subdomain);
    if (strcasecmp($subdomain, 'syncedup') == 0 ||
        strcasecmp($subdomain, 'personal') == 0) {
        return 'teleport/su-manifest.json';
    } else if (strcasecmp($subdomain, 'chatfoss') == 0) {
        return 'teleport/cf-manifest.json';
    } else {
        return 'teleport/sp-manifest.json';
    }
}
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 ao-logged-out"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 ao-logged-out"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 ao-logged-out"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js ao-logged-out">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta content="IE=edge;chrome=1" http-equiv="X-UA-Compatible">
<title>Secure Portal</title>
<meta content="" name="description">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-itunes-app" content="app-id=1005595620, app-argument=myURL">
<link rel="manifest" href="<?php echo get_android_install_manifest(); ?>">
<!--meta name="viewport" content="width=device-width"-->
<link href="/apple-touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57">
<link href="/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114">
<link href="/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72">
<link href="/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
<link href="/apple-touch-icon-60x60.png" rel="apple-touch-icon" sizes="60x60">
<link href="/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120">
<link href="/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76">
<link href="/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152">
<link href="/favicon-196x196.png" rel="icon" sizes="196x196" type="image/png">
<link href="/favicon-160x160.png" rel="icon" sizes="160x160" type="image/png">
<link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png">
<link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
<link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
<meta content="#da532c" name="msapplication-TileColor">
<meta content="/mstile-144x144.png" name="msapplication-TileImage">
<link rel="stylesheet" href="css/css.css">

<!-- build:css css/vendor.min.css -->

<!-- /build -->
<!--link rel="stylesheet" href="css/bootstrap.css">
<style>
body {
padding-top: 50px;
padding-bottom: 20px;
}
</style>
<link rel="stylesheet" href="css/bootstrap-theme.min.css">
<link rel="stylesheet" href="css/jquery-ui.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/jquery-radiobuttons.css">
<link rel="stylesheet" href="css/jQuery.switchButton.css"-->


<link rel="stylesheet" href="css/ao.css"><link rel="stylesheet" href="css/css1.css">
<!--link href="css/widgets/kendo.common.min.css" rel="stylesheet">
<link href="css/widgets/kendo.default.min.css" rel="stylesheet" -->

<!--link href="css/widgets/animateModal.min.css" rel="stylesheet"-->








<link rel="stylesheet" href="css/editor.override.css"><link rel="stylesheet" href="css/css2.css">
<!--link rel="stylesheet" href="css/screen.css"-->
<!--link rel="stylesheet" href="css/font-awesome.min.css"-->



<!-- build:css css/contact.min.css -->

<!-- /build -->
<!-- build:css css/mail.min.css -->

<!-- /build -->
<!-- build:css css/compose.min.css -->

<!-- /build -->
<!-- build:css css/messenger.min.css -->

<!-- /build -->
<!-- build:css css/elephant.min.css -->

<!-- /build -->
<!-- build:css css/application.min.css -->

<!-- /build -->
<!-- build:css css/main.min.css -->

<!-- /build -->
<!-- build:css css/ao.min.css -->

<!-- /build -->
<!-- build:css css/vault.min.css -->

<!-- /build -->
<!-- build:css css/quick-messages.min.css -->

<!-- /build -->
<!-- build:css css/notifier.min.css -->

<!-- /build -->
<!-- build:css css/call.min.css -->

<!-- /build -->
<!-- build:css css/popup.min.css -->

<!-- /build -->
<!-- build:css css/font-awesome.min.css -->

<!-- /build -->
<link href="css/customer.php" rel="stylesheet" id="customer-styles"><link rel="stylesheet" href="css/css3.css">

<!--META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1"-->
<!--[if IE]>
<style>
.ie_scroll {
scrollbar-base-color: #C0C0C0;
scrollbar-base-color: #C0C0C0;
scrollbar-3dlight-color: #C0C0C0;
scrollbar-highlight-color: #C0C0C0;
scrollbar-track-color: #EBEBEB;
scrollbar-arrow-color: black;
scrollbar-shadow-color: #C0C0C0;
scrollbar-dark-shadow-color: #C0C0C0;
}
</style>
<![endif]-->
</head>
<body class="layout layout-header-fixed layout-sidebar-fixed not-accounts search-on loaded">
<div class="vault-popups">
<div class="vault-delete-popup-container"></div>
<div class="vault-rename-popup-container"></div>
<div class="vault-new-folder-popup-container"></div>
<div class="relationships-select-popup-container"></div>
<div class="path-input-popup-container"></div>
<div class="folder-select-popup-container"></div>
</div>
<div class="vault-preview-container"></div>
<div class="refresh"></div>
<div class="ao-wall" style="display:none"></div>
<div class="ao-logo" id="ao-logo"></div>
<div class="ao-wall2" style="display:none"></div>
<!--div class="modal fade" tabindex="-1" role="dialog" id="modal">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">×</span>
</button>
<h4 class="modal-title"></h4>
</div>
<div class="modal-body"></div>
<div class="modal-footer">
<button type="button" class="btn btn-default modal-cancel" data-dismiss="modal"></button>
<div class="dropdown d-ib">
<button type="button" class="btn btn-default middle-btn dropdown-toggle" data-dismiss="modal">Default</button>
<ul class="dropdown-menu dropdown-menu-right" style="width: 210px">
<li class="input-group">
<input type="text" class="form-control" placeholder="Write reject message">
<span class="input-group-btn">
<button class="btn btn-transparent" type="button">Send</button>
</span>
</li>
<li><a href="#">Sorry, I can't talk right now.</a></li>
<li><a href="#">I'm on my way.</a></li>
<li><a href="#">Can I call you later?</a></li>
</ul>
</div>
<button type="button" class="btn btn-primary modal-confirm" data-dismiss="modal"></button>
</div>
</div>
</div>
</div-->
<!--div class="ao-login" id="ao-login">
<div class="ao-login-logo" id="ao-login-logo"></div-->
<!--div class="ao-login-form" id="ao-login-form">
<div class="ao-login-instructions"></div><input autocomplete="off" class="ao-login-username" id="username" placeholder="Username" spellcheck="false" type="text"> <input autocomplete="off" class="ao-login-ident" id="company-ident" placeholder="Unique Company ID" spellcheck="false" type="text"> <input autocomplete="off" class="ao-login-password" id="password" placeholder="Password" spellcheck="false" type="password">
<div class="ao-login-btn-container" id="ao-login-btn-container">
<button class="btn ao-login-btn" id="ao-login-btn" type="button">Sign In</button>
</div><a href="#" id="ao-forgot-pwd">Forgotten password?</a>
<div class="ao-form-errors"></div>
<div class="ao-register"></div>
</div>
<div class="ao-login-form" id="ao-login-pwd-reset-request">
<p id="ao-login-pwd-reset-request-text">Request password reset</p><input autocomplete="off" class="ao-login-username" id="username-reset-request" placeholder="Username" spellcheck="false" type="text"> <input autocomplete="off" class="ao-login-ident" id="email-address-reset-request" placeholder="Email Address" spellcheck="false" type="text"> <input autocomplete="off" class="ao-login-password" id="company-id-reset-request" placeholder="Company Ident" spellcheck="false" type="text">
<div class="ao-login-btn-container">
<button class="btn ao-login-btn" id="ao-gen-user-pwd-reset-back" type="button">Cancel</button> <button class="btn ao-login-btn" id="ao-gen-user-pwd-reset" type="button">Send</button>
</div>
<div class="ao-form-errors"></div>
</div-->
<div class="login" style="opacity:0; display:none">
<div class="login-body">
<a class="login-brand" href="index.html">
<img id="ao-login-logo" class="img-responsive ao-login-logo">
</a>
<h3 class="login-heading">Sign in</h3>
<div class="ao-login-instructions"></div>
<div class="login-form" id="ao-login-form">
<form data-toggle="md-validator">
<div class="md-form-group md-label-static">
<input id="username" class="md-form-control" type="text" name="username" spellcheck="false" autocomplete="off" data-msg-required="Please enter your username." required value="">
<label class="md-control-label">Username</label>
</div>
<div class="md-form-group md-label-static company-ident-container">
<input id="company-ident" class="md-form-control" type="text" name="company-ident" spellcheck="false" autocomplete="off" data-msg-required="Please enter the company identifier." required value="">
<label class="md-control-label">Company Identifier</label>
</div>
<div class="md-form-group md-label-static">
<input id="password" class="md-form-control" type="password" name="password" minlength="1" data-msg-required="Please enter your password." required value="">
<label class="md-control-label">Password</label>
</div>
<div class="md-form-group md-custom-controls">
<!--label class="custom-control custom-control-primary custom-checkbox">
<input class="custom-control-input" type="checkbox" checked>
<span class="custom-control-indicator"></span>
<span class="custom-control-label">Keep me signed in</span>
</label-->
<a href="#" id="ao-forgot-pwd">Forgot password?</a>
</div>
<button id="ao-login-btn" class="btn btn-primary btn-block">Sign in</button>
<div class="ao-form-errors"></div>
</form>
</div>
<div class="login-form" id="ao-login-pwd-reset-request">
<form data-toggle="md-validator">
<div class="md-form-group md-label-static">
<input id="username-reset-request" class="md-form-control" type="text" name="username-reset-request" spellcheck="false" autocomplete="off" value="">
<label class="md-control-label">Username</label>
</div>
<div class="md-form-group md-label-static">
<input id="email-address-reset-request" class="md-form-control" type="text" name="email-address-reset-request" spellcheck="false" autocomplete="off" data-msg-required="Email Address Required." required value="">
<label class="md-control-label">Email Address</label>
</div>
<div class="md-form-group md-label-static company-ident-container">
<input id="company-id-reset-request" class="md-form-control" type="text" name="company-id-reset-request" spellcheck="false" autocomplete="off" data-msg-required="Company Indent." required value="">
<label class="md-control-label">Company Indent</label>
</div>
<button id="ao-gen-user-pwd-reset" class="btn btn-primary btn-block">Send</button>
<button id="ao-gen-user-pwd-reset-back" class="btn btn-primary btn-block">Cancel</button>
<div class="ao-form-errors"></div>
</form>
</div>
<div class="login-form" id="ao-login-pwd-reset">
<form data-toggle="md-validator">
<div class="md-form-group md-label-static">
<input id="username-reset" class="md-form-control" type="text" name="username-reset" spellcheck="false" autocomplete="off" value="">
<label class="md-control-label">Username</label>
</div>
<div class="md-form-group md-label-static">
<input id="pwd1-reset" class="md-form-control" type="password" name="pwd1-reset" minlength="1" data-msg-required="New Password Required" required value="">
<label class="md-control-label">New Password</label>
</div>
<div class="md-form-group md-label-static">
<input id="pwd2-reset" class="md-form-control" type="password" name="pwd2-reset" minlength="1" data-msg-required="Confirm Password Required" required value="">
<label class="md-control-label">Confirm Password</label>
</div>
<div class="md-form-group md-label-static company-ident-container">
<input id="company-id-reset" class="md-form-control" type="text" name="company-id-reset" spellcheck="false" autocomplete="off" data-msg-required="Company Indent." required value="">
<label class="md-control-label">Company Indent</label>
</div>
<button id="ao-user-pwd-reset" class="btn btn-primary btn-block">Reset</button>
<div class="ao-form-errors"></div>
</form>
</div>
<div class="login-footer"></div>
</div>
</div>
<!--div class="ao-login-form" id="ao-login-pwd-reset">
<p id="ao-login-pwd-text">Reset your password</p><input autocomplete="off" class="ao-login-username" id="username-reset" placeholder="Username" spellcheck="false" type="text"> <input autocomplete="off" class="ao-login-ident" id="pwd1-reset" placeholder="Password" spellcheck="false" type="password"> <input autocomplete="off" class="ao-login-ident" id="pwd2-reset" placeholder="Confirm Password" spellcheck="false" type="password"> <input autocomplete="off" class="ao-login-password" id="company-id-reset" placeholder="Company Ident" spellcheck="false" type="text">
<div class="ao-login-btn-container">
<button class="btn ao-login-btn" id="ao-user-pwd-reset-back" type="button">Cancel</button> <button class="btn ao-login-btn" id="ao-user-pwd-reset" type="button">Reset</button>
</div>
<div class="ao-form-errors"></div>
</div-->
<!--/div-->
<div class="layout-header">
<div class="navbar navbar-default"></div>
<div class="layout-content-header"></div>
<div>
<div class="layout-sidebar">
<div class="layout-sidebar-backdrop"></div>
<div class="layout-sidebar-body">
<nav id="sidenavMain" class="sidenav-collapse">
</nav>
</div>
<div class="layout-sidebar-body ao_div_align_bottom">
<nav id="sidenavNew" class="sidenav-collapse collapse">
</nav>
</div>
</div>
<div class="layout-sidebar second-navbar">
<div class="layout-sidebar-backdrop"></div>
<div class="layout-sidebar-body">
<nav id="sidenavSecond" class="sidenav">
</nav>
</div>
</div>
</div>
</div>
<div class="layout-main">
<div class="layout-content">
<div class="layout-content-body">
<div class="ao-logged-out ao-middle">
<div id="ao-drag-drop">
<div class="drag-helper" style="top:-40px"></div>
<div class="blocker"></div>
</div>
<div id="mainStage">
<div class="main-content" id="main-content-dash">
<div class="ao-dashboard-nav-container" id="ao-dashboard-nav-container"></div>
<div class="ao-dashboard-list-container" id="ao-dashboard-list-container">
<div id="ao-dashboard-pagination-bar" class="row ao-customer-color ao-pagination">
<div class="col-lg-4 col-1">
<a class="ao-customer-color ao-dashboard-back" href="#" id="ao-dashboard-back" style="text-decoration:none; display:none"><i class="ao-font-icon ao-font-icon-dashprev"></i> <span id="ao-dashboard-back-label">&nbsp;Groups Listing&nbsp;</span> <!-- AB </button> --></a> <button class="btn btn-default btn-clear ao-btn-small-enabled ao-dashboard-refresh" id="ao-dashboard-refresh" style="outline-width:0"><i class="ao-font-icon ao-font-icon-refresh"></i></button>
</div>
<div class="col-lg-4 col-2 ao-color-grey" id="ao-dashboard-index">
<span id="ao-dashboard-index-label">1-50 of 300&nbsp;</span> <button class="btn btn-default btn-clear ao-btn-small-disabled ao-customer-color-disabled" id="ao-dashboard-left" style="outline-width:0"><span class="ao-font-icon ao-font-icon-dashprev"></span></button> &nbsp; <button class="btn btn-default btn-clear ao-btn-small-disabled" id="ao-dashboard-right" style="outline-width:0"><span class="ao-font-icon ao-font-icon-dashnext"></span></button>
</div>
</div>
<div id="ao-dashboard-list-and-sub-container">
<table cellspacing='0' id="ao-dashboard-list"></table>
<div class="ao-dashboard-sub-container" id="ao-dashboard-sub-container"></div>
</div>
</div>
</div>
<div class="ao-comms-container" id="ao-comms-container">
<!--div class="{title:'+ Note', url:'parts/extruderTop.html'}" id="extruderTop"></div-->
<div class="ao-comms-individual-container" id="ao-comms-individual-container"></div>
<div id="ao-presence-container" style="display: none;">
<div class="dropup ao-customer-color" style="position:absolute; bottom:60px">
<button class="btn btn-default btn-presence" data-toggle="dropdown" style="outline-width:0"><span class="presence-txt" id="presence-txt">Presence &nbsp;</span><span class="caret"></span></button>
<ul class="dropdown-menu presence-menu" id="ao-presence-list"></ul>
</div>
</div>
<div class="ao-test-container" id="ao-test-container"></div>
</div>
<div class="ao-account-management-container" id="ao-account-management-container"></div>
<div class="ao-promotion-container" id="ao-promotion-container"></div>
<div class="ao-theme-container" id="ao-theme-container" style="z-index:0"></div>
<div class="ao-controller-container" id="ao-controller-container"></div>
<div class="ao-vendor-container" id="ao-vendor-container" style="z-index:0"></div>
<div class="ao-invite" id="ao-invite" style="display:none"></div>
<div class="ao-user-activity-container" id="ao-user-activity-container"></div>
<div class="resetPwdOnlyEmail" id="resetPwdOnlyEmail" style="display:none"></div>
</div><!-- id="mainStage" -->
<!--/div--><!-- inserted end main stage -->
<div class="ao-foot" id="ao-foot" style="display: none;">
<div id="ao-commsfooter">
<div class="ao-rec-msg-footer" id="ao-rec-msg-footer"></div>
<div class="ao-make-call-footer" id="ao-make-call-footer"></div>
<div class="ao-jam-footer" id="ao-jam-footer"></div>
<div class="ao-vault-footer" id="ao-vault-footer"></div>
</div>
<div class="ao-testfooter" id="ao-testfooter"></div>
</div>​
</div><!-- inserted end of middle -->
</div>
<div id="quick-messages-feature" class="clearfix"></div>
<div id="upload-progress-notification">
<div class="title">
<span id="ao-upload-files-title">Uploading files...</span><span class="controls upload-collapse" id="ao-upload-files-hide">Hide</span><span class="controls upload-expand" id="ao-upload-files-show">Show</span>
</div>
<div id="upload-progress-iframe"></div>
<div id="download-iframe"></div>
</div>
</div>
<!--div class="layout-footer">
<div class="layout-footer-body">
<small>Thank you for creating with <a href="http://www.codelegs.com">Codelegs</a>.</small>
</div>
</div-->
</div>
<!-- Contains Page Layout Options -->
<div class="theme"></div>
<script src="js/js.js"></script>
<!--script src="js/app/lib/jquery.min.js"></script-->
<!-- build:js js/vendor.min.js -->

<!-- /build -->
<!-- build:js js/ao.min.js -->

<!-- /build -->
<!-- following prevents normal drop down menus from working -->
<!--script src="js/app/utils/dropdowns-enhancement.js"></script-->

<!--script src="resources/js/libs/jquery.ui.touch-punch.min.js"></script-->



<!--script src="resources/js/utils/bootstrap-dialog.js"></script-->
<!--script src="js/app/utils/bootstrap-dialog.js"></script-->
<!--script src=https://cdn.pubnub.com/pubnub.min.js></script-->



<!--script src="resources/js/libs/fastclick.min.js"></script-->
<!--script src="js/app/lib/jquery-modal.js"></script-->





<!--script src="js/app/lib/pixastic.js"></script-->
<!--script src="js/app/lib/kendo.web.min.js" charset="utf-8" ></script-->




<!--script src="resources/js/libs/backbone.min.js"></script-->


<!--script src="js/app/lib/jquery.slimscroll.js"></script-->
<!--script type="text/javascript" src="http://api.addlive.com/stable_v3/addlive-sdk.js"></script-->
<!--script src="js/app/lib/adl/addlive-sdk.js"></script-->
<!-- Removed 17/05/2018 -->
<!--script src="js/app/lib/adl3/addlive-sdk.js"></script-->
<!--script type="text/javascript" src="addlive-sdk.js"></script-->
<!--script type="text/javascript" src="addlive-mobile-sdk.js"></script--> <!--script src="js/app/lib/adl/scripts.js"></script-->
<!--script src="js/app/lib/adl/sha256.js"></script--> <!--script src="js/app/lib/adl/adl-installation-test.js"></script-->
<!--script src="js/app/lib/adl/adl-utils.js"></script-->
<!--script src="js/app/controllers/adlController.js"></script-->
<!-- Removed 17/05/2018 -->
<!--script src="js/app/lib/adl3/scripts.js"></script>
<script src="js/app/lib/adl3/sha256.js"></script>
<script src="js/app/lib/adl3/adl-installation-test.js"></script>
<script src="js/app/lib/adl3/adl-utils.js"></script>
<script src="js/app/controllers/adl3/adlController.js"></script>
<script src="js/app/controllers/adl3/adlMsgController.js"></script-->




<!--[if lt IE 10]> <script src="resources/js/utils/jquery.placeholder.js"></script> <![endif]-->
<!--script src="js/app/utils/eventbus.js"></script-->

<!--script src="js/app/utils/config.js"></script-->








<!--script src="resources/js/hb.tmp.js"></script-->


<!-- Removed 17/05/2018 -->
<!--script src="js/app/lib/adl3/adl-pre-installation.js"></script-->





































<!--script src="resources/js/utils/tourist.js"></script-->




















<!-- Removed 17/05/2018 -->
<!--script src="js/app/models/user/adlScopeUser.js"></script-->




<!--script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.1/twilio.min.js"></script-->
<!--script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.2/twilio.min.js"></script-->
<!--script src="//static.twilio.com/libs/twiliojs/1.1/twilio.js" type="text/javascript"></script-->
<!--script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.2/twilio.js"></script-->
<!--script src="twilioSetup/bowser.min.js"></script-->
<!-- Removed 17/05/2018 -->
<!--script src="js/app/controllers/twilioController.js"></script-->

<!-- Removed 17/05/2018 -->
<!--script>
function flashLoaded(){
twilioController.getMicNames();
}
</script-->
<!--script src="js/app/lib/adl3/setup/00_Namespace.js"></script>
<script src="js/app/lib/adl3/setup/conf.tmpl.js"></script>
<script src="js/app/lib/adl3/setup/SA_Connectivity.js"></script>
<script src="js/app/lib/adl3/setup/SA_DevicesSetup.js"></script>
<script src="js/app/lib/adl3/setup/SetupAssistant.js"></script>
<script src="twilioSetup/flash_detect_min.js"></script-->
<!--script src="js/app/lib/zendesk.js"></script-->
<!--script src="js/app/lib/jscolor.js"></script-->

<!--script type="text/javascript" src="imgdownloader.js"></script-->
<!--style type="text/css" media="screen, projection">
@import url(https://assets.zendesk.com/external/zenbox/v2.6/zenbox.css);
</style-->
<!--script src="//wurfl.io/wurfl.js" type="text/javascript"></script-->

<!-- build:js js/models/models.min.js -->

<!-- /build -->
<!-- build:js js/tpls/ao.tpls.min.js -->

<!-- /build -->
<!-- build:js js/filter-and-sort-dropdowns.min.js -->

<!-- /build -->
<!-- build:js js/aoDiary.min.js -->

<!-- /build -->
<!-- build:js js/aoAccounts.min.js -->

<!-- /build -->
<!-- build:js js/aoVednor.min.js -->

<!-- /build -->
<!-- build:js js/aoTheme.min.js -->

<!-- /build -->
<!-- build:js js/aoCall.min.js -->

<!-- /build -->
<!-- build:js js/aoRecording.min.js -->

<!-- /build -->
<!-- build:js js/aoVault.min.js -->

<!-- /build -->
<!-- build:js js/mail.min.js -->

<!-- /build -->
<!-- build:js js/compose.min.js -->

<!-- /build -->
<!-- build:js js/messenger.min.js -->

<!-- /build -->
<!-- build:js js/call-indicator.min.js -->

<!-- /build -->
<!-- build:js js/tab-menu-slider.min.js -->

<!-- /build -->
<!-- build:js js/quick-messages.min.js -->

<!-- /build -->
<!-- build:js js/notifier.min.js -->

<!-- /build -->
<!-- build:js js/call.min.js -->

<!-- /build -->
<!-- build:js js/popup.min.js -->

<!-- /build -->
<!-- build:js js/aoApp.min.js -->

<!-- /build -->
<!-- build:js js/aoModelController.min.js -->

<!-- /build -->
<!-- build:js js/aoApp.min.js -->

<!-- /build -->
<!-- build:js js/application.min.js -->

<!-- /build -->
<!-- build:js js/vault-feature.min.js -->

<!-- /build -->
<!-- build:js js/recording.min.js -->

<!-- /build -->
<script>
var di = Utils.getDeviceIdentifier();
$('<script>').attr({
src: 'js/preload/companyPreload.php?devId=' + di,
type: 'text/javascript'}).appendTo('body')
</script>
<!--script type="text/javascript" src="js/preload/companyPreload.php"></script-->
<div class="dialog_confirm_zindex" id="dialog-confirm" title="">
<p id="dialog-confirm-text"></p>
</div>
<div class="preview-android-toast" id="preview-android-toast" style="position:absolute; bottom:10%; width:100%; display:none">
<div style="background-color:white; width:40%; margin-left: auto; margin-right: auto; height:auto; padding:0.35em 0.3em 0 0.3em; text-align:center; border-radius:5px; border:1px solid; box-shadow: 1x 1px 1px #888888; border-color:#1d1d1d">
<p id="preview-android-toast-text" style="font-size:1.4em">Loading...</p>
</div>
</div>
<div id="ao-temp-store" style="display:none"></div>
<div class="ao-teleport-welcome-page" id="ao-teleport-welcome-page">
<div class="ao-teleport-welcome-contents" id="ao-teleport-welcome-contents">
<h3 id="ao-teleport-welcome-text">Welcome! Please choose where you would like to go first:</h3><input class="btn btn-default" id="teleportGoToRelationship" type="button" value="Go directly to the communications group"><br>
<input class="btn btn-default" id="teleportGoToDash" type="button" value="Go to my dashboard to see all recent activity">
</div>
</div><!-- Remove once stack modal is ready -->
<div aria-hidden="true" aria-labelledby="defaultModalLabel" class="modal fade in" data-backdrop="static" id="defaultModal" role="dialog" tabindex="-1">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button aria-hidden="true" class="close" data-dismiss="modal" id="defaultModalXClose" type="button">&times;</button>
<h4 class="modal-title" id="defaultModalLabel">Modal title</h4>
</div>
<div class="modal-body" id="defaultModalBody">
...
</div>
<div class="modal-footer">
<button class="btn btn-default" data-dismiss="modal" id="defaultModalClose" type="button">Close</button> <button class="btn btn-primary" id="defaultModalOk" type="button">Save changes</button>
</div>
</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div aria-hidden="true" aria-labelledby="modalLabelPrompt" class="modal fade in" data-backdrop="static" id="modalPrompt" role="dialog" tabindex="-1">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button aria-hidden="true" class="close" data-dismiss="modal" id="modalXClosePrompt" type="button">&times;</button>
<h4 class="modal-title" id="modalLabelPrompt">Modal title</h4>
</div>
<div class="modal-body" id="modalBodyPrompt">
...
</div>
<div class="modal-footer">
<button class="btn btn-default" data-dismiss="modal" id="modalClosePrompt" type="button">Close</button> <button class="btn btn-primary" id="modalOkPrompt" type="button">Save changes</button>
</div>
</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- Remove once stack modal is ready -->
<div aria-hidden="true" aria-labelledby="miniModalLabel" class="modal fade in" id="block" role="dialog" tabindex="-1"></div>
<div aria-hidden="true" aria-labelledby="miniModalLabel" class="modal fade in" id="miniModal" role="dialog" tabindex="-1"></div>
<div class="alert alert-success" style="display: none;">
<button aria-hidden="true" class="close" style="margin-top: -2px;" type="button">×</button>
</div>
<div class="alert alert-info" style="display: none;">
<button aria-hidden="true" class="close" style="margin-top: -2px;" type="button">×</button>
</div>
<div class="alert alert-warning" style="display: none;">
<button aria-hidden="true" class="close" style="margin-top: -2px;" type="button">×</button>
</div>
<div class="alert alert-danger" style="display: none;">
<button aria-hidden="true" class="close" style="margin-top: -2px;" type="button">×</button>
</div>
<div class="alert alert-loading" style="display:none;">
<div class="general-loader7" style="float:right; position: relative; top: -5px;"></div><button aria-hidden="true" class="close" style="display:none" type="button">×</button>
</div>
<div class="videoContainerPlayer" id="videoContainerPlayer"></div>
<div id="ao_strip" style="display:none"></div>
<div id="logo-alpha"></div>
<div id="loaderFS-wrapper">
<div id="loaderFS"></div>
<div class="loaderFS-section section-left"></div>
<div class="loaderFS-section section-right"></div>
</div>
<!--div style="min-height: 238px; background-color: blue; width: 100%; color: white; -webkit-user-select: text; position: absolute; z-index: 9999; top: 0px" contenteditable="true"></div-->
</body>
</html>

