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
<!--[if gt IE 8]><!--> <html class="no-js ao-logged-out"> <!--<![endif]-->
    <head>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />        

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1">        
        <title>Secure Portal - Connecting</title>
        <meta name="description" content="">

        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <meta name="apple-itunes-app" content="app-id=1005595620, app-argument=myURL">
        <link rel="manifest" href="<?php echo get_android_install_manifest(); ?>">

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
        <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">
        <link rel="icon" type="image/png" href="/favicon-160x160.png" sizes="160x160">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/mstile-144x144.png">

        <link rel="stylesheet" href="teleport/css/bootstrap.min.css">

        <link rel="stylesheet" href="teleport/css/bootstrap-theme.min.css">        
        <link rel="stylesheet" href="teleport/css/jquery-ui.css">                  
        <link rel="stylesheet" href="teleport/css/style.css">
    </head>
    <body>       
        <nav class="navbar navbar-expand-md fixed-top bg-inverse ao-nav">
          <img src="teleport/img/sp-logo.png" class="navbar-brand"></img>
        </nav>

        <div class="ao-section-app">
            <div class="ao-app-promo">
              <!--div class="ao-app-promo-title"></div-->
              <div class="ao-app-promo-desc">Secure Portal</div>
            </div>
          <div class="ao-app">
            <div class="ao-app-device-img"></div>
          </div>
        </div>

        <div class="container ao-instructions-container">
          <!--div class="row">
              <h1 class="display-3">Some Title</h1>
              <p>Some instruction text, about what to click in order to install the app.</p>
              <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>      
          </div-->

          <!--http://loading.io<-->
          <div class="row ao-browser-instructions">      
            <!--img class="loader" src="teleport/img/spin.gif"-->
            <div id="ao-browser-instructions" class="ao-to-site"><p>If this page does not redirect after 5 seconds <a class="ao-anchor-link btn btn-secondary" href="#" role="button">click here &raquo;</a></p></div>
          </div>

          <div class="row ao-native-instructions">
            <div class="ao-instructions-heading">You have received a&nbsp;secure&nbsp;message</div> 
            <div class="ao-app-box-container">
              <div class="ao-to-site" id="ao-native-instructions"><p>Or go to the <a class="ao-anchor-link btn btn-secondary" href="#" role="button"><img src="teleport/img/ios/safari-icon.png"  width="60" height="60" class="ao-app-image">Open in browser</a></p></div>
              <a class="btn btn-secondary ao-app-box" href="#" role="button" id="ao-install"><p><img src="teleport/img/ios/secure-portal-icon.png" width="60" height="60" class="ao-app-image"><br><span id="ao-app-text">Open in<br>Secure Portal</span></p></a>
            </div> 
          </div>
                
          

          <!--footer>
            <p>&copy; Stay Private 2017</p>
          </footer-->          
          <div id="DisplayTeleportPage" style="display:none"></div>
          <div id="company-ident" style="display:none"></div>
        </div> <!-- /container -->

        <script src="teleport/js/lib/modernizr.min.js"></script>
        <script src="teleport/js/lib/jquery.js"></script>
        <script src="teleport/js/lib/bootstrap.min.js"></script> 

        <script type="text/javascript" src="js/preload/companyPreload.php?getCompIdentOnly=Y"></script>

        <script src="teleport/js/lib/bowser.min.js"></script>                                        
        <script src="teleport/js/teleport-script.js"></script>
        <script src="teleport/js/mobile/mobmain.js"></script>

        <!--script type="text/javascript" src="js/preload/companyPreload.php"></script-->

        <div id="preview-android-toast" class="preview-android-toast" style="position:absolute; bottom:10%; width:100%; display:none">
            <div style="background-color:white; width:40%; margin-left: auto; margin-right: auto; height:auto; padding:0.35em 0.3em 0 0.3em; text-align:center; border-radius:5px; border:1px solid; box-shadow: 1x 1px 1px #888888; border-color:#1d1d1d">
                <p id="preview-android-toast-text" style="font-size:1.4em">Loading...</p>
            </div>
        </div>                        

<!-- Remove once stack modal is ready -->
        <div class="modal fade in" id="defaultModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="defaultModalXClose">&times;</button>
                <h4 class="modal-title" id="defaultModalLabel">Modal title</h4>
              </div>
              <div class="modal-body" id="defaultModalBody">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="defaultModalClose">Close</button>
                <button type="button" class="btn btn-primary" id="defaultModalOk">Save changes</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
<!-- Remove once stack modal is ready -->

    <div id="loaderFS-wrapper">
      <div id="loaderFS"></div>

      <div class="loaderFS-section section-left"></div>
            <div class="loaderFS-section section-right"></div>

    </div>

    </body>
</html>