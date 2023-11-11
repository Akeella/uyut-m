<?php
// Подключаем конфигурация почты
require_once('mail_config.php');
//обрабатываем входные параметры
$name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['phone']);

//Проверяем поля на пустоту
if ($name && $phone) {
  //Создаем тело письма
  $body = "Обратный звонок<br>
  Имя: $name<br>
  Телефон: $phone";
  //Отправляем письмо (функция в  mail_config.php)
  send_mail('Обратный звонок', $body);
  echo json_encode(array('success' => true, 'msg' => 'Письмо отправлено'));
} else {
  //Отдаем результат если поля не заполнены
  echo json_encode(array('success' => false, 'msg' => 'Заполните поля'));
}
