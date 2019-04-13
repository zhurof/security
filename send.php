<?php
//$headers = "From: Оставлена заявка: bla<bla>\r\n"; 
$to  = "mail@urlsite.com";
$form_action = $_POST['form_action'];
$subject = "";
switch ($form_action) {
	case "Заказать звонок":
		$subject = "Заказ звонка";
		break;
	case "Отправить заявку":
		$subject = "Заявка с сайта";
		break;
	default:
		$subject = "Запрос с сайта";
}
$message = "";
$name  = $_POST['name'] ? "\nИмя: ".$_POST['name'] : '';
$phone  = $_POST['phone'] ? "\nТелефон: ".$_POST['phone'] : '';
$email  = $_POST['email'] ? "\nE-Mail: ".$_POST['email'] : '';

$message = $subject.$name.$phone.$email;

if(mail($to, $subject, $message)){
	echo 'Спасибо! Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.';
}else{
	echo 'Возникла ошибка при отправке письма. Попробуйте позже.';
}
//header("Location: ".$_SERVER['HTTP_REFERER']);
?>