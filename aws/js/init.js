/**
*						
*
*/
'use strict;'
/////////////////////////////// 	Блок инициализации переменных. Начало.
	let tank;					//Состояние бака (может быть 0-пуст, 1-половина, 2-полон)
	let sensor_max 			= 0;//Датчик максимального уровня
	let sensor_min 			= 0;//Датчик минимального уровня
	let tap_1				= 0;//Кран наполнения
	let tap_2				= 0;//Кран расхода
	const time_out_max		= 10;//Время, за которое опорожняется полный бак
	let time_out_current	= 0;//Текущее значение времени опорожнения бака
/////////////////////////////// 	Блок объявления функций.
///////////////////////////////		Функция "проверка состояния датчиков"
	function check_sensors()
	{
		if(sensor_max === 0 && sensor_min === 0 && time_out_current === 0)
		{
			empty_tank();
			setTimeout(increment_timer, 1000);
			run_tank_filling();
		}
		if(sensor_max === 0 && (sensor_min === 0 || sensor_min === 1) && time_out_current >=1 && time_out_current < time_out_max/2)
		{
			sensor_min = 1;
			setTimeout(increment_timer, 1000);
			run_tank_filling();
		}
		if(sensor_max === 0 && sensor_min === 1 && time_out_current === time_out_max/2)
		{
			half_tank();
			setTimeout(increment_timer, 1000);
			run_tank_filling();
		}
		if(sensor_max === 0 && sensor_min === 1 && time_out_current > time_out_max/2 && time_out_current < time_out_max)
		{
			setTimeout(increment_timer, 1000);
			run_tank_filling();
		}
		if(sensor_max === 0 && sensor_min === 1 && time_out_current === time_out_max)
		{
			sensor_max = 1;
			full_tank();
			stop_tank_filling();
		}
		else
		{
			clearTimeout();
		}
	}
///////////////////////////////		Функция "таймер приращения"	
	function increment_timer()
	{
		time_out_current++;
		console.log('time_out_current ' + time_out_current);
		check_sensors();
	}
///////////////////////////////		Функция "таймер убывания"
	function decrement_timer()
	{
		time_out_current--;
		console.log('time_out_current ' + time_out_current);
		check_sensors();
	}
///////////////////////////////		Функция "бак пуст"
	function empty_tank()
	{
		document.getElementById('sensor_max').src	='res/sensor_red.gif';
		document.getElementById('sensor_min').src	='res/sensor_red.gif';
		document.getElementById('tank').src			='res/mixer_1_1.gif';
		tank = 0;
	}
///////////////////////////////		Функция "половина бака"
	function half_tank()
	{
		document.getElementById('sensor_min').src	='res/sensor_green.gif';
		document.getElementById('tank').src			='res/mixer_1_5.gif';
		tank = 1;
	}
///////////////////////////////		Функция "бак полон"
	function full_tank()
	{
		document.getElementById('sensor_max').src	='res/sensor_green.gif';
		document.getElementById('tank').src			='res/mixer_1_10.gif';
		tank = 2;
	}								
///////////////////////////////		Функция "пуск заполнения бака"
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
///////////////////////////////		Функция "стоп заполнения бака"
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
///////////////////////////////		Функция "пуск опорожнения бака"
	function run_tank_empting()
	{
		document.getElementById('tap_2').src='res/tap_hor_open_lr.gif';
		document.getElementById('tube_flow_1').src='res/tube_2010.gif';
		document.getElementById('tube_flow_2').src='res/tube_2010.gif';
		document.getElementById('tube_flow_3').src='res/tube_2100.gif';
	}
///////////////////////////////		Функция "стоп опорожнения бака"
	function stop_tank_empting()
	{
		document.getElementById('tap_2').src='res/tap_hor_close.gif';
		document.getElementById('tube_flow_1').src='res/tube_1010.gif';
		document.getElementById('tube_flow_2').src='res/tube_1010.gif';
		document.getElementById('tube_flow_3').src='res/tube_1100.gif';
	}