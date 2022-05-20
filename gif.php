<?php
header('Content-Type: image/gif');

// A 1x1 gif image, in base64
echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');
// 43 bytes


// example payload data
$json = array(
		"id"	=> "12345",
		"name"	=> "Tom",
		"secret"=> "533kr1T"
	);


// Echo the hex encoded string to output
// ( after the gif image lead-in data )
echo strToHex( json_encode( $json ) );


// Hex encoding routine
function strToHex($string){
    $hex = '';
    for ($i=0; $i<strlen($string); $i++){
        $ord = ord($string[$i]);
        $hexCode = dechex($ord);
        $hex .= substr('0'.$hexCode, -2);
    }
    return strToUpper($hex);
}
