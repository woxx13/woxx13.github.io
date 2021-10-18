'use strict;'

/**
*
*  	Объявление функций.  А также переменных, использующихся для формирования интерфейса приложения
*	
*/

//localStorage.clear();
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
	localStorage.setItem('recipe', recipe_id.match(/\d+/));
}
//Извлечь из базы выбраный рецепт. Если не выбран ни один, отключить кнопку "run".
function get_recipe()
{
	if (get('recipe') !== null)
	{
		return get('recipe');
	}
	else
	{
		set('btn_run_background', '#fff');
	}
}
//Аналог isset() из PHP
function isset(value)
{
	if(typeof(get(value)) != "undefined" && get(value) !== null)
		return true;
	else
		return false;
}
//ассоциативный массив элементов управления, реализующий мультиязычность приложения. Какждая переменная - массив из трех значений: [0] - для языка по-умолчанию(в данном случае - русский), [1] - английский, [2] - украинский. Имена переменных соответствуют id элемента в html. Должен быть объявлен  перед массивом data, т.к. там используются данные  из этого массива
let controls = {
	
			'on': 
			
				[
					'вкл',
					'on',
					'ввімк'
				],
			
			'run': 
			
				[
					'старт',
					'start',
					'старт'
				],
			
			'off': 
			
				[
					'выкл',
					'off',
					'вимк'
				],
			
			'load_1': 
			
				[
					'загр 1',
					'load 1',
					'зав 1'
				],
			
			'load_2': 
			
				[
					'загр 2',
					'load 2',
					'зав 2'
				],
			
			'sanit': 
			
				[
					'санит',
					'sanit',
					'саніт'
				],
	
};

//ассоциативный массив, реализующий мультиязычность приложения. Какждая переменная - массив из трех значений: [0] - для языка по-умолчанию(в данном случае - русский), [1] - английский, [2] - украинский. Имена переменных соответствуют id элемента в html.
let data = {
	
	'text_begin': //Привественный alert в начале
	
		[
			'Представьте, что Вам нужно смешать два ингредиента - основу и присадку. Причем, основы берется всегда 100 массовых частей, а присадки  от 1 до 10 массовых частей (1%-10%), в зависимости от выбранного рецепта. Данное приложение эмулирует работу такой системы. Для начала работы воспользуйтесь меню (кликните на значок слева-вверху)',
		
			'Imagine that you need to mix two ingredients - base and additive. Moreover, the base is always taken in 100 parts by weight, and the additives are from 1 to 10 parts by weight (1% -10%), depending on the selected recipe. This application emulates the operation of such a system. To get started, use the menu (push on icon at the top left)',
		
			'Уявіть, що Вам потрібно змішати два інгредієнти - основу і присадку. Причому, основи береться завжди 100 масових частин, а присадки від 1 до 10 масових частин (1% -10%), в залежності від обраного рецепта. Цей додаток емулює роботу такої системи. Для початку роботи скористайтеся меню (натисніть на іконку зліва-вгорі)'
		],
	
	'menu':
	
		[	
			'*****************\n\tменю\n_________________',
			'*****************\n\tmenu\n_________________',
			'*****************\n\tменю\n_________________'
		],
				
	'how_use': 
	
		[	
			'Как пользоваться:',
			'How to use:',
			'Як користуватися:'
		],
	
	'how_use_1': 
	
		[	
			' - Включить систему("'+controls.on[get('language')]+'")',
			' - Turn on the system("'+controls.on[get('language')]+'")',
			' - Увімкніть систему("'+controls.on[get('language')]+'")'
		],
	
	'how_use_2': 
	
		[	
			' - Загрузить присадку("'+controls.load_1[get('language')]+'")',
			' - Download Additive("'+controls.load_1[get('language')]+'")',
			' - Завантажте присадку("'+controls.load_1[get('language')]+'")'
		],
	
	'how_use_3': 
	
		[	
			' - Загрузить основу("'+controls.load_2[get('language')]+'")',
			' - Download base("'+controls.load_2[get('language')]+'")',
			' - Завантажте основу("'+controls.load_2[get('language')]+'")'
		],
	
	'how_use_4': 
	
		[
			' - Выбрать % присадки',
			' - Select % additive',
			' - Выберіть % присадки'
		],
	
	'how_use_5': 
	
		[	
			' - Запустить процесс("'+controls.run[get('language')]+'")',
			' - Start the process("'+controls.run[get('language')]+'")',
			' - Запустіть процесс("'+controls.run[get('language')]+'")'
		],
	
	'how_much_add': 
	
		[	
			'Сколько присадки?',
			'How much additive?',
			'Скільки присадки?'
		],
	
	'sanit_title': 
	
		[
			'*******************************************\n\t Режим санитарной обработки нужен\n\t для очистки всей системы проточной \n\t водой от остатков ингредиентов \n___________________________________________',
			'*******************************************\n\t The sanitization mode is needed\n\t to clean the entire system with running \n\t water from the remaining ingredients \n___________________________________________',
			'*******************************************\n\t Режим санітарної обробки потрібен\n\t для очищення всієї системи проточною \n\t водою від залишків інгредієнтів \n___________________________________________'
		],
	
	'niotech':
	
		[
			'***********************************\n\tВсе права защищены © 2021\n\tПишите: woxx13@gmail.com\n___________________________________',
			'********************************\n\tAll rights reserved © 2021\n\tWrite: woxx13@gmail.com\n________________________________',
			'***********************************\n\tВсі права захищені © 2021\n\tПишіть: woxx13@gmail.com\n___________________________________'
		],
	
	'system_is_de_energized':

		[
			'Система обесточена!',
			'System is de-energized!',
			'Cистема знеструмлена!'
		],
	
	'ready_for_work':

		[
			'Готов к работе!',
			'Ready for work!',
			'Готовий до роботи!'
		],
	
	'need_to_load':

		[
			'Сначала нужно загрузить ингредиенты во все дозаторы!',
			'First you need to load the ingredients into all the dispensers!',
			'Спочатку потрібно завантажити інгредієнти в усі дозатори!'
		],
	
	'add_an_ingredient':

		[
			'Добавьте ингредиент!',
			'Add an ingredient!',
			'Додайте інгредієнт!'
		],
	
	'dosing_in_progress':

		[
			'Идет дозирование!',
			'Dosing in progress!',
			'Йде дозування!'
		],
	
	'mixing_in_progress':

		[
			'Идет смешивание!',
			'Mixing in progress!',
			'Йде змішування!'
		],
	
	'mixing_is_over':

		[
			'Смешивание закончено!',
			'Mixing is over!',
			'Змішування закінчено!'
		],
	
	'unloading_in_progress':

		[
			'Идет выгрузка!',
			'Unloading in progress!',
			'Йде вивантаження!'
		],
	
	'upload_finished':

		[
			'Выгрузка окончена!',
			'Upload finished!',
			'Вивантаження закінчено!'
		],
	
	'need_to_select':

		[
			'Сначала нужно выбрать рецепт в меню слева!',
			'First you need to select a recipe from the menu on the left!',
			'Спочатку потрібно вибрати рецепт в меню зліва!'
		],
	
	'batcher_is_full':

		[
			'Дозатор заполнен!',
			'The batcher is full!',
			'Дозатор заповнений!'
		],
	
	'turn_on':

		[
			'Нужно сначала включить систему("'+controls.on[get('language')]+'")!',
			'You must first turn on the system("'+controls.on[get('language')]+'")!',
			'Потрібно спочатку ввімкнути систему("'+controls.on[get('language')]+'")!'
		],
	
	'sanitation':

		[
			'Санобработка!',
			'Sanitation!',
			'Санобробка!'
		],
		
};   