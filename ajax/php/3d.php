<?php
// Подключаем конфигурация почты
require_once('mail_config.php');

//получаем переменные из дизайна
$naznach = htmlspecialchars($_POST['nas']);
$vid = get_vid((int)htmlspecialchars($_POST['vid'] || 0));
$height = htmlspecialchars($_POST['height']);
$w1 = htmlspecialchars($_POST['w1']);
$w2 = htmlspecialchars($_POST['w2']);
$w3 = htmlspecialchars($_POST['w3']);
$w4 = htmlspecialchars($_POST['w4']);
$w5 = htmlspecialchars($_POST['w5']);
$additional = htmlspecialchars($_POST['additional']);

$ch1 = htmlspecialchars($_POST['ch1'] ? 'Больше длинных вещей' : '');
$ch2 = htmlspecialchars($_POST['ch2'] ? 'Обувь' : '');
$ch3 = htmlspecialchars($_POST['ch3'] ? 'Сноуборд/лыжи' : '');
$ch4 = htmlspecialchars($_POST['ch4'] ? 'Больше коротких вещей' : '');
$ch5 = htmlspecialchars($_POST['ch5'] ? 'Гладильная доска' : '');
$ch6 = htmlspecialchars($_POST['ch6'] ? 'Пылесос' : '');
$ch7 = htmlspecialchars($_POST['ch7'] ? 'Галстуки' : '');
$ch8 = htmlspecialchars($_POST['ch8'] ? 'Сушилка' : '');
$ch9 = htmlspecialchars($_POST['ch9'] ? 'Стремянка' : '');
$ch10 = htmlspecialchars($_POST['ch10'] ? 'Ремни' : '');
$ch11 = htmlspecialchars($_POST['ch11'] ? 'Чемодан' : '');

$arr_ch = [
  $ch1,
  $ch2,
  $ch3,
  $ch4,
  $ch5,
  $ch6,
  $ch7,
  $ch8,
  $ch9,
  $ch10,
  $ch11
];

//Формируем строку с выбранными категориями
$res_ch = '';

for ($i = 0; $i < count($arr_ch); $i++) {
  if ($arr_ch[$i]) {
    $res_ch .= $arr_ch[$i] . ', ';
  }
}



$fio = htmlspecialchars($_POST['fio']);
$email = htmlspecialchars($_POST['emaill']);
$phone = htmlspecialchars($_POST['telephonee']);
$city = htmlspecialchars($_POST['city']);


//Функция получения вида по id
function get_vid($id)
{
  switch ($id) {
    case 1:
      return 'Стена';
      break;
    case 2:
      return 'Угол';
      break;
    case 3:
      return 'Ниша';
      break;
    case 4:
      return 'Комната';
      break;
    default:
      return 'Неизвестно';
  }
}

//Создаем тело письма
$body = "3D ДИЗАЙН-ПРОЕКТ<br>
 Назначения помещения: $naznach<br>
 Вид дизайн проекта: $vid<br>
 Высота потолка: $height<br>
 w1: $w1<br>
 w2: $w2<br>
 w3: $w3<br>
 w4: $w4<br>
 w5: $w45<br>
 Дополнительная информация: $additional<br>
 Вещи по категориям: $res_ch<br><br>

 фИО: $fio<br>
 email: $email<br>
 Телефон: $phone<br>
 Город: $city";
//Отправляем письмо (функция в  mail_config.php)
send_mail2('3D ДИЗАЙН-ПРОЕКТ', $body, $_FILES);
echo json_encode(array('success' => true, 'msg' => 'Письмо отправлено'));
