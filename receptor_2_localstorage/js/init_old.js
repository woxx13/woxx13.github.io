/******************************************************************************************************************
*
*       								File of initialization. Begin.
*
******************************************************************************************************************/
'use strict;'
//creating an arrays of values to replace \n, \t, <br>, <&nbsp;> in console.log(\n, \t) and in html-elements.
let n = (function arr_n()
{
	let x = ['\n'];
	for(let i = 1; i < 10; i++)
	{
		x[i] = x[i-1] + '\n';
	}
	return(x);
}());
let t = (function arr_n()
{
	let x = ['\t'];
	for(let i = 1; i < 20; i++)
	{
		x[i] = x[i-1] + '\t';
	}
	return(x);
}());
let br = (function arr_n()
{
	let x = ['<br>'];
	for(let i = 1; i < 10; i++)
	{
		x[i] = x[i-1] + '<br>';
	}
	return(x);
}());
let ht = (function arr_n()
{
	let x = ['&nbsp;'];
	for(let i = 1; i < 50; i++)
	{
		x[i] = x[i-1] + '&nbsp;';
	}
	return(x);
}());
//Embeded in tank sensors. Usually controlling minimal or maximum volume liquid in tank.
class Sensor
{
	constructor(id,state,arr_possible_src)
	{
		this.id					= id;	//for examle: 'tank_1_sensor_max'(you need to take it from .html file)
		this.state 				= state;//may be true,false or undefined - in case of absence of voltage.
		this.arr_possible_src	= arr_possible_src;	//array of all path to files of images
		this.src_curr;				//current image, for example: 'res/img.gif', depends by this.state.
		// this.info_panel			= document.getElementById('console_'+`${this.id}`); //html-object for display info about
	}
//receive info about instance of class
	get_info()
	{
		console.log(`${n[0]}Info about instance of class Sensor:${n[0]}id${t[4]}=${t[0]}${this.id}${n[0]}state${t[3]}=${t[0]}${this.state}${n[0]}arr_possible_src${t[0]}=${t[0]}${this.arr_possible_src}${n[0]}src_curr${t[2]}=${t[0]}${this.src_curr}`);
	}
//getting the state of sensors (from the database, from the .txt file or directly from the sensor)
	get_state()
	{
		this.state = localStorage.getItem(this.id);
		return this.state;
	}
//Принудительно устанавливает состояние датчика уровня(и соответствующую этому состоянию картинку). Функция нужна для эмуляции работы системы. В реальной жизни состояние датчиков зависит только от уровня жидкости в контролируемой емкости.
	set_state(value)
	{
		localStorage.setItem(this.id, value);
		this.state 			= this.get_state();
		if(this.state 		!= 	undefined)
		{
//if true - indicated by green color, false -  by red...
			this.src_curr	= this.state ? this.arr_possible_src[1] : this.arr_possible_src[0];
		}
//...undefined - by blink black-white color
		else
		{
			this.src_curr	= this.arr_possible_src[2];
		}
		return this.state;
	}
}
//class of valves that regulate the movement of fluid to or from a tank.
class Tap
{
	constructor(id,state,type,arr_possible_src)
	{
		this.id					= id;		//for example: 'tap'(need to take from .html file)
		this.state 				= state;	//may be true or false
		this.type				= type;		//mmay be: 'vert_du','vert_ud','hor_lr','hor_rl'.For example: 'vert_du', i.e. tap vertically positioned and when it opening liquid moves from down to up
		this.arr_possible_src	= arr_possible_src;	//array of all path to files of images: ['res/tap_vert_close.gif','res/tap_vert_open_du.gif','res/tap_vert_open_ud.gif','res/tap_hor_close.gif','res/tap_hor_open_lr.gif','res/tap_hor_open_rl.gif']
		this.src_curr;    		//current image, for example: 'res/img.gif', depends by this.state and this.type
	}
	//receive info about instance of class
	get_info()
	{
		console.log(`${n[0]}Info about instance of class Tap:${n[0]}id${t[4]}=${t[0]}${this.id}${n[0]}state${t[3]}=${t[0]}${this.state}${n[0]}style${t[3]}=${t[0]}${this.style}${n[0]}type${t[3]}=${t[0]}${this.type}${n[0]}arr_possible_src${t[0]}=${t[0]}${this.arr_possible_src}${n[0]}src_curr${t[4]}=${t[0]}${this.src_curr}`);
	}
//Получить состояние крана
	get_state()
	{
		this.state = localStorage.getItem(this.id);
		return this.state;
	}
//Setting of the crane state. Also means a change in the picture depicting it
	set_state(value)
	{
		localStorage.setItem(this.id, value);
		this.state	= 	this.get_state();
		switch(this.type)
		{
			case 'vert_du':
			this.src_curr = this.state ? this.arr_possible_src[1] : this.arr_possible_src[0];
			break;
			case 'vert_ud':
			this.src_curr = this.state ? this.arr_possible_src[2] : this.arr_possible_src[0];
			break;
			case 'hor_lr':
			this.src_curr = this.state ? this.arr_possible_src[4] : this.arr_possible_src[3];
			break;
			case 'hor_rl':
			this.src_curr = this.state ? this.arr_possible_src[5] : this.arr_possible_src[3];
			break;
			default:
			alert('No tap image found!');
		}
		return this.state;
	}
}
//Class of pipelines providing fluid movement. An instance of the class should include that part of the pipeline that can be managed as a separate object. For example, when the tap is opened, liquid begins to move in ALL of this part, and when it is closed, it stops in ALL of this part.
class Pipeline
{
	constructor(state,object)
	{
		this.state 			= state;		//может быть true(заполнен жидкостью),false(пуст) или undefined
		//массив id частей, из которых состоит трубопровод, например: 'tank_1_tube_1', 'tank_1_tube_2'
		this.arr_id			= Object.keys(object);
		//массив пар путей к файлам изображений, например: [['res/tube_1010.gif', 'res/tube_2010.gif'], ['res/tube_1100.gif', 'res/tube_2100.gif']]. Первое в паре - для отображения пустого, второе - для заполненного трубопровода.
		this.arr_src		= Object.values(object);
	}
	get_info()
	{
		console.log(`${this.state}\n${this.arr_id}\n${this.arr_src}`);
	}
}
//class of tanks with sensors, taps, pipelines.
class Batcher
{
	constructor(id,capacity_max,arr_possible_src,power,sensor_max_id,sensor_max_state,sensor_max_arr_possible_src,sensor_min_id,sensor_min_state,sensor_min_arr_possible_src,tap_id,tap_state,tap_type,tap_arr_possible_src,pipeline_state,pipeline)
	{
		this.id						= id;			//Identificator. Get from .html page.
		this.capacity_max			= capacity_max;	//Whole capacity of tank.
		this.capacity_curr;							//Carrent capacity of tank.
		this.arr_possible_src		= arr_possible_src;	//array of all path to files of images: ['res/batcher_1_0.gif','res/batcher_1_2.gif','res/batcher_1_8.gif']
		this.src_curr;				//current image of this tank, depends by this.capacity_curr
		this.info_panel				= document.getElementById('console_'+`${this.id}`); //html-object for display info about
		this.power					= power; //voltage presence flag. may be true or false
		this.sensor_max				= new Sensor(sensor_max_id,sensor_max_state,sensor_max_arr_possible_src);
		this.sensor_min				= new Sensor(sensor_min_id,sensor_min_state,sensor_min_arr_possible_src);
		//tank state: 0 - empty, 1 - at the level of the lower sensor, 2 - above the level of the lower sensor, 3 - at the level of the upper sensor
		this.state;
		this.tap_1		= new Tap(tap_id,tap_state,tap_type,tap_arr_possible_src);
		this.pipeline	= new Pipeline(pipeline_state,pipeline);
	}
	get_info()
	{
		console.log(`${n[0]}Info about instance of class Batcher:${n[0]}id${t[6]}=${t[0]}${this.id}${n[0]}capasity_max${t[3]}=${t[0]}${this.capacity_max}${n[0]}arr_possible_src${t[0]}=${t[0]}${this.arr_possible_src}${n[0]}power${t[0]}=${t[0]}${this.power}${n[0]}capasity_curr${t[3]}=${t[0]}${this.capacity_curr}${n[0]}info_panel${t[4]}=${t[0]}${this.info_panel}${n[0]}sensor_max_id${t[3]}=${t[0]}${this.sensor_max.id}${n[0]}sensor_max_state${t[2]}=${t[0]}${this.sensor_max.state}${n[0]}sensor_max_arr_possible_src${t[0]}=${t[0]}${this.sensor_max.arr_possible_src}${n[0]}sensor_min_id${t[3]}=${t[0]}${this.sensor_min.id}${n[0]}sensor_min_state${t[2]}=${t[0]}${this.sensor_min.state}${n[0]}sensor_min_arr_possible_src${t[0]}=${t[0]}${this.sensor_min.arr_possible_src}${n[0]}tap_1_id${t[4]}=${t[0]}${this.tap_1.id}${n[0]}tap_1.style${t[4]}=${t[0]}${this.tap_1.style}${n[0]}tap_1.type${t[4]}=${t[0]}${this.tap_1.type}${n[0]}tap_1.arr_possible_src${t[1]}=${t[3]}${this.tap_1.arr_possible_src}`);
		this.info_panel.innerHTML = `${br[0]}Info about instance of class Batcher:${br[0]}id${ht[45]}=${ht[3]}${this.id}${br[0]}capasity_max${ht[26]}=${ht[3]}${this.capacity_max}$br[0]}arr_possible_src${ht[0]}=${ht[0]}${this.arr_possible_src}power${ht[0]}=${ht[0]}${this.power}${br[0]}capasity${ht[35]}=${ht[3]}${this.capacity}${br[0]}sensor_max_id${ht[24]}=${ht[3]}${this.sensor_max.id}${br[0]}sensor_max_state${ht[20]}=${ht[3]}${this.sensor_max.state}${br[0]}sensor_max_arr_possible_src${ht[1]}=${ht[3]}${this.sensor_max.arr_possible_src}${br[0]}sensor_min_id${ht[25]}=${ht[3]}${this.sensor_min.id}${br[0]}sensor_min_state${ht[21]}=${ht[3]}${this.sensor_min.state}${br[0]}sensor_min_arr_possible_src${ht[2]}=${ht[3]}${this.sensor_min.arr_possible_src}${br[0]}tap_1_id${ht[35]}=${ht[3]}${this.tap_1.id}${br[0]}tap_1.style${ht[32]}=${ht[3]}${this.tap_1.style}${br[0]}tap_1.type${ht[32]}=${ht[3]}${this.tap_1.type}${br[0]}tap_1.arr_possible_src${ht[13]}=${ht[3]}${this.tap_1.arr_possible_src}`;
	}
//Установка состояния и изображения емкости в зависимости от состояния датчиков верхнего и нижнего уровней
	check_state()
	{
		//Если хотя бы один датчик == undefined, выдать сообщение "Проверить питающее напряжение на емкости, проверить датчики"
		if(this.sensor_min.state == undefined || this.sensor_max.state == undefined)
		{
			this.state 								= 0;
			this.src_curr 							= this.arr_possible_src[0];
			this.info_panel.innerHTML = `${this.id}: Check voltage! Check sensors!`;
		}
		//Если оба датчика == false, емкость пуста, следует добавить ингредиент
		if(this.sensor_min.state == false && this.sensor_max.state == false)
		{
			this.info_panel.innerHTML = `${this.id}: Add ingredient!`;
			this.state 								= 0;
			this.src_curr 							= this.arr_possible_src[0];
		}
		//Если датчик нижнего уровня == true, а верхнего == false, то емкость готова к работе
		if(this.sensor_min.state == true && this.sensor_max.state == false)
		{
			this.state 								= 1;
			this.src_curr 							= this.arr_possible_src[1];
			this.info_panel.innerHTML = `${this.id}: Ready!`;
		}
		//Если оба датчика == true, то емкость полна, следует прекратить ее загрузку.
		if(this.sensor_min.state == true && this.sensor_max.state == true)
		{
			this.state 								= 2;
			this.src_curr 							= this.arr_possible_src[2];
			this.info_panel.innerHTML = `${this.id}: Tank is full! Stop loading!`;
		}
		//Если датчик нижнего уровня == false, а верхнего == true, то содержимое зависло или датчики неисправны
		if(this.sensor_min.state == false && this.sensor_max.state == true)
		{
			this.state 								= 2;
			this.src_curr 							= this.arr_possible_src[2];
			this.info_panel.innerHTML = `${this.id}: Content stuck or sensors are defective!`;
		}
		return this.state;
	}
//проверка состояния крана и связанного с ним участка трубопровода данной емкости. Если кран tap_1 открыт(true) - то и участок трубопровода pipeline тоже(true), т.е. заполнен жидкостью
	check_state_tap_1()
	{
		//this.tap_1.state	= this.tap_1.check_state();
		if(this.tap_1.state == false)
		{
			this.pipeline.state = false;
		}
		else
		{
			this.pipeline.state = true;
		}
		return this.tap_1.state;
	}
//Наличие напряжения питания проверяется на отдельном выводе микроконтроллера. При его отсутствии ставим все датчики в неопределенное состояние, а кран в состояние false. При его наличии - ставим все в состояние false.
	check_power()
	{
		if(this.power == false)
		{
			this.sensor_min.set_state(undefined);
			this.sensor_max.set_state(undefined);
			this.tap_1.set_state(false);
		}
		else
		{
			this.sensor_min.set_state(false);
			this.sensor_max.set_state(false);
			this.tap_1.set_state(false);
		}
		return this.power;
	}
	power_off()
	{
		this.power = false;
		this.check_power();
		return this.power;
	}
	power_on()
	{
		this.power = true;
		this.check_power();
		return this.power;
	}
	embed_data_into_html()
	{
		document.getElementById(this.id).src 					= this.src_curr;	//вставляем картинку емкости
		document.getElementById(this.sensor_max.id).src 		= this.sensor_max.src_curr;
		document.getElementById(this.sensor_min.id).src 		= this.sensor_min.src_curr;
		document.getElementById(this.tap_1.id).src 				= this.tap_1.src_curr;
//Перебираем все имеющиеся  трубы в объекте pipeline и, если кран tap_1 открыт - выводим картинки заполненых труб, иначе пустых.
		for (let i = 0; i < this.pipeline.arr_id.length; i++)
		{
			document.getElementById(this.pipeline.arr_id[i]).src 	= this.pipeline.state ? this.pipeline.arr_src[i][1] : this.pipeline.arr_src[i][0];
		}
	}
}
//мешалка
class Stirrer
{
	constructor(stirrer_id,stirrer_state,arr_possible_src)
	{
		this.id		= stirrer_id;			//for examle: 'mixer_1_stirrer'(you need to take it from .html file)
		this.state	= stirrer_state;//may be "power on" - true, "power off" - false, if power missing - undefined
		this.arr_possible_src	= arr_possible_src;	//array of all path to files of images
		this.src_curr;				//current image, for example: 'res/img.gif', depends by this.state.
	}
	get_state()
	{
		return this.state;
	}
	set_on()
	{
		this.state 		= true;
		this.src_curr 	= this.arr_possible_src[1];
		return this.state;
	}
	set_off()
	{
		this.state 		= false;
		this.src_curr 	= this.arr_possible_src[0];
		return this.state;
	}
}
//тензодатчик
class Strain_gauge
{
	constructor(strain_gauge_id,strain_gauge_number_curr)
	{
		this.id		 				= strain_gauge_id;			//for examle: 'mixer_1_strain_gauge'(you need to take it from .html file)
		this.number_curr 			= strain_gauge_number_curr;
		this.info_panel				= document.getElementById('console_'+`${this.id}`); //html-object for display info about
	}
}
//Класс емкостей снабженных помимо датчиков уровня, кранов и трубопроводов, смешивающим устройством и тензодатчиком
class Mixer extends Batcher
{
	constructor(id,capacity_max,arr_possible_src,power,sensor_max_id,sensor_max_state,sensor_max_arr_possible_src,sensor_min_id,sensor_min_state,sensor_min_arr_possible_src,tap_id,tap_state,tap_type,tap_arr_possible_src,pipeline_state,pipeline,stirrer_id,stirrer_state,stirrer_arr_possible_src,strain_gauge_id,strain_gauge_number_curr)
	{
		super(id,capacity_max,arr_possible_src,power,sensor_max_id,sensor_max_state,sensor_max_arr_possible_src,sensor_min_id,sensor_min_state,sensor_min_arr_possible_src,tap_id,tap_state,tap_type,tap_arr_possible_src,pipeline_state,pipeline);
		this.stirrer		= new Stirrer(stirrer_id,stirrer_state,stirrer_arr_possible_src);
		this.strain_gauge	= new Strain_gauge(strain_gauge_id,strain_gauge_number_curr);
	}
//Наличие напряжения питания проверяется на отдельном выводе микроконтроллера
	check_power()
	{
		if(this.power == false)
		{
			this.sensor_min.set_state(undefined);
			this.sensor_max.set_state(undefined);
			this.tap_1.set_state(false);
			this.stirrer.set_off();
		}
		else
		{
			this.sensor_min.set_state(false);
			this.sensor_max.set_state(false);
			this.tap_1.set_state(false);
		}
		return this.power;
	}
	power_off()
	{
		this.power = false;
		this.check_power();
		return this.power;
	}
	power_on()
	{
		this.power = true;
		this.stirrer_off();
		this.check_power();
		return this.power;
	}
	stirrer_on()
	{
		this.stirrer.set_on();
		return this.stirrer.state;
	}
	stirrer_off()
	{
		this.stirrer.set_off();
		return this.stirrer.state;
	}

	get_strain_gauge_number_curr()
	{
		return this.strain_gauge_number_curr;
	}
	set_strain_gauge_number_curr(number)
	{
		this.strain_gauge_number_curr = number
		return this.strain_gauge_number_curr;
	}
	//Установка состояния и изображения емкости в зависимости от состояния датчиков верхнего и нижнего уровней
	check_state()
	{
		//Если хотя бы один датчик == undefined, выдать сообщение "Проверить питающее напряжение на емкости, проверить датчики"
		if(this.sensor_min.state == undefined || this.sensor_max.state == undefined)
		{
			this.state 								= 0;
			this.src_curr 							= this.arr_possible_src[0];
			this.info_panel.innerHTML 				= `${this.id}: Check voltage! Check sensors!`;
		}
		//Если оба датчика == false, емкость пуста, следует добавить ингредиент
		if(this.sensor_min.state == false && this.sensor_max.state == false)
		{
			this.info_panel.innerHTML 				= `${this.id}: Ready!`;
			this.state 								= 0;
			this.src_curr 							= this.arr_possible_src[0];
		}
		//Если датчик нижнего уровня == true, а верхнего == false, то емкость готова к работе
		if(this.sensor_min.state == true && this.sensor_max.state == false)
		{
			this.state 								= 1;
			this.src_curr 							= this.arr_possible_src[1];
			this.info_panel.innerHTML 				= `${this.id}: Ready!`;
		}
		//Если оба датчика == true, то емкость полна, следует прекратить ее загрузку.
		if(this.sensor_min.state == true && this.sensor_max.state == true)
		{
			this.state 								= 2;
			this.src_curr 							= this.arr_possible_src[2];
			this.info_panel.innerHTML 				= `${this.id}: Tank is full! Stop loading!`;
		}
		//Если датчик нижнего уровня == false, а верхнего == true, то содержимое зависло или датчики неисправны
		if(this.sensor_min.state == false && this.sensor_max.state == true)
		{
			this.state 								= 2;
			this.src_curr 							= this.arr_possible_src[2];
			this.info_panel.innerHTML 				= `${this.id}: Content stuck or sensors are defective!`;
		}
		return this.state;
	}
	embed_data_into_html()
	{
		document.getElementById(this.id).src 									= this.src_curr;
		document.getElementById(this.sensor_max.id).src 						= this.sensor_max.src_curr;
		document.getElementById(this.sensor_min.id).src 						= this.sensor_min.src_curr;
		document.getElementById(this.tap_1.id).src 								= this.tap_1.src_curr;
		document.getElementById(this.stirrer.id).src 							= this.stirrer.src_curr;
		document.getElementById(this.strain_gauge.id).innerHTML 				= this.strain_gauge.number_curr;
	}
}
/******************************************************************************************************************
*
*       								File of initialization. End.
*
******************************************************************************************************************/