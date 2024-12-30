<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];


require 'C:\xampp\htdocs\Personal Website\PHPMailer\src\Exception.php';
require 'C:\xampp\htdocs\Personal Website\PHPMailer\src\PHPMailer.php';
require 'C:\xampp\htdocs\Personal Website\PHPMailer\src\SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$mail new \PHPMailer\PHPMailer\PHPMailer();
?>