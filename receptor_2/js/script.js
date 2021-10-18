'use strict;'

/**
*
*    Объявление переменных объектов интерфейса и инициализация их значениями по умолчанию, т.е. когда система обесточена
*	 
*/
//Язык по-умолчанию. 0 - русский, 1 - английский, 2 - украинский. Может быть переопределен нажатием соответствующей надписи в меню приложения. Если язык уже был выбран пользователем оставляем его значение, если же нет, ставим по-умолчанию русский. Массив, реализующий мультиязычность приложения объявлен в файле init.js
set('language', (isset('language') ? get('language') : '1'));

//цвет фона кнопки подачи напряжения на систему
let btn_on_background 		=	set('btn_on_background', '#fff');
//цвет фона кнопки пуска системы
let btn_run_background 		=	set('btn_run_background', '#fff');
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
let console_mixer_1_text 		=	set('console_mixer_1_text', data.system_is_de_energized[get('language')]);
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
let console_batcher_1_text 		= 	set('console_batcher_1_text',data.system_is_de_energized[get('language')]);
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
let console_batcher_2_text 		= 	set('console_batcher_2_text',data.system_is_de_energized[get('language')]);
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
//Прорисовка элементов системы при первой загрузке страницы
	render();
//Показываем меню
	document.querySelector(".showmenu").click();
//Прячем меню через 2 секунды
	let hide_menu = setTimeout(function()
	{
		document.querySelector(".showmenu").click();
		alert(data.text_begin[get('language')]);
	}, 2000)
//Кнопки	
	document.getElementById('on').innerHTML			= controls.on[get('language')];
	document.getElementById('run').innerHTML		= controls.run[get('language')];
	document.getElementById('off').innerHTML		= controls.off[get('language')];
	document.getElementById('load_1').innerHTML		= controls.load_1[get('language')];
	document.getElementById('load_2').innerHTML		= controls.load_2[get('language')];
	document.getElementById('sanit').innerHTML		= controls.sanit[get('language')];
	document.getElementById('sanit').title 			= data.sanit_title[get('language')];
//Элементы меню
	document.getElementById('menu').title 			= data.menu[get('language')];
	document.getElementById('how_use').innerHTML	= data.how_use[get('language')];
/*Вместо записи:
document.getElementById('how_use_1').innerHTML= data.how_use_1[get('language')];
document.getElementById('how_use_2').innerHTML= data.how_use_2[get('language')];
и т.д...Используем for. Работает, только с доступом к destination через кв. скобки*/
	for(let i=1; i<=5; i++)
	{
		let destination = 'how_use_'+i;
		document.getElementById(destination).innerHTML= data[destination][get('language')];
	}
	document.getElementById('niotech').title 	= data.niotech[get("language")];
	document.getElementById('how_much_add').innerHTML= data.how_much_add[get('language')];

};

/**
*     Обработчики взаимодействия с видимыми элементами интерфейса(кнопками, пунктами меню и т.д.) 
*/
//Выбор языка в меню
ru.onclick = function()
{
	set('language', '0');
	location.reload();
};
en.onclick = function()
{
	set('language', '1');
	location.reload();
};
ua.onclick = function()
{
	set('language', '2');
	location.reload();
};

// обработчик выбора рецепта в меню
recipe_1.onclick =
recipe_2.onclick =
recipe_3.onclick =
recipe_4.onclick =
recipe_5.onclick =
recipe_6.onclick =
recipe_7.onclick =
recipe_8.onclick =
recipe_9.onclick =
recipe_10.onclick = function()
{
	if(get('console_mixer_1_text') == data.ready_for_work[get('language')] && get('console_batcher_1_text') == data.ready_for_work[get('language')] && get('console_batcher_2_text') == data.ready_for_work[get('language')])
	{
		set_recipe(this.id);
		set('btn_run_background', 		'#0f0');
		
		render();
	}
	else
	{
		alert(data.need_to_load[get('language')]);
	}
}

//Обработчик нажатия на кнопку "on"	
on.onclick = function()
{
	set('btn_on_background', 		'#0f0');
	set('btn_run_background', 		'#fff');
	set('btn_off_background', 		'#f00');
	set('btn_load_1_background',	'#aaa');
	set('btn_load_2_background', 	'#aaa');
	set('btn_sanit_background', 	'#00f');
	
	set('console_mixer_1_text', 	data.ready_for_work[get('language')]);
	set('mixer_1_src', 				'res/mixer_1_0.gif');
	set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
	set('mixer_1_sensor_max_src', 	'res/sensor_red.gif');
	set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
	set('mixer_1_strain_gauge_text','0');
	
	
//Из-за того, что после дозирования присадки некоторое ее количество может остаться в дозаторе, данные для некоторых элементов дозатора с присадкой берутся из локального хранилища, а не назначаются по-умолчанию
	set('console_batcher_1_text', 	(parseInt(get('batcher_1_src').slice(14).match(/\d+/)) ==10) ? data.ready_for_work[get('language')] : data.add_an_ingredient[get('language')]);
	set('batcher_1_src', 			get('batcher_1_src'));
	set('batcher_1_sensor_min_src', (parseInt(get('batcher_1_src').slice(14).match(/\d+/)) >= 1) ? 'res/sensor_green.gif' : 'res/sensor_red.gif');
	set('batcher_1_sensor_max_src', (parseInt(get('batcher_1_src').slice(14).match(/\d+/)) >= 9) ? 'res/sensor_green.gif' : 'res/sensor_red.gif');
	set('batcher_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_1_tube_1_src',		'res/tube_1010.gif');
	set('batcher_1_tube_2_src',		'res/tube_1010.gif');
	set('batcher_1_tube_3_src',		'res/tube_1010.gif');
	set('batcher_1_tube_4_src',		'res/tube_1100.gif');
		
	set('console_batcher_2_text', 	(parseInt(get('batcher_2_src').slice(14).match(/\d+/)) ==10) ? data.ready_for_work[get('language')] : data.add_an_ingredient[get('language')]);
	set('batcher_2_src', 			get('batcher_2_src'));
	set('batcher_2_sensor_min_src', (parseInt(get('batcher_2_src').slice(14).match(/\d+/)) >= 1) ? 'res/sensor_green.gif' : 'res/sensor_red.gif');
	set('batcher_2_sensor_max_src', (parseInt(get('batcher_2_src').slice(14).match(/\d+/)) >= 9) ? 'res/sensor_green.gif' : 'res/sensor_red.gif');
	set('batcher_2_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_2_tube_1_src',		'res/tube_1010.gif');
	set('batcher_2_tube_2_src',		'res/tube_1010.gif');
	set('batcher_2_tube_3_src',		'res/tube_1010.gif');
	set('batcher_2_tube_4_src',		'res/tube_1001.gif');
	
	render();
};

//Обработчик нажатия на кнопку "off"	
off.onclick = function()
{
//Останавливаем все запущеные таймауты(setTimeout)
	var killId = setTimeout(function()
	{
		for (var i = killId; i > 0; i--) clearInterval(i)
	}, 0);
	set('btn_on_background', 		'#fff');
	set('btn_run_background', 		'#fff');
	set('btn_off_background', 		'#fff');
	set('btn_load_1_background',	'#fff');
	set('btn_load_2_background', 	'#fff');
	set('btn_sanit_background', 	'#fff');
	
	set('console_mixer_1_text', 	data.system_is_de_energized[get('language')]);
	set('mixer_1_src', 				'res/mixer_1_0.gif');
	set('mixer_1_sensor_min_src', 	'res/sensor_blink.gif');
	set('mixer_1_sensor_max_src', 	'res/sensor_blink.gif');
	set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
	set('mixer_1_strain_gauge_text','0');
		
	set('console_batcher_1_text', 	data.system_is_de_energized[get('language')]);
	set('batcher_1_src', 			get('batcher_1_src'));
	set('batcher_1_sensor_min_src', 'res/sensor_blink.gif');
	set('batcher_1_sensor_max_src', 'res/sensor_blink.gif');
	set('batcher_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_1_tube_1_src',		'res/tube_1010.gif');
	set('batcher_1_tube_2_src',		'res/tube_1010.gif');
	set('batcher_1_tube_3_src',		'res/tube_1010.gif');
	set('batcher_1_tube_4_src',		'res/tube_1100.gif');
		
	set('console_batcher_2_text', 	data.system_is_de_energized[get('language')]);
	set('batcher_2_src', 			get('batcher_2_src'));
	set('batcher_2_sensor_min_src', 'res/sensor_blink.gif');
	set('batcher_2_sensor_max_src', 'res/sensor_blink.gif');
	set('batcher_2_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_2_tube_1_src',		'res/tube_1010.gif');
	set('batcher_2_tube_2_src',		'res/tube_1010.gif');
	set('batcher_2_tube_3_src',		'res/tube_1010.gif');
	set('batcher_2_tube_4_src',		'res/tube_1001.gif');
	
	localStorage.removeItem('recipe');
	
	render();
};

//Обработчик нажатия на кнопку "run"	
run.onclick = function()
{
	if(get('console_mixer_1_text') == data.ready_for_work[get('language')] && get('console_batcher_1_text') == data.ready_for_work[get('language')] && get('console_batcher_2_text') == data.ready_for_work[get('language')] && get('recipe'))
	{
//Блокируем все кнопки, кроме "off"		
		set('btn_on_background', 		'#fff');
		set('btn_run_background', 		'#fff');
		set('btn_off_background', 		'#f00');
		set('btn_load_1_background',	'#fff');
		set('btn_load_2_background', 	'#fff');
		set('btn_sanit_background', 	'#fff');
		
		
		set('console_batcher_1_text', data.dosing_in_progress[get('language')]);
		set('console_batcher_2_text', data.dosing_in_progress[get('language')]);
		set('console_mixer_1_text', data.dosing_in_progress[get('language')]);
		
		let level_max_1 = parseInt(get('batcher_1_src').slice(14).match(/\d+/));//Уровень, с которого начинается опорожнение дозатора 1(после slice() остается, например, "10.gif", а после match() - "10")	
		let level_max_2 = 10;
		let level_min_1 = get_recipe();//сколько десятых частей нужно выгрузить из дозатора 1, численно равно выбраному рецепту
		let level_min_2 = 10;
		let i_1 = 0;//счетчик для дозатора 1
		let i_2 = 0;//счетчик для дозатора 2
		let level_mixer_1_after_unloading_1;//Переменная хранит уровень продукта в миксере 1 после опорожнения дозатора 1

		unloading_1();
//Функция запуска опорожнения дозатора 1(при этом содержимым дозатора 1 загружается в миксер 1, с помощью тензодатчика миксера 1 проводится взвешивание. Показания веса выводятся на индикатор. )		
		function unloading_1()
		{

			let timer = 500;
//Функция организации петли обработки данных до достижения условий, определяемых алгоритмом. Функция будет повторять свою работу через время, определенное переменной timer. При этом, без перезагрузки страницы, обновляются определяемые алгоритмом элементы  приложения.(картинки, тексты и т.п.)
			function myLoop_1()
			{           
				setTimeout(function()
				{    
					set('batcher_1_src', 'res/batcher_1_'+ (level_max_1 - i_1) +'.gif');
					set('mixer_1_strain_gauge_text', String(i_1));
					set('batcher_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
					set('batcher_1_tube_1_src',		'res/tube_2010.gif');
					set('batcher_1_tube_2_src',		'res/tube_2010.gif');
					set('batcher_1_tube_3_src',		'res/tube_2010.gif');
					set('batcher_1_tube_4_src',		'res/tube_2100.gif');
					if(i_1 % 3 == 0)
					{
						set('mixer_1_src', 'res/mixer_1_'+ (i_1/3) +'.gif');
						set('mixer_1_sensor_min_src', 'res/sensor_green.gif');
					}
						
					render();
					
					i_1++;
					
					if ((level_max_1 - i_1) == 9)
					{           
						set('batcher_1_sensor_max_src', 'res/sensor_red.gif');
					}
					if ((level_max_1 - i_1) == 1)
					{           
						set('batcher_1_sensor_min_src', 'res/sensor_red.gif');
					}
					if (i_1 <= level_min_1)
					{           
						myLoop_1();
					}
					else
					{
						set('batcher_1_tap_1_src', 		'res/tap_vert_close.gif');
						set('batcher_1_tube_1_src',		'res/tube_1010.gif');
						set('batcher_1_tube_2_src',		'res/tube_1010.gif');
						set('batcher_1_tube_3_src',		'res/tube_1010.gif');
						set('batcher_1_tube_4_src',		'res/tube_1100.gif');
						set('btn_load_1_background',	'#fff');
						
						render();
						
						level_mixer_1_after_unloading_1 = parseInt(get('mixer_1_src').slice(12).match(/\d+/));
						unloading_2();
					}
				}, timer)
			}
			myLoop_1();
		}
//Функция запуска опорожнения дозатора 2(при этом содержимым дозатора 2 загружается в миксер 1, с помощью тензодатчика миксера 1 проводится взвешивание. Показания веса выводятся на индикатор. )	
		function unloading_2()
		{
			let timer = 500;
			function myLoop_2()
			{           
				setTimeout(function()
				{    
					set('batcher_2_src', 'res/batcher_1_'+ (level_max_2 - i_2) +'.gif');
					set('mixer_1_strain_gauge_text', String(parseInt(get('mixer_1_strain_gauge_text')) + Number(Boolean(i_2)) * 10));
					set('batcher_2_tap_1_src', 		'res/tap_vert_open_ud.gif');
					set('batcher_2_tube_1_src',		'res/tube_2010.gif');
					set('batcher_2_tube_2_src',		'res/tube_2010.gif');
					set('batcher_2_tube_3_src',		'res/tube_2010.gif');
					set('batcher_2_tube_4_src',		'res/tube_2001.gif');
					if(i_2 % 2 == 0)
					{
						set('mixer_1_src', 'res/mixer_1_'+ (level_mixer_1_after_unloading_1 + i_2/2) +'.gif');
					}
					
					render();
					i_2++;

					if ((level_max_2 - i_2) == 9)
					{ 
						set('batcher_2_sensor_max_src', 'res/sensor_red.gif');
					}
					if ((level_max_2 - i_2) == 1)
					{
						set('batcher_2_sensor_min_src', 'res/sensor_red.gif');
					}
					if (i_2 <= level_min_2)
					{           
						myLoop_2();
					}
					else
					{
						set('batcher_2_tap_1_src', 		'res/tap_vert_close.gif');
						set('batcher_2_tube_1_src',		'res/tube_1010.gif');
						set('batcher_2_tube_2_src',		'res/tube_1010.gif');
						set('batcher_2_tube_3_src',		'res/tube_1010.gif');
						set('batcher_2_tube_4_src',		'res/tube_1001.gif');
						set('btn_load_2_background',	'#fff');

						render();
						mixing();
					}
				}, timer)
			}
			myLoop_2();
		}
//Функция смешивания содержимого в миксере 1
		function mixing()
		{
			let timer = 500;
			let mix = setTimeout(function()
			{
				set('mixer_1_stirrer_src', 		'res/stirrer_on.gif');
				set('console_mixer_1_text', data.mixing_in_progress[get('language')]);
				set('console_batcher_1_text', data.mixing_in_progress[get('language')]);
				set('console_batcher_2_text', data.mixing_in_progress[get('language')]);
				
				render();
				mixing_stop();

			}, timer)
		}
//Функция остановки смешивания содержимого миксера 1
		function mixing_stop()
		{
			let timer = 6000;
			let stop = setTimeout(function()
			{
				set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
				set('console_mixer_1_text', data.mixing_is_over[get('language')]);
				set('console_batcher_1_text', data.mixing_is_over[get('language')]);
				set('console_batcher_2_text', data.mixing_is_over[get('language')]);
				
				render();
				unloading_mixer_1();
				
			}, timer)
		}
//Функция выгрузки миксера 1
		function unloading_mixer_1()
		{
			let timer = 4000;
			let out = setTimeout(function()
			{
				set('mixer_1_tap_1_src', 'res/tap_vert_open_ud.gif');
				set('console_mixer_1_text', data.unloading_in_progress[get('language')]);
				set('console_batcher_1_text', data.unloading_in_progress[get('language')]);
				set('console_batcher_2_text', data.unloading_in_progress[get('language')]);

				let i_3 = 0;
				let mixer_1_curr_level = parseInt(get('mixer_1_src').slice(12).match(/\d+/));
				function Unloading()
				{
					let timer = 500;
					
					setTimeout(function()
					{
						render();
						i_3++;

						if (mixer_1_curr_level >= i_3)
						{
							set('mixer_1_src', 'res/mixer_1_'+ (mixer_1_curr_level - i_3) +'.gif');
							Unloading();
						}
						else
						{
							set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
							set('console_mixer_1_text', data.upload_finished[get('language')]);
							set('console_batcher_1_text', data.upload_finished[get('language')]);
							set('console_batcher_2_text', data.upload_finished[get('language')]);
							set('mixer_1_strain_gauge_text', '0');
							set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
							set('btn_on_background', 		'#fff');
							set('btn_run_background', 		'#fff');
							set('btn_off_background', 		'#fff');
							set('btn_load_1_background',	'#fff');
							set('btn_load_2_background', 	'#fff');
							set('btn_sanit_background', 	'#fff');
							localStorage.removeItem('recipe');
							
							render();
						}
					}, timer)
				}
				
				Unloading();
				
			}, timer)
		}
	}
	else
	{
		alert(data.need_to_select[get('language')]);
	}
}

//Обработчик нажатия на кнопку загрузки дозатора 1 (левая кнопка "load")	
load_1.onclick = function()
{
	if(get('btn_on_background') == '#0f0' && get('btn_load_1_background') !== '#fff')
	{
		var i = 1;
		let butcher_1_curr_level = parseInt(get('batcher_1_src').slice(14).match(/\d+/));
		set('batcher_1_sensor_min_src', 'res/sensor_green.gif');
		function Filling()
		{
			set('batcher_1_src', 'res/batcher_1_'+ (butcher_1_curr_level + i) +'.gif');
			setTimeout(function()
			{    
				render();
				i++;                    
				if ((butcher_1_curr_level + i) <= 10)
				{           
					Filling();
				}
				else
				{
					set('batcher_1_sensor_max_src', 'res/sensor_green.gif');
					set('btn_load_1_background', '#fff');
					set('console_batcher_1_text', 	data.ready_for_work[get('language')]);
					render();
				}
			}, 300)
		}
		Filling();		
	}
	else
	{
		if(get('batcher_1_sensor_max_src') == 'res/sensor_green.gif')
		{
			alert(data.batcher_is_full[get('language')]);
		}
		else
		{
			alert(data.turn_on[get('language')]);
		}
		render();
	}
};

//Обработчик нажатия на кнопку загрузки дозатора 2 (правая кнопка "load")	
load_2.onclick = function()
{
	if(get('btn_on_background') == '#0f0' && get('btn_load_2_background') !== '#fff')
	{
		var i = 1;                     
		set('batcher_2_sensor_min_src', 'res/sensor_green.gif');
		function myLoop()
		{           
			setTimeout(function()
			{    
				set('batcher_2_src', 'res/batcher_1_'+ i +'.gif'); 
				render();
				i++;                    
				if (i <= 10)
				{           
					myLoop();
				}
				else
				{
					set('batcher_2_sensor_max_src', 'res/sensor_green.gif');
					set('btn_load_2_background', '#fff');
					set('console_batcher_2_text', 	data.ready_for_work[get('language')]);
					
					render();
				}
			}, 300)
		}
		myLoop();		
	}
	else
	{
		if(get('batcher_2_sensor_max_src') == 'res/sensor_green.gif')
		{
			alert(data.batcher_is_full[get('language')]);
		}
		else
		{
			alert(data.turn_on[get('language')]);
		}
		
		render();
	}
};

//Обработчик нажатия на кнопку "sanit"	
sanit.onclick = function()
{
	if(get('btn_on_background') == '#0f0')
	{
		set('btn_on_background', 		'#fff');
		set('btn_run_background', 		'#fff');
		set('btn_off_background', 		'#f00');
		set('btn_load_1_background',	'#fff');
		set('btn_load_2_background', 	'#fff');
		set('btn_sanit_background', 	'#fff');
		
		set('console_mixer_1_text', 	data.sanitation[get('language')]);
		set('mixer_1_src', 				'res/mixer_1_0.gif');
		set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
		set('mixer_1_sensor_max_src', 	'res/sensor_red.gif');
		set('mixer_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
		set('mixer_1_stirrer_src', 		'res/stirrer_on.gif');
		set('mixer_1_strain_gauge_text','0');
			
		set('console_batcher_1_text', 	data.sanitation[get('language')]);
		set('batcher_1_src', 			'res/batcher_1_0.gif');
		set('batcher_1_sensor_min_src', 'res/sensor_red.gif');
		set('batcher_1_sensor_max_src', 'res/sensor_red.gif');
		set('batcher_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
		set('batcher_1_tube_1_src',		'res/tube_2010.gif');
		set('batcher_1_tube_2_src',		'res/tube_2010.gif');
		set('batcher_1_tube_3_src',		'res/tube_2010.gif');
		set('batcher_1_tube_4_src',		'res/tube_2100.gif');
			
		set('console_batcher_2_text', 	data.sanitation[get('language')]);
		set('batcher_2_src', 			'res/batcher_1_0.gif');
		set('batcher_2_sensor_min_src', 'res/sensor_red.gif');
		set('batcher_2_sensor_max_src', 'res/sensor_red.gif');
		set('batcher_2_tap_1_src', 		'res/tap_vert_open_ud.gif');
		set('batcher_2_tube_1_src',		'res/tube_2010.gif');
		set('batcher_2_tube_2_src',		'res/tube_2010.gif');
		set('batcher_2_tube_3_src',		'res/tube_2010.gif');
		set('batcher_2_tube_4_src',		'res/tube_2001.gif');
		
		localStorage.removeItem('recipe');
	}
	else
	{
		alert(data.turn_on[get('language')]);
	}
	render();
};

//Функция отрисовки интерфейса обновленными значениями.
function render()
{
	
	document.getElementById('on').style.background 		= get('btn_on_background');
	document.getElementById('run').style.background 	= get('btn_run_background');
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