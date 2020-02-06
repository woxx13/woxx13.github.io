/**
*						
*
*/
'use strict;'
/////////////////////////////// 	Блок инициализации переменных.

	//let tank;					//Состояние бака (может быть 0-пуст, 1-половина, 2-полон)
	let sensor_max 			= 0;//Датчик максимального уровня
	let sensor_min 			= 0;//Датчик минимального уровня
	let tap_1				= 0;//Кран наполнения
	let tap_2				= 0;//Кран расхода
	
///////////////////////////////		Переменные эмуляции наполнения и расхода

//Уровень жидкости в баке, когда он полон. Для удобства визуализации численно равен времени в секундах, за которое наполняется бак от нуля до максимума.
	const 	tank_level_max		= 10;
	let 	tank_level_curr		= 0;//Текущий уровень в баке
	
	
/////////////////////////////// 	Блок объявления функций.

///////////////////////////////		Функция "проверка состояния датчиков"
	function check_sensors()
	{
		if(	sensor_max 		=== 0 &&
			(sensor_min 	=== 0 || sensor_min === 1) &&
			tank_level_curr === 0)
		{
			empty_tank();
			if(tap_1 === 0)
			{
				tap_1 = 1;
				run_tank_filling();
				setTimeout(level_control_tank, 1000);
			}
			if(tap_2 === 1)
			{
				tap_2 = 0;
				sensor_min = 0;
				stop_tank_empting();
			}			
		}
		else if(	sensor_max 		=== 0 &&
					(sensor_min 	=== 0 || sensor_min === 1) &&
					tank_level_curr >=1 &&
					tank_level_curr < tank_level_max/2)
		{
			sensor_min = 1;
			if(tap_1 === 1)
			{
				run_tank_filling();
			}
			if(tap_2 === 1)
			{
				run_tank_empting();
			}
			setTimeout(level_control_tank, 1000);
		}
		else if(	sensor_max 		=== 0 &&
					sensor_min 		=== 1 &&
					tank_level_curr === tank_level_max/2)
		{
			half_tank();
			if(tap_1 === 1)
			{
				run_tank_filling();
			}
			if(tap_2 === 1)
			{
				run_tank_empting();
			}
			setTimeout(level_control_tank, 1000);
		}
		else if(	sensor_max 		=== 0 &&
					sensor_min 		=== 1 &&
					tank_level_curr > tank_level_max/2 &&
					tank_level_curr < tank_level_max)
		{
			if(tap_1 === 1)
			{
				run_tank_filling();
			}
			if(tap_2 === 1)
			{
				run_tank_empting();
			}
			setTimeout(level_control_tank, 1000);
		}
		else if(	sensor_max 		=== 0 &&
					sensor_min 		=== 1 &&
					tank_level_curr === tank_level_max)
		{
			if(tap_1 === 1)
			{
				sensor_max = 1;
				full_tank();
				tap_1 = 0;
				stop_tank_filling();
			}
			if(tap_2 === 1)
			{
				run_tank_empting();
				setTimeout(level_control_tank, 1000);
			}
		}
		else if(	sensor_max 		=== 1 &&
					sensor_min 		=== 1 &&
					tank_level_curr === tank_level_max)
		{
			if(tap_2 === 1)
			{
				sensor_max = 0;
				document.getElementById('sensor_max').src	='res/sensor_red.gif';
				run_tank_empting();
				setTimeout(level_control_tank, 1000);
			}
		}
		else
		{
			clearTimeout();
		}
		console.log('tank_level_curr= ' + tank_level_curr + ', tap_1= ' + tap_1);
	}
///////////////////////////////		Функция "управление уровнем воды в баке"	
	function level_control_tank()
	{
		//Если открыт кран наполнения, увеличить уровень воды в баке на 1
		if(tap_1 === 1)
		{
			tank_level_curr++;
		}
		//Если открыт кран расхода, уменьшить уровень воды в баке на 1
		if(tap_2 === 1)
		{
			tank_level_curr--;
		}
		check_sensors();	
	}
///////////////////////////////		Функция "визуализация бак пуст"
	function empty_tank()
	{
		document.getElementById('sensor_max').src	='res/sensor_red.gif';
		document.getElementById('sensor_min').src	='res/sensor_red.gif';
		document.getElementById('tank').src			='res/mixer_1_1.gif';
	}
///////////////////////////////		Функция "визуализация половина бака"
	function half_tank()
	{
		document.getElementById('sensor_min').src	='res/sensor_green.gif';
		document.getElementById('tank').src			='res/mixer_1_5.gif';
	}
///////////////////////////////		Функция "визуализация бак полон"
	function full_tank()
	{
		document.getElementById('sensor_max').src	='res/sensor_green.gif';
		document.getElementById('tank').src			='res/mixer_1_10.gif';
	}								
///////////////////////////////		Функция "визуализация пуск заполнения бака"
	function run_tank_filling()
	{
		document.getElementById('tap_1').src		='res/tap_hor_open_lr.gif';
		document.getElementById('tube_press_1').src	='res/tube_1002.gif';
		document.getElementById('tube_press_2').src	='res/tube_1020.gif';
		document.getElementById('tube_press_3').src	='res/tube_1020.gif';
		document.getElementById('tube_press_4').src	='res/tube_1020.gif';
		document.getElementById('tube_press_5').src	='res/tube_0120.gif';
		document.getElementById('tube_press_6').src	='res/tube_0102.gif';
		document.getElementById('tube_press_7').src	='res/tube_0012.gif';
	}
///////////////////////////////		Функция "визуализация стоп заполнения бака"
	function stop_tank_filling()
	{
		document.getElementById('tap_1').src		='res/tap_hor_close.gif';
		document.getElementById('tube_press_1').src	='res/tube_1001.gif';
		document.getElementById('tube_press_2').src	='res/tube_1010.gif';
		document.getElementById('tube_press_3').src	='res/tube_1010.gif';
		document.getElementById('tube_press_4').src	='res/tube_1010.gif';
		document.getElementById('tube_press_5').src	='res/tube_0110.gif';
		document.getElementById('tube_press_6').src	='res/tube_0101.gif';
		document.getElementById('tube_press_7').src	='res/tube_0011.gif';
	}
///////////////////////////////		Функция "визуализация пуск опорожнения бака"
	function run_tank_empting()
	{
		document.getElementById('tap_2').src='res/tap_hor_open_lr.gif';
		document.getElementById('tube_flow_1').src='res/tube_2010.gif';
		document.getElementById('tube_flow_2').src='res/tube_2010.gif';
		document.getElementById('tube_flow_3').src='res/tube_2100.gif';
	}
///////////////////////////////		Функция "визуализация стоп опорожнения бака"
	function stop_tank_empting()
	{
		document.getElementById('tap_2').src='res/tap_hor_close.gif';
		document.getElementById('tube_flow_1').src='res/tube_1010.gif';
		document.getElementById('tube_flow_2').src='res/tube_1010.gif';
		document.getElementById('tube_flow_3').src='res/tube_1100.gif';
	}
///////////////////////////////		Функция "Инициализация опорожнения бака"
// Обработчик события открытия крана расхода
	function init_tank_empting()
	{
		tap_2 = 1;
		run_tank_empting();
		check_sensors();
	}
///////////////////////////////		Функция "Инициализация остановки опорожнения бака"
// Обработчик события закрытия крана расхода
	function init_stop_tank_empting()
	{
		clearTimeout();
		tap_2 = 0;
		stop_tank_empting();
		check_sensors();
	}