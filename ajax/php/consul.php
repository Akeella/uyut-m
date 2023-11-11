<?php
// Подключаем конфигурация почты
require_once('mail_config.php');

$phone = htmlspecialchars($_POST['phone']);

if ($phone) {

  $body = "Бесплатная консультация<br>
  Телефон: $phone";
  //Отправляем письмо (функция в  mail_config.php)
  send_mail('Бесплатная консультация', $body);
  echo json_encode(array('success' => true, 'msg' => 'Письмо отправлено'));
} else {
  echo json_encode(array('success' => false, 'msg' => 'Заполните поле'));
}
