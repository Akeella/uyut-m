<?php
/*
require_once('phpmailer/PHPMailerAutoload.php');

function send_mail($subject, $body)
{
  var_dump($subject);
  $value = new PHPMailer;
  $value->Port = 465;
  $value->SMTPSecure = false;
  $value->SMTPAutoTLS = false;
  $value->CharSet = 'utf-8';
  //Режим debug
  $value->SMTPDebug = 1;

  $value->Host = 'mail.uyut-m.ru'; //хост домена почты
  $value->Username = 'uyut-m@uyut-m.ru'; //почта(домен) отправитель
  $value->Password = 'S4p3R7n7'; //пароль от пользователя домена
  $value->setFrom('uyut-m@uyut-m.ru'); //отправляем откуда
  $value->addAddress('roy12612@mail.ru'); //отправляем куда
  //$value->addAddress('idkf17kdggoyjivosite-order@jivo-mail.com'); //отправляем куда

  $value->isHTML(true); //поддержка html
  $value->Subject = $subject; //тема письма
  $value->Body = $body;

  if (!$value->Send()) {
    echo 'Mailer Error: ' . $value->ErrorInfo;
  }
}*/



//Подключаем библиотеку отправки письма
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'PHPMailer/Exception.php';
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';


//Функция отправки письма
function send_mail2($subject, $body, $files)
{
  //Создаем экзимпляр класса
  $mail = new PHPMailer;
  //Задаем кодировку
  $mail->CharSet = 'UTF-8';

  // Настройки SMTP
  $mail->isSMTP();
  //Авторизация включена
  $mail->SMTPAuth = true;
  //Режим debug
  $mail->SMTPDebug = 0;

  //Настроки подключения к почтовому язику
  $mail->Host = 'ssl://smtp.mail.ru';
  $mail->Port = 465;
  $mail->Username = 'uyut-m.ru@mail.ru';
  $mail->Password = 'm0yf8zBqbddYgrJYDrNW'; //2PeTErPro|u1

  // Отправка письма
  $mail->setFrom('uyut-m.ru@mail.ru', 'Поддержка uyut-m.ru');
  $mail->addAddress('valuewa.viky@yandex.ru', '');

  $mail->Subject = $subject;
  $mail->msgHTML($body);

  $file = $files['file'];
  if ($file) {
    $destiation_dir = dirname(__FILE__) . '/' . $file['name'];
    $filename = $file['name'];
    if (move_uploaded_file($file['tmp_name'], $destiation_dir)) {
      $mail->addAttachment($destiation_dir, $filename);
    }
  }
  $mail->send();
}

//Функция отправки письма
function send_mail($subject, $body)
{
  //Создаем экзимпляр класса
  $mail = new PHPMailer;
  //Задаем кодировку
  $mail->CharSet = 'UTF-8';

  // Настройки SMTP
  $mail->isSMTP();
  //Авторизация включена
  $mail->SMTPAuth = true;
  //Режим debug
  $mail->SMTPDebug = 0;

  //Настроки подключения к почтовому язику
  $mail->Host = 'ssl://smtp.mail.ru';
  $mail->Port = 465;
  $mail->Username = 'uyut-m.ru@mail.ru';
  $mail->Password = 'm0yf8zBqbddYgrJYDrNW'; //2PeTErPro|u1

  // Отправка письма
  $mail->setFrom('uyut-m.ru@mail.ru', 'Поддержка uyut-m.ru');
  $mail->addAddress('idkf17kdggoyjivosite-order@jivo-mail.com', '');

  $mail->Subject = $subject;
  $mail->msgHTML($body);

  $mail->send();
}
