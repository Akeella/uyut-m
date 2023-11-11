<?php
// Подключаем конфигурация почты
require_once('mail_config.php');
//обрабатываем входные параметры
$name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['tel']);

//Проверяем поля на пустоту
if ($name && $phone) {
  //Создаем тело письма
  $body = "Всплывающее предложение<br>
  Имя: $name<br>
  Телефон: $phone";
  //Отправляем письмо (функция в  mail_config.php)
  send_mail('Всплывающее предложение', $body);
  echo json_encode(array('success' => true, 'msg' => 'Письмо отправлено'));
} else {
  //Отдаем результат если поля не заполнены
  echo json_encode(array('success' => false, 'msg' => 'Заполните поля'));
}
