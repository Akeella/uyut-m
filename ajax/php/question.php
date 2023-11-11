<?php
// Подключаем конфигурация почты
require_once('mail_config.php');

$name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['phone']);
$message = htmlspecialchars($_POST['message']);

$body = "Остались вопросы<br>
  Имя: $name<br>
  Телефон: $phone<br>
  Сообщение: $message";
//Отправляем письмо (функция в  mail_config.php)
send_mail('Остались вопросы', $body);
echo json_encode(array('success' => true, 'msg' => 'Письмо отправлено'));
