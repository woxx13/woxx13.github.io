'use strict;'

const batcher_1 = new Batcher('batcher_1',1000,['res/batcher_1_0.gif','res/batcher_1_2.gif','res/batcher_1_8.gif'],false,'batcher_1_sensor_max',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'],'batcher_1_sensor_min',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'], 'batcher_1_tap_1',false,'vert_ud',['res/tap_vert_close.gif','res/tap_vert_open_du.gif','res/tap_vert_open_ud.gif','res/tap_hor_close.gif','res/tap_hor_open_lr.gif','res/tap_hor_open_rl.gif'],false,{'batcher_1_tube_1':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_1_tube_2':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_1_tube_3':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_1_tube_4':['res/tube_1100.gif','res/tube_2100.gif']});

const batcher_2 = new Batcher('batcher_2',1000,['res/batcher_1_0.gif','res/batcher_1_2.gif','res/batcher_1_8.gif'],false,'batcher_2_sensor_max',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'],'batcher_2_sensor_min',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'], 'batcher_2_tap_1',false,'vert_ud',['res/tap_vert_close.gif','res/tap_vert_open_du.gif','res/tap_vert_open_ud.gif','res/tap_hor_close.gif','res/tap_hor_open_lr.gif','res/tap_hor_open_rl.gif'],false,{'batcher_2_tube_1':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_2_tube_2':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_2_tube_3':['res/tube_1010.gif','res/tube_2010.gif'],'batcher_2_tube_4':['res/tube_1001.gif','res/tube_2001.gif']});

const mixer_1 = new Mixer('mixer_1',1000,['res/mixer_1_0.gif','res/mixer_1_2.gif','res/mixer_1_8.gif'],false,'mixer_1_sensor_max',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'],'mixer_1_sensor_min',undefined,['res/sensor_red.gif','res/sensor_green.gif','res/sensor_blink.gif'], 'mixer_1_tap_1',false,'vert_ud',['res/tap_vert_close.gif','res/tap_vert_open_du.gif','res/tap_vert_open_ud.gif','res/tap_hor_close.gif','res/tap_hor_open_lr.gif','res/tap_hor_open_rl.gif'],false,{},'mixer_1_stirrer',true,['res/stirrer_off.gif','res/stirrer_on.gif','res/stirrer_und.gif'],'mixer_1_strain_gauge',0);


//Обесцвечиваем кнопки управления
function color_delete()
{	
	document.getElementById('on').style.background 		= '#fff';
	document.getElementById('off').style.background 	= '#fff';
	document.getElementById('run').style.background 	= '#fff';
	document.getElementById('pause').style.background 	= '#fff';
	document.getElementById('load_1').style.background 	= '#fff';
	document.getElementById('load_2').style.background 	= '#fff';
	document.getElementById('sanit').style.background 	= '#fff';
}

//Возвращаем цвет кнопкам управления
function color_return()
{	
	document.getElementById('on').style.background 		= '#0f0';
	document.getElementById('off').style.background 	= '#f00';
	document.getElementById('run').style.background 	= '#0f0';
	document.getElementById('pause').style.background 	= '#faa';
	document.getElementById('load_1').style.background 	= '#999';
	document.getElementById('load_2').style.background 	= '#999';
	document.getElementById('sanit').style.background 	= '#00f';
}
//Инициализация. Происходит при загрузке (обновлении) приложения.
function init()
{
	color_delete();
	
	batcher_1.check_power();
	batcher_1.check_state();
	batcher_1.check_state_tap_1();
	batcher_1.embed_data_into_html();

	batcher_2.check_power();
	batcher_2.check_state();
	batcher_2.check_state_tap_1();
	batcher_2.embed_data_into_html();

	mixer_1.check_power();
	mixer_1.check_state();
	mixer_1.check_state_tap_1();
	mixer_1.embed_data_into_html();
}

function run()
{
	batcher_1.check_power();
	batcher_1.check_state();
	batcher_1.check_state_tap_1();
	batcher_1.embed_data_into_html();
	
	// batcher_1.get_info();

	batcher_2.check_power();
	batcher_2.check_state();
	batcher_2.check_state_tap_1();
	batcher_2.embed_data_into_html();

	mixer_1.check_power();
	mixer_1.check_state();
	mixer_1.check_state_tap_1();
	mixer_1.embed_data_into_html();
}

on.onclick = function()
{
	color_return();
	batcher_1.power_on();
    batcher_2.power_on();
    mixer_1.power_on();
	run();
};

off.onclick = function()
{
	color_delete();
	batcher_1.power_off();
	batcher_2.power_off();
	mixer_1.power_off();
	run();
};

sanit.onclick = function()
{
	color_delete();
};

load_1.onclick = function()
{
    batcher_1.sensor_min.set_state(true);
    batcher_1.sensor_max.set_state(true);
    batcher_1.embed_data_into_html();
};

load_2.onclick = function()
{
    batcher_2.sensor_min.set_state(true);
    batcher_2.sensor_max.set_state(true);
    batcher_2.embed_data_into_html();
};

init();
run();