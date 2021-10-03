'use strict;'

localStorage.clear();
//Запись в базу
function set(key,value)
{
	if(localStorage.setItem(key, value))
	{
		return true;
	}
	else
	{
		return false;
	}
}
//Извлечение из базы
function get(key)
{
	return localStorage.getItem(key);
}

/**
*     Объявление переменных объектов интерфейса и инициализация их значениями по умолчанию, т.е. когда система обесточена
*/
//цвет фона кнопки подачи напряжения на систему
let btn_on_background 		=	set('btn_on_background', '#fff');
//цвет фона кнопки пуска системы
let btn_run_background 		=	set('btn_run_background', '#fff');
//цвет фона кнопки временной остановки системы(для продолжения работы следует нажать кнопку "run")
let btn_pause_background 	= 	set('btn_pause_background', '#fff');
//цвет фона кнопки отключения напряжения
let btn_off_background 		= 	set('btn_off_background', '#fff');
//цвет фона кнопки загрузки ингредиента в дозатор_1
let btn_load_1_background 	= 	set('btn_load_1_background', '#fff');
//цвет фона кнопки загрузки ингредиента в дозатор_2
let btn_load_2_background 	= 	set('btn_load_2_background', '#fff');
//цвет фона кнопки санитарной обработки системы
let btn_sanit_background 	= 	set('btn_sanit_background', '#fff');

//миксер
//текст внутри информационной панели
let console_mixer_1_text 		=	set('console_mixer_1_text','Система обесточена!');
//картинка
let mixer_1_src 				= 	set('mixer_1_src','res/mixer_1_0.gif');
//картинка датчика нижнего уровня
let mixer_1_sensor_min_src 		= 	set('mixer_1_sensor_min_src','res/sensor_blink.gif');
//картинка датчика верхнего уровня
let mixer_1_sensor_max_src 		= 	set('mixer_1_sensor_max_src','res/sensor_blink.gif');
//картинка крана разгрузки
let mixer_1_tap_1_src 			= 	set('mixer_1_tap_1_src','res/tap_vert_close.gif');
//картинка мешалки
let mixer_1_stirrer_src			= 	set('mixer_1_stirrer_src','res/stirrer_off.gif');
//текст внутри информационной панели тензодатчика
let mixer_1_strain_gauge_text	=	set('mixer_1_strain_gauge_text','0');

//дозатор_1
//текст внутри информационной панели                                                   
let console_batcher_1_text 		= 	set('console_batcher_1_text','Система обесточена!');
//картинка
let batcher_1_src 				= 	set('batcher_1_src','res/batcher_1_0.gif');
//картинка датчика нижнего уровня
let batcher_1_sensor_min_src 	= 	set('batcher_1_sensor_min_src','res/sensor_blink.gif');
//картинка датчика верхнего уровня
let batcher_1_sensor_max_src	= 	set('batcher_1_sensor_max_src','res/sensor_blink.gif');
//картинка крана разгрузки
let batcher_1_tap_1_src 		= 	set('batcher_1_tap_1_src','res/tap_vert_close.gif');
//картинки трубопровода
let batcher_1_tube_1_src 		= 	set('batcher_1_tube_1_src','res/tube_1010.gif');
let batcher_1_tube_2_src 		= 	set('batcher_1_tube_2_src','res/tube_1010.gif');
let batcher_1_tube_3_src 		= 	set('batcher_1_tube_3_src','res/tube_1010.gif');
let batcher_1_tube_4_src 		= 	set('batcher_1_tube_4_src','res/tube_1100.gif');

//дозатор_2
//текст внутри информационной панели 
let console_batcher_2_text 		= 	set('console_batcher_2_text','Система обесточена!');
//картинка
let batcher_2_src 				= 	set('batcher_2_src','res/batcher_1_0.gif');
//картинка датчика нижнего уровня
let batcher_2_sensor_min_src 	=	set('batcher_2_sensor_min_src','res/sensor_blink.gif');
//картинка датчика верхнего уровня
let batcher_2_sensor_max_src	= 	set('batcher_2_sensor_max_src','res/sensor_blink.gif');
//картинка крана разгрузки
let batcher_2_tap_1_src 		= 	set('batcher_2_tap_1_src','res/tap_vert_close.gif');
//картинки трубопровода
let batcher_2_tube_1_src 		= 	set('batcher_2_tube_1_src','res/tube_1010.gif');
let batcher_2_tube_2_src 		= 	set('batcher_2_tube_2_src','res/tube_1010.gif');
let batcher_2_tube_3_src 		= 	set('batcher_2_tube_3_src','res/tube_1010.gif');
let batcher_2_tube_4_src 		= 	set('batcher_2_tube_4_src','res/tube_1001.gif');

//Инициализация
window.onload = function init()
{
//Показываем меню
	document.querySelector(".showmenu").click();
//Прорисовка элементов системы при загрузке страницы
	render();
//Прячем меню через 2 секунды	
	let hide_menu = setTimeout(function()
	{
		document.querySelector(".showmenu").click();
	}, 2000)
	// alert(localStorage.length);
	// for(let key of Object.keys(localStorage))
	// {
		// alert(`${key}: ${localStorage.getItem(key)}`);
	// }
};

//Обработчик нажатия на кнопку "on"	
on.onclick = function()
{
	set('btn_on_background', '#0f0');
	set('btn_run_background', '#0f0');
	set('btn_pause_background', '#aaa');
	set('btn_off_background', '#f00');
	set('btn_load_1_background', '#aaa');
	set('btn_load_2_background', '#aaa');
	set('btn_sanit_background', '#00f');
	
	set('mixer_1_sensor_max_src', 'res/sensor_red.gif');
	set('mixer_1_sensor_min_src', 'res/sensor_red.gif');
	set('batcher_1_sensor_max_src', 'res/sensor_red.gif');
	set('batcher_1_sensor_min_src', 'res/sensor_red.gif');
	set('batcher_2_sensor_max_src', 'res/sensor_red.gif');
	set('batcher_2_sensor_min_src', 'res/sensor_red.gif');
	
	render();
};

//Обработчик нажатия на кнопку "off"	
off.onclick = function()
{
	set('btn_on_background', '#fff');
	set('btn_run_background', '#fff');
	set('btn_pause_background', '#fff');
	set('btn_off_background', '#fff');
	set('btn_load_1_background', '#fff');
	set('btn_load_2_background', '#fff');
	set('btn_sanit_background', '#fff');
	
	set('mixer_1_sensor_max_src', 'res/sensor_blink.gif');
	set('mixer_1_sensor_min_src', 'res/sensor_blink.gif');
	set('batcher_1_sensor_max_src', 'res/sensor_blink.gif');
	set('batcher_1_sensor_min_src', 'res/sensor_blink.gif');
	set('batcher_2_sensor_max_src', 'res/sensor_blink.gif');
	set('batcher_2_sensor_min_src', 'res/sensor_blink.gif');
	
	render();
};

//Обработчик нажатия на кнопку "run"	
run.onclick = function()
{

	render();
};

//Обработчик нажатия на кнопку "pause"	
pause.onclick = function()
{

	render();
};

//Обработчик нажатия на кнопку загрузки дозатора 1 (левая кнопка "load")	
load_1.onclick = function()
{

	render();
};

//Обработчик нажатия на кнопку загрузки дозатора 2 (правая кнопка "load")	
load_2.onclick = function()
{

	render();
};

//Обработчик нажатия на кнопку "sanit"	
sanit.onclick = function()
{
	set('btn_load_1_background', '#fff');
	set('btn_load_2_background', '#fff');
	
	render();
};


function render()
{
	document.getElementById('on').style.background 		= get('btn_on_background');
	document.getElementById('run').style.background 	= get('btn_run_background');
	document.getElementById('pause').style.background 	= get('btn_pause_background');
	document.getElementById('off').style.background 	= get('btn_off_background');
	document.getElementById('load_1').style.background 	= get('btn_load_1_background');
	document.getElementById('load_2').style.background 	= get('btn_load_2_background');
	document.getElementById('sanit').style.background 	= get('btn_sanit_background');
	
	document.getElementById('console_mixer_1').innerText 		= get('console_mixer_1_text');
	document.getElementById('mixer_1_strain_gauge').innerText 	= get('mixer_1_strain_gauge_text');
	document.getElementById('mixer_1').src 						= get('mixer_1_src');
	document.getElementById('mixer_1_stirrer').src 				= get('mixer_1_stirrer_src');
	document.getElementById('mixer_1_tap_1').src 				= get('mixer_1_tap_1_src');
	document.getElementById('mixer_1_sensor_max').src 			= get('mixer_1_sensor_max_src');
	document.getElementById('mixer_1_sensor_min').src 			= get('mixer_1_sensor_min_src');
	                                                                            
	document.getElementById('console_batcher_1').innerText 	= get('console_batcher_1_text');
	document.getElementById('batcher_1').src 				= get('batcher_1_src');
	document.getElementById('batcher_1_tap_1').src 			= get('batcher_1_tap_1_src');
	document.getElementById('batcher_1_sensor_max').src 	= get('batcher_1_sensor_max_src');
	document.getElementById('batcher_1_sensor_min').src 	= get('batcher_1_sensor_min_src');
	document.getElementById('batcher_1_tube_1').src 		= get('batcher_1_tube_1_src');
	document.getElementById('batcher_1_tube_2').src 		= get('batcher_1_tube_2_src');
	document.getElementById('batcher_1_tube_3').src 		= get('batcher_1_tube_3_src');
	document.getElementById('batcher_1_tube_4').src 		= get('batcher_1_tube_4_src');
																			   
	document.getElementById('console_batcher_2').innerText 	= get('console_batcher_2_text');
	document.getElementById('batcher_2').src 				= get('batcher_2_src');
	document.getElementById('batcher_2_tap_1').src 			= get('batcher_2_tap_1_src');
	document.getElementById('batcher_2_sensor_max').src 	= get('batcher_2_sensor_max_src');
	document.getElementById('batcher_2_sensor_min').src 	= get('batcher_2_sensor_min_src');
	document.getElementById('batcher_2_tube_1').src 		= get('batcher_2_tube_1_src');
	document.getElementById('batcher_2_tube_2').src 		= get('batcher_2_tube_2_src');
	document.getElementById('batcher_2_tube_3').src 		= get('batcher_2_tube_3_src');
	document.getElementById('batcher_2_tube_4').src 		= get('batcher_2_tube_4_src');
}