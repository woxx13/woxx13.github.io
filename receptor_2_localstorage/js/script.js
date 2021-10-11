'use strict;'

localStorage.clear();
//Запись в базу
function set(key,value)
{
	localStorage.setItem(key, value);		
}
//Извлечение из базы
function get(key)
{
	return localStorage.getItem(key);
}
//записать в базу id выбраного в стартовом меню рецепта. Старое значение при этом затирается.
function set_recipe(recipe_id)
{
	let id = recipe_id.toString();
	localStorage.setItem('recipe', id.slice(7));
}
//Извлечь из базы выбраный рецепт. Если не выбран ни один, отключить кнопку "run".
function get_recipe()
{
	if (localStorage.getItem('recipe') !== null)
	{
		return localStorage.getItem('recipe');
	}
	else
	{
		set('btn_run_background', '#fff');
	}
}
/**
*     Объявление переменных объектов интерфейса и инициализация их значениями по умолчанию, т.е. когда система обесточена
*/
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
};

/**
*     Обработчики взаимодействия с видимыми элементами интерфейса(кнопками, пунктами меню и т.д.) 
*/
//Обработчик нажатия на кнопку "on"	
on.onclick = function()
{
	set('btn_on_background', 		'#0f0');
	set('btn_run_background', 		'#fff');
	set('btn_off_background', 		'#f00');
	set('btn_load_1_background',	'#aaa');
	set('btn_load_2_background', 	'#aaa');
	set('btn_sanit_background', 	'#00f');
	
	set('console_mixer_1_text', 	'Готов к работе!');
	set('mixer_1_src', 				'res/mixer_1_0.gif');
	set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
	set('mixer_1_sensor_max_src', 	'res/sensor_red.gif');
	set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
	set('mixer_1_strain_gauge_text','0');
		
	set('console_batcher_1_text', 	'Добавьте ингредиент!');
	set('batcher_1_src', 			get('batcher_1_src'));
	set('batcher_1_sensor_min_src', (get('batcher_1_sensor_min_src') == 'res/sensor_blink.gif') ? 'res/sensor_red.gif' : get('batcher_1_sensor_min_src'));
	set('batcher_1_sensor_max_src', 'res/sensor_red.gif');
	set('batcher_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_1_tube_1_src',		'res/tube_1010.gif');
	set('batcher_1_tube_2_src',		'res/tube_1010.gif');
	set('batcher_1_tube_3_src',		'res/tube_1010.gif');
	set('batcher_1_tube_4_src',		'res/tube_1100.gif');
		
	set('console_batcher_2_text', 	'Добавьте ингредиент!');
	set('batcher_2_src', 			'res/batcher_1_0.gif');
	set('batcher_2_sensor_min_src', 'res/sensor_red.gif');
	set('batcher_2_sensor_max_src', 'res/sensor_red.gif');
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
	set('btn_on_background', 		'#fff');
	set('btn_run_background', 		'#fff');
	set('btn_off_background', 		'#fff');
	set('btn_load_1_background',	'#fff');
	set('btn_load_2_background', 	'#fff');
	set('btn_sanit_background', 	'#fff');
	
	set('console_mixer_1_text', 	'Система обесточена!');
	set('mixer_1_src', 				'res/mixer_1_0.gif');
	set('mixer_1_sensor_min_src', 	'res/sensor_blink.gif');
	set('mixer_1_sensor_max_src', 	'res/sensor_blink.gif');
	set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
	set('mixer_1_strain_gauge_text','0');
		
	set('console_batcher_1_text', 	'Система обесточена!');
	set('batcher_1_src', 			'res/batcher_1_0.gif');
	set('batcher_1_sensor_min_src', 'res/sensor_blink.gif');
	set('batcher_1_sensor_max_src', 'res/sensor_blink.gif');
	set('batcher_1_tap_1_src', 		'res/tap_vert_close.gif');
	set('batcher_1_tube_1_src',		'res/tube_1010.gif');
	set('batcher_1_tube_2_src',		'res/tube_1010.gif');
	set('batcher_1_tube_3_src',		'res/tube_1010.gif');
	set('batcher_1_tube_4_src',		'res/tube_1100.gif');
		
	set('console_batcher_2_text', 	'Система обесточена!');
	set('batcher_2_src', 			'res/batcher_1_0.gif');
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
	let level_max_1 = parseInt(get('batcher_1_src').slice(14).match(/\d+/));//Уровень, с которого начинается опорожнение дозатора 1(после slice() остается, например, "10.gif", а после match() - "10")	
	let level_max_2 = 10;
	let level_min_1 = get_recipe();//сколько десятых частей нужно выгрузить из дозатора 1, численно равно выбраному рецепту
	let level_min_2 = 10;
	let i_1 = 0;//счетчик для дозатора 1
	let i_2 = 0;//счетчик для дозатора 2
	let begin_index;
	if(get('console_mixer_1_text') == 'Готов к работе!' && get('console_batcher_1_text') == 'Готов к работе!' && get('console_batcher_2_text') == 'Готов к работе!' && get('recipe'))
	{
		function myLoop_1()
		{           
			setTimeout(function()
			{    
				set('batcher_1_src', 'res/batcher_1_'+ (level_max_1 - i_1) +'.gif');
				set('mixer_1_strain_gauge_text', String(i_1));
				// alert(get('mixer_1_strain_gauge_text')+" "+ i_1);
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
					set('console_batcher_1_text', 'Идет смешивание!');
					set('btn_load_1_background', '#aaa');
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
					
					
					begin_index = parseInt(get('mixer_1_src').slice(12).match(/\d+/));
					myLoop_2();
				}
			}, 500)
		}
		function myLoop_2()
		{           
			setTimeout(function()
			{    
				set('batcher_2_src', 'res/batcher_1_'+ (level_max_2 - i_2) +'.gif');
				set('mixer_1_strain_gauge_text', String(parseInt(get('mixer_1_strain_gauge_text')) + 10));
				//alert(get('mixer_1_strain_gauge_text'));
				set('batcher_2_tap_1_src', 		'res/tap_vert_open_ud.gif');
				set('batcher_2_tube_1_src',		'res/tube_2010.gif');
				set('batcher_2_tube_2_src',		'res/tube_2010.gif');
				set('batcher_2_tube_3_src',		'res/tube_2010.gif');
				set('batcher_2_tube_4_src',		'res/tube_2001.gif');
				if(i_2 % 2 == 0)
				{
					
					set('mixer_1_src', 'res/mixer_1_'+ (begin_index + i_2/2) +'.gif');
				}
					
				render();
				i_2++;
				if ((level_max_2 - i_2) == 9)
				{ 
					set('console_batcher_2_text', 'Идет смешивание!');
					set('btn_load_2_background', '#aaa');
					set('batcher_2_sensor_max_src', 'res/sensor_red.gif');
				}
				if ((level_max_2 - i_2) == 1)
				{           
					set('batcher_2_sensor_min_src', 'res/sensor_red.gif');
				}
				if (i_2 < level_min_2)
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
					
					let mixing = setTimeout(function()
					{
						set('mixer_1_stirrer_src', 		'res/stirrer_on.gif');
						set('console_mixer_1_text', 'Идет смешивание!');
						set('console_batcher_1_text', 'Идет смешивание!');
						set('console_batcher_2_text', 'Идет смешивание!');
						render();
						
					}, 2000)
					let stop = setTimeout(function()
					{
						set('mixer_1_stirrer_src', 		'res/stirrer_off.gif');
						set('console_mixer_1_text', 'Смешивание закончено!');
						set('console_batcher_1_text', 'Смешивание закончено!');
						set('console_batcher_2_text', 'Смешивание закончено!');
						set('mixer_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
						render();
						
					}, 8000)
					let out = setTimeout(function()
					{
						set('mixer_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
						set('console_mixer_1_text', 'Идет выгрузка!');
						set('console_batcher_1_text', 'Идет выгрузка!');
						set('console_batcher_2_text', 'Идет выгрузка!');
						
						let i_3 = 1;
						let mixer_1_curr_level = parseInt(get('mixer_1_src').slice(12).match(/\d+/));
						//set('mixer_1_sensor_min_src', 'res/sensor_green.gif');
						function Unloading()
						{
							set('mixer_1_src', 'res/mixer_1_'+ (mixer_1_curr_level - i_3) +'.gif');
							setTimeout(function()
							{    
								render();
								i_3++;                    
								if ((mixer_1_curr_level + i_3) <= 10)
								{           
									Unloading();
								}
								else
								{
									set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
									set('mixer_1_strain_gauge_text', '0');
									set('mixer_1_tap_1_src', 		'res/tap_vert_close.gif');
									render();
								}
							}, 300)
						}
						Unloading();
						
						render();
						
					}, 12000)
					let finish = setTimeout(function()
					{
						set('console_mixer_1_text', 'Выгрузка окончена!');
						set('console_batcher_1_text', 'Выгрузка окончена!');
						set('console_batcher_2_text', 'Выгрузка окончена!');
						set('btn_on_background', 		'#fff');
						set('btn_run_background', 		'#fff');
						set('btn_off_background', 		'#fff');
						set('btn_load_1_background',	'#fff');
						set('btn_load_2_background', 	'#fff');
						set('btn_sanit_background', 	'#fff');
						
						render();
						//clearTimeout();
						
					}, 15000)
					
				}
			}, 500)
		}
		myLoop_1();
	}
	else
	{
		alert("Сначала нужно выбрать рецепт в меню слева!");
	}
};

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
					set('console_batcher_1_text', 	'Готов к работе!');
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
			alert('Дозатор заполнен!');
		}
		else
		{
			alert('Нужно сначала нажать кнопку "on"!');
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
					set('console_batcher_2_text', 	'Готов к работе!');
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
			alert('Дозатор заполнен!');
		}
		else
		{
			alert('Нужно сначала нажать кнопку "on"!');
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
		set('btn_off_background', 		'#fff');
		set('btn_load_1_background',	'#fff');
		set('btn_load_2_background', 	'#fff');
		set('btn_sanit_background', 	'#fff');
		
		set('console_mixer_1_text', 	'Санобработка!');
		set('mixer_1_src', 				'res/mixer_1_0.gif');
		set('mixer_1_sensor_min_src', 	'res/sensor_red.gif');
		set('mixer_1_sensor_max_src', 	'res/sensor_red.gif');
		set('mixer_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
		set('mixer_1_stirrer_src', 		'res/stirrer_on.gif');
		set('mixer_1_strain_gauge_text','0');
			
		set('console_batcher_1_text', 	'Санобработка!');
		set('batcher_1_src', 			'res/batcher_1_0.gif');
		set('batcher_1_sensor_min_src', 'res/sensor_red.gif');
		set('batcher_1_sensor_max_src', 'res/sensor_red.gif');
		set('batcher_1_tap_1_src', 		'res/tap_vert_open_ud.gif');
		set('batcher_1_tube_1_src',		'res/tube_2010.gif');
		set('batcher_1_tube_2_src',		'res/tube_2010.gif');
		set('batcher_1_tube_3_src',		'res/tube_2010.gif');
		set('batcher_1_tube_4_src',		'res/tube_2100.gif');
			
		set('console_batcher_2_text', 	'Санобработка!');
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
		set('console_mixer_1_text', 	'Нужно сначала нажать кнопку "on"!');
	}
	render();
};

function choose_recipe(recipe_id)
{
	if(get('console_mixer_1_text') == 'Готов к работе!' && get('console_batcher_1_text') == 'Готов к работе!' && get('console_batcher_2_text') == 'Готов к работе!')
	{
		set_recipe(recipe_id);
		set('btn_run_background', 		'#0f0');
		
		render();
	}
	else
	{
		alert('Сначала нужно загрузить все дозаторы ингредиентами!');
	}
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