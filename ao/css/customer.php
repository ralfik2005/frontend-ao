<?php


$rustart = getrusage();
$time_start = microtime(true);
$time_logged_in = 0;
$time_themes_retrieved = 0;

function rutime($ru, $rus, $index) {
    return ($ru["ru_$index.tv_sec"]*1000 + intval($ru["ru_$index.tv_usec"]/1000))
     -  ($rus["ru_$index.tv_sec"]*1000 + intval($rus["ru_$index.tv_usec"]/1000));
}

//ini_set('display_errors',1);
//error_reporting(-1);

/*
Use case for this script:

1: AO logo and css file form part of the payload sent to the browser
2: When the user logs in with a Company Code, a new payload is sent with that Companies logo's locations and CSS settings.

*/
header("Content-type: text/css");
//define("BASE_URL", "https://www.econumysecure.com");

define("DEBUG_FLAG", false);

$darray = explode('.', $_SERVER['HTTP_HOST']);
$narray = array_reverse($darray);
$domain = $narray[1];

$username = 'fe_server1';

if ($domain == "secured-comm") {
    //define("BASE_URL", "https://www.secured-comm.com");
    define("AO_BASE_URL", "https://api.secured-comm.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "JDTEST1");
    $pwd = '%Pr!f#9s*JH9J4';    
} else if ($domain == "econumysecure") {
    //define("BASE_URL", "https://www.econumysecure.com");
    define("AO_BASE_URL", "https://www.econumysecure.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "AAA");
    $pwd = '$fe_server1';
} else if ($domain == "stayprivatetest") {
    define("AO_BASE_URL", "https://api.stayprivatetest.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "AAA");
    $pwd = '$fe_server1';
} else {
    //define("BASE_URL", "https://www.alwaysorg.com");
    define("AO_BASE_URL", "https://api.alwaysorg.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "AAA");
    $pwd = '$fe_server1';
}

define("BASE_URL", "https://" . $_SERVER['HTTP_HOST']);

unset($darray, $narray);

if (DEBUG_FLAG) {
    error_log("REPORT:domain: ".$domain, 0);
    error_log("REPORT:BASE_URL: ".BASE_URL, 0);
    error_log("REPORT:AO_BASE_URL: ".AO_BASE_URL, 0);
    error_log("REPORT:username-pwd: ".$username." ".$pwd, 0);
}

//Uncomment the correct less file path:

//compressed output less file path (currently manually copying _base_compiled.less to the output folder path after we;ve compressed locally with jar)
//define("LESS_FILE_TO_COMPILE", "_base_compiled.less");

//local working copy output less file path
define("LESS_FILE_TO_COMPILE", "../resources/css/app/customer/_base_compiled.less");

require_once("lessc.inc.php");

function login($data) {
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, AO_BASE_URL . "authUserLogin.php?");
    curl_setopt($ch, CURLOPT_POST, count($data));
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //execute post
    $result = curl_exec($ch);

    //close connection
    curl_close($ch);


    return $result;
}

function getJSON($url, $data, $type) {
    //open connection
    $ch = curl_init();
    //Set for a GET request (note: concatinating query string to end of url)
    curl_setopt($ch, CURLOPT_URL, $url . http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPGET, TRUE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    //execute post
    $result = curl_exec($ch);

    //close connection
    curl_close($ch);

    return $result;
}

//Login, may not need this is this script is in the same location as AO-WS web services anyway
$data = array(
    "UserName" => $username,
    "UserPwd" => $pwd
);


$loginResult = json_decode(login($data));

    $time_logged_in = microtime(true);

if (DEBUG_FLAG) {
    error_log("REPORT:loginResult: ".error_log(print_r($loginResult,true)), 0);
}

if ($_GET['id'] != '') {
    $companyIdent = $_GET['id'];
} else {
	$domainUrl = $_SERVER['HTTP_HOST'];

	//$domainUrl = 'https://companyzzz.econumysecure.com/';
	$parsedUrl = parse_url($domainUrl);
	
	//$host = explode('.', $parsedUrl['host']);
	//$subdomain = $host[0];
	
	$path = explode('.', $parsedUrl['path']);
	$subdomain = $path[0];
	
	$data = array(
		"AuthToken"=> $loginResult->AuthToken, 
		"UserName"=> $loginResult->SystemUserName,
		"SubUrl" => $subdomain
	);

    if (DEBUG_FLAG) {
        error_log("REPORT:subdomain: ".$subdomain, 0);
    }

	$apiurl = AO_BASE_URL . "getCompanyFromSubUrl.php?";
	//$result = file_get_contents($apiurl . http_build_query($data));
	$result = getJSON($apiurl, $data, "GET");
	
    if (DEBUG_FLAG) {
        error_log("REPORT:result: ".error_log(print_r($result,true)), 0);
    }

	if ($result){
		$resp_arr = json_decode($result, true);

        if (DEBUG_FLAG) {
            error_log("REPORT:resp_arr: ".error_log(print_r($resp_arr,true)), 0);
            error_log("REPORT:resp_arr-CompanyIdent: ".error_log(print_r($resp_arr["CompanyIdent"],true)), 0);
        }

		if($resp_arr["CompanyIdent"]){
			$companyIdent = $resp_arr["CompanyIdent"];
		}else{
		  $companyIdent = DEFAULT_CIDENT;
		}
        if (DEBUG_FLAG) {
            error_log("REPORT:companyIdent: ".$companyIdent, 0);
        }
	}else{
		$companyIdent = DEFAULT_CIDENT;
	}

    if (DEBUG_FLAG) {
        error_log("REPORT:companyIdent: ".$companyIdent, 0);
    }
}



$data = array(
    "AuthToken"=> $loginResult->AuthToken, 
    "UserName"=> $loginResult->SystemUserName,
    "CompanyIdent"=> $companyIdent
);
$theme = json_decode(getJSON(AO_BASE_URL . "getCompanyTheme.php?", $data, "GET"));

if (DEBUG_FLAG) {
    error_log("REPORT:theme: ".error_log(print_r($theme,true)), 0);
}

/* TODO: Implement cached compile below taken from http://stackoverflow.com/questions/12274628/compile-a-referenced-less-file-into-css-with-php-automatically
require "lessphp/lessc.inc.php";
$file = $_GET["file"];
function autoCompileLess($inputFile, $outputFile) {
    // load the cache
    $cacheFile = $inputFile.".cache";
    if (file_exists($cacheFile)) {
        $cache = unserialize(file_get_contents($cacheFile));
    } else {
        $cache = $inputFile;
    }
    $less = new lessc;
    $less->setFormatter("compressed");
    $newCache = $less->cachedCompile($cache);
    if (!is_array($cache) || $newCache["updated"] > $cache["updated"]) {
        file_put_contents($cacheFile, serialize($newCache));
        file_put_contents($outputFile, $newCache['compiled']);
    }
}
autoCompileLess('../' . $file, '../' . $file . '.css');
header('Content-type: text/css');
readfile('../' . $file . '.css');
*/

$time_themes_retrieved = microtime(true);

//Instantiate the lessphp parser (http://leafo.net/lessphp/)
$less = new lessc;
//Set up the customer styles ready to be injected (by lessphp) when we call compileFile
//$logoRoot = str_replace (  "/web/" ,  "../" ,  $theme->logo  );

if ($_GET['cb'] != '') {
    $cb = $_GET['cb'];
} else {
	$cb = "1";
}

if (isset($theme->{'logo-full-path'})) {
    $logoRoot =  $theme->{'logo-full-path'};
} else {
    $logoRoot =  BASE_URL.$theme->logo;
}
$logoAlpha = 0.06;
if ($theme->{'logo-alpha'} > 0) {
    $logoAlpha = $theme->{'logo-alpha'}/100;
}
$themeArr = array(
    "cb"=> $cb,
    "color"=> $theme->color,
    "color-disabled"=> $theme->{'color-disabled'},
    "background-color"=> $theme->{'background-color'},
    "color-nav-button"=> $theme->{'color-nav-button'}, 
    "color-nav-button-highlight"=> $theme->{'color-nav-button-highlight'},
    "border-color"=> $theme->{'border-color'},
    "border-color-disabled"=> $theme->{'border-color-disabled'},
    "widget-hover-background-color"=> $theme->{'widget-hover-background-color'},
    "widget-active-background-color"=> $theme->{'widget-active-background-color'},
    "slider-range-background-color"=> $theme->{'slider-range-background-color'},
    "logo-alpha"=> $logoAlpha,        
    "logo-root"=> "'" . $logoRoot . "'",    
);
$less->setVariables($themeArr);
//Compile the LESS file to CSS with the above customer style variables pre-injected

if ($_GET['native'] != '') {
    echo json_encode($themeArr);
} else {
    echo $less->compileFile(LESS_FILE_TO_COMPILE);
}

    $time_end = microtime(true);

    $ru = getrusage();
    error_log("This process used " . rutime($ru, $rustart, "utime") .
        " ms for its computations");
    error_log("It spent " . rutime($ru, $rustart, "stime") .
        " ms in system calls");
    error_log("Actual duration: " . round($time_end - $time_start, 2) .
        ", logging in time: " . round($time_logged_in - $time_start, 2) . ", theme retrieval details: " . round($time_themes_retrieved - $time_logged_in, 2) );

?>