Teleport V2.0
==

Note
---------------------------
1. Teleport is still being updated, please ensure any updates made are pushed regularly
2. Image resources are detailed below
3. CSS style resources are detailed below
4. JS resources are detailed below

Image Resources
---------------
1. img/ao-concept: Worth checking out as a Concept Background Image for Quorum
2. img/X-logo: Default logos for mobile device loading page. These are replaced with logos from AO-WS
3. img/spin: This is for the non mobile browsers. It allows transition straight to the Web App. However, after 5 seconds, the spinner is replaced with Click to redirect buttons
4. img/android: Folder containing Android specific images
5. img/android/X_android_mobile: Where X is either cf, sp, su. The mobile device which appears on the teleport page
6. img/android/X_android_tablet: Where X is either cf, sp, su. The tablet device which appears on the teleport page
7. img/background: Folder containing background images for the teleport page (keep these optimised for fast loading)
8. img/ios: Folder containing iOS specific images
9. img/android/X_ios_mobile: Where X is either cf, sp, su. The mobile device which appears on the teleport page
10. img/ios/X_ios_tablet: Where X is either cf, sp, su. The tablet device which appears on the teleport page

CSS Resources
-------------
1. Teleport now uses bootstrap
2. The styling for the teleport page can be found in css/style.css

JS Resources
-------------
1. Teleport now uses bootstrap and jQuery
2. The scripting for teleport and password reset can be found in js/teleport-script.js

teleport-script.js
------------------
1. The two global variables:
- displayNativeInstallHeroBanner: set to "true" to show the large Hero background image
- displayCompanyLogo: set to "true" to show the Company Logo
2. "var instructions" contains the text for navigating to the app. It differs for Android/iOS and Browser
3. The following code, changes the title and instruction, which appears at the top of the Hero image:
- $(".ao-app-promo-title").html("Get the app");
- $(".ao-app-promo-desc").html("Now with offline mode, a new design, <br> and real-time notifications.");

Flow
----
TO DO

Future Extensions
-----------------
1. Company Personalisation for the Hero Background Images and the Mobile\Tablet screenshots.

Secured Comm
------------
1. When Native App is ready, set the variable: displayNativeForSecuredComm to true in teleport.js

Instructions For Developers
---------------------------
1. web\teleport.html contains the html body for the teleport page
2. web\pwdreset.html contains the html body for the reset page
3. There is no build process for teleport
4. To test - you will need to replace the teleport folder (or individual files) on es.com
5. You can use the teleport links found at the bottom of https://econumysecure.com/ao/apps.html
6. Once testing is completed, copy the teleport folder to ao.com, sc.com and sp.com