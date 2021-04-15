<?php
	require_once realpath(__DIR__ . "/vendor/autoloader.php");
	use Dotenv\Dotenv;

	$dotenv = Dotenv::createImmutable(__DIR__);
	$dotenv->load();
	$apiKey = getenv('POLLY_API_KEY');
	$apiSecret = getenv('POLLY_API_SECRET');



	require 'aws/aws-autoloader.php';
		



	$polly = new Aws\Polly\PollyClient(array(
		'version' => 'latest',
		'region' => 'us-west-2',
		'credentials' => array(
			'key' => $apiKey,
			'secret' => $apiSecret,
		)
	));
	
	
	$result = $polly->synthesizeSpeech(array(
		'OutputFormat' => 'mp3',
		'Text' => $_POST['pollytext'],
		'TextType' => 'text',
		'VoiceId' => 'Joey',
		'LanguageCode' => 'en-US'  
	));
	
	echo $result->get('AudioStream')->getContents();
?>co