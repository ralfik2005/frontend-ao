<?php

//define("BASE_URL", "https://www.econumysecure.com");

$rustart = getrusage();
$time_start = microtime(true);
$time_logged_in = 0;
$time_teleport_results_retrieved = 0;

$extraLoginScreenText = '';
$DisplayTeleportPage  = "Y";

function rutime($ru, $rus, $index) {
    return ($ru["ru_$index.tv_sec"]*1000 + intval($ru["ru_$index.tv_usec"]/1000))
     -  ($rus["ru_$index.tv_sec"]*1000 + intval($rus["ru_$index.tv_usec"]/1000));
}

define("DEBUG_FLAG", true);

$darray = explode('.', $_SERVER['HTTP_HOST']);
$narray = array_reverse($darray);
$domain = $narray[1];
$httpcode = 200;

if (isset($_GET['devId']) && !empty($_GET['devId'])) {
    $devId = $_GET['devId'];
}

$isGetCompIdentOnly = "N";

if (isset($_GET['getCompIdentOnly']) && !empty($_GET['getCompIdentOnly'])) {
    $isGetCompIdentOnly = $_GET['getCompIdentOnly'];
}

$username = 'fe_server1';

if ($domain == "secured-comm") {
    define("BASE_URL", "https://www.secured-comm.com");
    define("AO_BASE_URL", "https://api.secured-comm.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "JDTEST1");
    $pwd = '%Pr!f#9s*JH9J4';    
} else if ($domain == "econumysecure") {
    define("BASE_URL", "https://www.econumysecure.com");
    define("AO_BASE_URL", "https://www.econumysecure.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "CCC");
    $pwd = '$fe_server1';
} else if ($domain == "stayprivatetest") {
    define("BASE_URL", "https://htpsptest1.stayprivatetest.com");
    define("AO_BASE_URL", "/ao_ws/api/");
    define("DEFAULT_CIDENT", "CCC");
    $pwd = '$fe_server1';
} else {
    define("BASE_URL", "https://www.alwaysorg.com");
    define("AO_BASE_URL", "https://api.alwaysorg.com/ao_ws/api/");
    define("DEFAULT_CIDENT", "CCC");
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

$js = '';

function login($data) {
   
// use key 'http' even if you send the request to https://...
	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
		),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents(AO_BASE_URL . "authUserLogin.php?", false, $context);

	return $result;
}

function getJSON($url, $data, $type) {
	$result = file_get_contents($url . http_build_query($data));
    return $result;
}

function teleport($data) {

	/*$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data),
		),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents(AO_BASE_URL . "processTeleportAccessCode.php?", false, $context);

	return $result;*/

	global $httpcode;

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, AO_BASE_URL . "processTeleportAccessCode.php?");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

	$query = http_build_query($data);

	$server_output = curl_exec ($ch);
	$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	curl_close ($ch);

	// further processing ....
	/*if (httpcode == 200) { 

		error_log( "CURL OK" );	

	} else { 

		error_log( "FAILED" );	

	}*/

	//error_log( "REPORT:processTeleportAccessCode HTTP Code: " . $httpcode );
	error_log( "REPORT:processTeleportAccessCode results: " . print_r($server_output, TRUE) );

	return $server_output;

}

function getCompanyFromTeleportAccessCode($data) {

	/*$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'GET',
			'content' => http_build_query($data),
		),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents(AO_BASE_URL . "getCompanyFromTeleportAccessCode.php?", false, $context);*/

	//error_log( "$data start" );
	//error_log( print_r($data, TRUE) );
	//error_log( "$data end" );
	//error_log( "URL: " . AO_BASE_URL . "getCompanyFromTeleportAccessCode.php?" );	

	//return $result;

	global $httpcode;

	$ch = curl_init();

	$query = http_build_query($data);
	$url = AO_BASE_URL . "getCompanyFromTeleportAccessCode.php?" . $query;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec ($ch);
	$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	curl_close ($ch);

	// further processing ....
	/*if (httpcode == 200) { 

		error_log( "CURL OK" );	

	} else { 

		error_log( "FAILED" );	

	}*/

	$results = json_decode($server_output, true);

	//error_log( "REPORT:getCompanyFromTeleportAccessCode HTTP Code: " . $httpcode );
	//error_log( "REPORT:getCompanyFromTeleportAccessCode CompanyId: " . $results["CompanyId"] );
	//error_log( "REPORT:getCompanyFromTeleportAccessCode request: " . $url );
	error_log( "REPORT:getCompanyFromTeleportAccessCode results: " . print_r($server_output, TRUE) );

	return $server_output;
}

$data = array(
    "UserName" => $username,
    "UserPwd" => $pwd
);

	$loginResult = json_decode(login($data));

	$time_logged_in = microtime(true);

	$domainUrl = $_SERVER['HTTP_HOST'];
	//$domainUrl = 'companyddd.econumysecure.com/';
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
	$apiurl = AO_BASE_URL . "getCompanyFromSubUrl.php?";
	//$result = file_get_contents($apiurl . http_build_query($data));
	$result = getJSON($apiurl, $data, "GET");
	
	if ($result){
		//Moved to later
		/*$resp_arr = json_decode($result, true);
		if($resp_arr["CompanyIdent"]){
			$companyIdent = $resp_arr["CompanyIdent"];
			$companyName = $resp_arr["CompanyName"];
		}else{
			$companyIdent = '';
			$companyName = 'Always Organised';
		}
		if($resp_arr["ResetPwdOnlyEmail"]){
			$resetPwdOnlyEmail = $resp_arr["ResetPwdOnlyEmail"];
		}else{
			$resetPwdOnlyEmail = 'Y';
		}
		if( $resp_arr["ExtraLoginScreenText"] ) {
			$extraLoginScreenText = $resp_arr["ExtraLoginScreenText"];
		}
		if($resp_arr["DisplayTeleportPage"]){		
			$DisplayTeleportPage = $resp_arr["DisplayTeleportPage"];
		} else {
			$DisplayTeleportPage = 'Y';
		}*/
	}else{
		$companyIdent = '';
		$companyName = 'Always Organised';
		$resetPwdOnlyEmail = 'Y';
		$DisplayTeleportPage = 'Y';
	}
//echo $companyIdent;
//echo $companyName;

    if (isset($_GET['ac']) && !empty($_GET['ac'])) {
        $accesscode = $_GET['ac'];
    }

	if (isset($accesscode)) {
		global $httpcode;

		$data = array(
			"AuthToken"=> $loginResult->AuthToken, 
			"UserName"=> $loginResult->SystemUserName,			
			"AccessCode"=>$accesscode,
        	"ReturnKeysFlag"=>"Y",
        	"DeviceIdentifier"=>$devId      			
		);

		$result = teleport($data);

		$time_teleport_results_retrieved = microtime(true);

		$results = json_decode($result, true);

		if ($results){
			if ($httpcode != 200) {
				header('X-PHP-Response-Code: ' . $httpcode, true, $httpcode);
			}
			echo $result;			
		}		
	} else {
		$url = parse_url($_SERVER['HTTP_REFERER']);	
		$query_str = $url['query'];
		parse_str($query_str, $query);

		$isResetCode = false;

		$teleportParm = $query['invite'];
		if (!$teleportParm) {
			$teleportParm = $query['promo'];
		}
		if (!$teleportParm) {
			$teleportParm = $query['reset'];
			$isResetCode = true;
		}		

		if ($isGetCompIdentOnly == "Y") {
			error_log("Get Company From Teleport Access Code");
			$data = array(
				"AuthToken"=> $loginResult->AuthToken, 
				"UserName"=> $loginResult->SystemUserName,			
				"AccessCode"=>$teleportParm
			);
			if (!$isResetCode) {
				$result = getCompanyFromTeleportAccessCode($data);
			}									
		} else {
			error_log("Performing Normal Teleport");
			if ($teleportParm) {
				$data = array(
					"AuthToken"=> $loginResult->AuthToken, 
					"UserName"=> $loginResult->SystemUserName,			
					"AccessCode"=>$teleportParm,
		        	"ReturnKeysFlag"=>"Y",
	        		"DeviceIdentifier"=>$devId     			
				);
				if (!$isResetCode) {
					$result = teleport($data);
				}
			}
		}

		$time_teleport_results_retrieved = microtime(true);

		$results = json_decode($result, true);
        
		$tagOnAdditional = true;

		if ($results){
			$js .= "$('#ao-invite').val('".$result."');";
			//Added this again as it's not always picjed up 
			$resp_arr = json_decode($result, true);
			if($resp_arr["CompanyIdent"]){
				$companyIdent = $resp_arr["CompanyIdent"];
				$companyName = $resp_arr["CompanyName"];
			}else{
				$companyIdent = '';
				$companyName = 'Always Organised';
			}
			if($resp_arr["ResetPwdOnlyEmail"]){
				$resetPwdOnlyEmail = $resp_arr["ResetPwdOnlyEmail"];
			}else{
				$resetPwdOnlyEmail = 'Y';
			}
			if( $resp_arr["ExtraLoginScreenText"] ) {
				$extraLoginScreenText = $resp_arr["ExtraLoginScreenText"];
			}
			if($resp_arr["DisplayTeleportPage"]){		
				$DisplayTeleportPage = $resp_arr["DisplayTeleportPage"];
			} else {
				$DisplayTeleportPage = 'Y';
			}
			if($resp_arr["SystemUserName"]){
				$tagOnAdditional = false;
			}
		} else {
			if ($isResetCode) {
				$js .= "$('#ao-invite').val('');";
			} else {
				$js .= "$('#ao-invite').val('FAILED');";
			}
			$tagOnAdditional = false;
		}

		//echo "$('#ao-invite').val('something: ".$query['invite']."');";

		if ($tagOnAdditional) {
			$js .= "$('#company-ident').val('".$companyIdent."');";
	        $js .= "$('#company-id-reset-request').val('".$companyIdent."');";
	        $js .= "$('#company-id-reset').val('".$companyIdent."');";
	        $js .= "$('#resetPwdOnlyEmail').val('".$resetPwdOnlyEmail."');"; 
			$js .= "$('title').html('".$companyName."');";
		}
		if ($companyIdent) {
			$js .= "$('.company-ident-container').hide();";
			//$js .= "$('#company-ident').hide();$('#ao-login').height(280);$('#ao-login-form').height(100);";
            //$js .= "$('#company-id-reset-request').hide();$('#ao-login-pwd-reset-request').height(150);"; 
            //$js .= "$('#company-id-reset').hide();$('#ao-login-pwd-reset').height(180);";
		} else {
            //$js .= "$('#ao-login').height(300);$('#ao-login-form').height(170);";
            //$js .= "$('#ao-login-pwd-reset-request').height(160);"; 
            //$js .= "$('#ao-login-pwd-reset').height(200);";
        }

        if ($DisplayTeleportPage) {
			$js .= "$('#DisplayTeleportPage').val('".$DisplayTeleportPage."');";
        } else {
			$js .= "$('#DisplayTeleportPage').val('Y');";
        }

        if ($extraLoginScreenText != '') {
        	$js .= "$('.ao-login-instructions').html('".$extraLoginScreenText."');";
        }

		error_log($js, 0);

        echo $js;

	}

	$time_end = microtime(true);

	$ru = getrusage();
	error_log("This process used " . rutime($ru, $rustart, "utime") .
	    " ms for its computations");
	error_log("It spent " . rutime($ru, $rustart, "stime") .
	    " ms in system calls");
	error_log("Actual duration: " . round($time_end - $time_start, 2) .
	    ", logging in time: " . round($time_logged_in - $time_start, 2) . ", teleport retrieval details: " . round($time_teleport_results_retrieved - $time_logged_in, 2) );	
?>