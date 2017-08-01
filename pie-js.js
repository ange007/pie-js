'use strict';

/**
 * pie-js - 
 * @version v0.0.1
 * @link 
 * @license 
 * @author Borisenko Vladimir
 */

/* @todo: 
*
*/

(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Настройки по умолчанию
	pie.defaultOptions = {
		container: undefined, // Основной контейнер в котором будет располагаться редактор

		// Если не указан контейнер - используются селекторы (необходимо для кастомизации)
		selectors: {
			sidebar: '#sidebar',
			layers: '#layers',
			panel: '#panel',
			canvas: 'canvas'
		},

		//
		callbacks: {
			onLoad: function onLoad() {},
			onSave: function onSave() {},
			onError: function onError() {},
			onClose: function onClose() {}
		},

		blocks: ['layers', 'sidebar'],
		tabs: [],
		lang: 'ru'
	};

	// Список редакторов
	pie.list = [];

	// Список редакторов
	pie.getEditorList = function () {
		return this.list;
	};

	// Получить редактор по идентификатору
	pie.getEditor = function (id) {
		return this.list[id];
	};
})(window);

// http://jsfiddle.net/zmWs4/
// http://fabricjs.com/js/kitchensink/controller.js
// https://jsfiddle.net/drzaus/fa9jbu17/

(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Основной класс
	pie.Editor = function (options) {
		// Генерируем уникальный ключ
		this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

		// Считываем параметры
		this.options = $.extend(true, pie.defaultOptions, options);

		// Дополнительные переменные
		this.$elements = {};
		this.layers = [];

		// Инициализация дополнительных библиотек
		this.utils = {
			tabs: new pie.utils.Tabs(this),
			template: new pie.utils.Template(this)
		};

		// Встраиваем редактор
		this._insertEditor();

		// Инициализация библиотек вкладок (после полноценного встраивания)
		this.tabs = {
			basics: new pie.tabs.Basics(this),
			text: new pie.tabs.Text(this),
			stickers: new pie.tabs.Stickers(this)
		};

		// Записываем редактор в список
		pie.list[this.id] = this;
	};

	// Функционал класса
	pie.Editor.prototype = {
		utils: {},
		tabs: {},

		// Встраивание редактора
		_insertEditor: function _insertEditor() {
			// 
			var $container = $(this.options.container || body),
			    selectors = this.options.selectors || {};

			// Работа с шаблоном по умолчанию
			if (this.options.container !== undefined) {
				// Считываем шаблон
				var template = this.utils.template.render('main.tpl', {});

				// Выводим данные шаблона
				$container = $(template).appendTo(this.options.container);
			}

			//
			this.$elements = {
				sidebar: $container.find(this.options.container !== undefined ? '#sidebar' : selectors.sidebar),
				layers: $container.find(this.options.container !== undefined ? '#layers' : selectors.layers),
				panel: $container.find(this.options.container !== undefined ? '#panel' : selectors.panel),
				canvas: $container.find(this.options.container !== undefined ? 'canvas' : selectors.canvas)
			};

			// Создаём fabricJS
			this.canvas = new fabric.Canvas(this.$elements.canvas[0]);

			// Загрузка содержимого табов
			this.utils.tabs.load();

			// Загрузка списка слоёв
			this.loadLayers();

			// Устанавливаем обработчики событий
			this.setEvents();
		},

		// Получение настроек
		_getConfig: function _getConfig(config, callback) {
			// Запрашиваем параметры табов
			$.ajax({
				url: './config/' + config + '.json',
				dataType: 'json',
				success: function success(data) {
					callback(data);
				}
			});
		},

		// Установка событий
		setEvents: function setEvents() {
			var context = this;

			// События генерируемы fabricJS		
			this.canvas.on({
				// Добавление объекта
				'object:added': function objectAdded() {
					context.loadLayers();
				},
				// Удаления объекта
				'object:removed': function objectRemoved() {
					context.loadLayers();
				}
			});

			// События браузера
			// https://stackoverflow.com/questions/24733030/fabric-js-moving-image-with-keyboard
			document.onkeydown = function (event) {
				//
				var movementDelta = 5,
				    activeObject = context.canvas.getActiveGroup() || context.canvas.getActiveObject();

				//
				if (activeObject === undefined) {
					return false;
				}

				//
				switch (event.keyCode) {
					/* Up arrow */
					case 38:
						activeObject.top -= movementDelta;
						break;
					/* Down arrow  */
					case 40:
						activeObject.top += movementDelta;
						break;
					/* Left arrow  */
					case 37:
						activeObject.left -= movementDelta;
						break;
					/* Right arrow  */
					case 39:
						activeObject.left += movementDelta;
						break;
					/* Delete */
					case 46:
						activeObject.remove();
						break;
				}

				//
				if ([37, 38, 39, 40, 46].indexOf(event.keyCode) >= 0) {
					event.preventDefault();
					context.canvas.renderAll();
				}
			};
		},

		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		loadLayers: function loadLayers() {
			// Очищаем массив слоёв
			this.layers = [];

			// Считываем текущие объекты
			var objects = this.canvas.getObjects();

			// Формируем новый список слоёв
			for (var i in objects) {
				this.layers.push({ name: objects[i].cacheKey, object: objects[i] });
			}

			// Считываем шаблон
			var template = this.utils.template.render('layers.tpl', { 'layers': this.layers });

			// Выводим данные шаблона
			return this.$elements.layers.html(template);
		},

		// 
		getSelected: function getSelected() {
			return this.activeObject;
		},

		//
		getActiveStyle: function getActiveStyle(styleName, object) {
			object = object || this.activeObject;
			if (!object) return '';

			return object.getSelectionStyles && object.isEditing ? object.getSelectionStyles()[styleName] || '' : object[styleName] || '';
		},

		//
		setActiveStyle: function setActiveStyle(styleName, value, object) {
			object = object || this.activeObject;
			if (!object) return;

			if (object.setSelectionStyles && object.isEditing) {
				var style = {};

				style[styleName] = value;
				object.setSelectionStyles(style);
				object.setCoords();
			} else {
				object.set(styleName, value);
			}

			object.setCoords();
			this.canvas.renderAll();
		},

		//
		getActiveProp: function getActiveProp(name) {
			var object = this.activeObject;
			if (!object) return '';

			return object[name] || '';
		},

		//
		setActiveProp: function setActiveProp(name, value) {
			var object = this.activeObject;
			if (!object) return;

			object.set(name, value).setCoords();

			this.canvas.renderAll();
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.tabs) {
		pie.tabs = {};
	}
	if (pie.tabs.Basics) {
		console.warn('pie.tabs.basics is already defined.');return;
	}

	//
	pie.tabs.Basics = function (editor) {
		this.editor = editor;
		this.canvas = editor.canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Basics.prototype = {
		// Загрузка таба
		loadTab: function loadTab(data) {
			return data;
		},

		// Активация таба
		activateTab: function activateTab($tab, data) {
			this.tab = $tab;

			return data;
		},

		//
		deactivateTab: function deactivateTab() {},

		// Окно выбора цвета
		showBackgroundColor: function showBackgroundColor() {
			var context = this,
			    modal = pie.utils.panels.show(this.editor, 'basics', { title: 'Выбор цвета', type: 'color' });

			// Устанавливаем двухстороннюю связь
			pie.utils.binding.bind(this.canvas, modal, [this.canvas.renderAll.bind(this.canvas)], function (element, propName, value) {});
		},

		// Окно выбора изображения
		showBackgroundImage: function showBackgroundImage() {},

		// Изображение на фоне
		backgroundImage: function backgroundImage(image) {
			this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
				originX: 'left',
				originY: 'top'
			});
		},

		//
		showResize: function showResize() {
			var context = this,
			    modal = pie.utils.panels.show(this.editor, 'basics', { title: 'Resize', type: 'resize', width: this.canvas.getWidth(), height: this.canvas.getHeight() });

			// 
			pie.utils.binding.bind(context.canvas, modal, function () {});

			// Событие
			/*modal.on( 'change', 'input[type="number"][name="width"]', function( event ) { context.canvas.setWidth( event.target.value ); } );
   modal.on( 'change', 'input[type="number"][name="height"]', function( event ) { context.canvas.setHeight( event.target.value ); } );*/
		},

		// 
		showRound: function showRound() {},

		// Загругление углов фона
		rounded: function rounded() {},

		// Окно выбора изображения
		showAddImage: function showAddImage() {},

		// Добавление изображения
		addImage: function addImage(image) {
			var context = this;

			fabric.Image.fromURL(image, function (oImg) {
				context.canvas.add(oImg);
			});
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.tabs) {
		pie.tabs = {};
	}
	if (pie.tabs.Text) {
		console.warn('pie.tabs.text is already defined.');return;
	}

	//
	pie.tabs.Text = function (editor) {
		this.editor = editor;
		this.canvas = editor.canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Text.prototype = {
		// Загрузка таба
		loadTab: function loadTab(data) {
			return data;
		},

		// Активация таба
		activateTab: function activateTab($tab, data) {
			this.tab = $tab;

			// Загружаем в память список шрифтов
			this.loadFontList();

			// Навешиваем события
			this.tab.on('click', '#fonts li', function () {});

			//
			return data;
		},

		//
		deactivateTab: function deactivateTab() {},

		// Загрузка шрифтов
		loadFontList: function loadFontList() {
			var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var context = this;

			// Запрашиваем шрифты
			this.editor._getConfig('fonts', function (data) {
				var fontList = [],
				    fontCategories = {},
				    webFontList = [];

				for (var i in data) {
					// Пропуск ненужных блоков
					if (category !== '' && category !== 'all' && category !== i) {
						continue;
					}

					//
					var items = data[i].items;

					// Группы шрифтов
					fontCategories[i] = data[i].caption || i;

					// Шрифты
					for (var j in items) {
						fontList.push({ font: items[j].font,
							caption: items[j].caption,
							action: 'addText',
							arguments: items[j].caption });
					}

					// Записываем web шрифты
					for (var j in items) {
						if (items[j].font === '' && items[j].caption !== '') {
							webFontList.push(items[j].caption);
						}
					}
				}

				// Загрузка шрифтов
				if (webFontList.length > 0) {
					context.loadWebFont(webFontList);
				}

				// Формируем шаблон
				var fontsHTML = context.editor.utils.template.render('tabs/text.tpl', { 'categories': fontCategories, 'fonts': fontList });

				// Применяем шаблон
				context.tab.html(fontsHTML);
			});
		},

		// Использование Web шрифтов
		loadWebFont: function loadWebFont(fonts) {
			// Удаляем старые подключенные шрифты
			$('head').find('link[name="g-fonts"]').remove();

			// Добавляем новые
			$('head').append("<link href='http://fonts.googleapis.com/css?family=" + fonts.join('|') + "' rel='stylesheet' type='text/css' name='g-fonts'>");

			// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
			// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
		},

		//
		addText: function addText(fontFamily) {
			var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' + 'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

			// 
			var textSample = new fabric.Textbox(text, {
				fontSize: 20,
				left: Math.random(400),
				top: Math.random(400),
				fontFamily: fontFamily,
				angle: Math.random(10),
				fill: '#2196f3',
				fontWeight: '',
				originX: 'left',
				width: 300,
				hasRotatingPoint: true,
				centerTransform: true
			});

			// Добавляем текст
			this.canvas.add(textSample);
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.tabs) {
		pie.tabs = {};
	}
	if (pie.tabs.Stickers) {
		console.warn('pie.tabs.stickers is already defined.');return;
	}

	//
	pie.tabs.Stickers = function (editor) {
		this.editor = editor;
		this.canvas = editor.canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Stickers.prototype = {
		// Загрузка таба
		loadTab: function loadTab(data) {
			return data;
		},

		// Активация таба
		activateTab: function activateTab($tab, data) {
			this.tab = $tab;

			// Загружаем в память список шрифтов
			this._loadStickerList();

			// Навешиваем события
			this.tab.on('click', '#fonts li', function () {});

			//
			return data;
		},

		//
		deactivateTab: function deactivateTab() {},

		// Загрузка шрифтов
		_loadStickerList: function _loadStickerList() {
			var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var context = this;

			// Запрашиваем шрифты
			this.editor._getConfig('stickers', function (data) {
				var stickerList = [],
				    stickerCategories = {};

				for (var i in data) {
					// Пропуск ненужных блоков
					if (category !== '' && category !== 'all' && category !== i) {
						continue;
					}

					//
					var items = data[i].items;

					// Категории 
					stickerCategories[i] = data[i].caption || i;

					// 
					for (var j in items) {
						stickerList.push({ caption: items[j].caption,
							image: 'packs/stickers/' + i + '/' + items[j].image,
							action: 'addImage',
							arguments: './packs/stickers/' + i + '/' + items[j].image });
					}

					// stickerList = stickerList.concat( items );
				}

				// Формируем шаблон
				var stickersHTML = context.editor.utils.template.render('tabs/stickers.tpl', { 'categories': stickerCategories, 'stickers': stickerList });

				// Применяем шаблон
				context.tab.html(stickersHTML);
			});
		},

		// Добавление изображения
		addImage: function addImage(image) {
			var context = this;

			fabric.Image.fromURL(image, function (oImg) {
				context.canvas.add(oImg);
			});
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Template) {
		console.warn('pie.utils.template is already defined.');return;
	}

	//
	pie.utils.Template = function (editor) {
		this.editor = editor;
	};
	pie.utils.Template.prototype = {
		// Отрисовка шаблона
		render: function render(template, data) {
			return nunjucks.render(template, $.extend(data, { 'id': this.editor.id }));
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.panels) {
		console.warn('pie.utils.panels is already defined.');return;
	}

	//
	pie.utils.panels = {
		selector: '#panel',
		element: undefined,

		//
		setSelector: function setSelector() {},

		// Показываем модальное окно
		show: function show(editor, tpl, data) {
			// Предварительно скрываем модалку
			this.hide();

			// Считываем шаблон
			var context = this,
			    template = editor.utils.template.render('panels/' + tpl + '.tpl', data);

			//
			this.element = $(this.selector);

			// Выводим данные шаблона
			return this.element.html(template).show().on('click', '.panel-heading .close', function () {
				context.hide();
			});
		},

		// Скрыть модальное окно
		hide: function hide() {
			if (this.element === undefined) {
				return;
			}

			// Снимаем прослушку событий и скрываем
			this.element.off().hide();

			// Обрываем двухстороннюю связь
			pie.utils.binding.unbind(this.element);

			// Удаляем ссылку на элемент
			delete this.element;
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Tabs) {
		console.warn('pie.utils.tabs is already defined.');return;
	}

	//
	pie.utils.Tabs = function (editor) {
		this.editor = editor;
	};
	pie.utils.Tabs.prototype = {
		// Загрузка содержимого табов
		load: function load() {
			var context = this;

			// Запрашиваем параметры табов
			this.editor._getConfig('tabs', function (config) {
				// Вызов события загрузки вкладки в нужном модуле
				// @todo: Здесь нужно фильтровать вкладки в зависимости от настроек редактора
				var data = {};
				for (var i in config) {
					data[i] = context._callFunction(i, 'loadTab', [config[i]]);
				}

				// Считываем шаблон
				var sidebarTemplate = context.editor.utils.template.render('sidebar.tpl', { 'tabs': data });

				//
				var $sidebar = context.editor.$elements.sidebar;

				// Выводим данные шаблона
				$sidebar.html(sidebarTemplate).on('click', '#navigation a[pie-target-tab]', function (event) {
					context._onTabClick(this, event);
				});

				// Обработка клика по функции
				$sidebar.find('#tabs').on('click', '.tab a[pie-action]', function (event) {
					context._onTabItemClick(this, event);
				});
			});
		},

		// Переключением табов
		_onTabClick: function _onTabClick(target, event) {
			var context = this,
			    $sidebar = this.editor.$elements.sidebar;

			var targetTab = $(target).attr('pie-target-tab');

			// Перебираем навигацию
			$sidebar.find('#navigation a[pie-target-tab]').each(function (index, element) {
				var $element = $(element);

				// $element.toggleClass( $element.attr( 'id' ) === targetTab );
			});

			// Перебираем табы
			$sidebar.find('#tabs .tab').each(function (index, element) {
				var $element = $(element);

				// Вызов события загрузки вкладки в нужном модуле
				if ($element.attr('pie-tab') === targetTab) {
					context._callFunction(targetTab, 'activateTab', [$element]);
				} else {
					//
					$element.off();

					// Вызов функции деактивации вкладки
					context._callFunction(targetTab, 'deactivateTab', [$element]);
				}

				// Отображение/скрытие вкладок
				$element.toggle($element.attr('pie-tab') === targetTab);
			});
		},

		// Выбор пункта действия
		_onTabItemClick: function _onTabItemClick(target, event) {
			var targetTab = $(target).parents('.tab').attr('pie-tab'),
			    action = $(target).attr('pie-action'),
			    args = $(target).attr('pie-arguments');

			// Вызываем функцию
			this._callFunction(targetTab, action, [].concat(args));
		},

		// Вызов функции из "таба"
		_callFunction: function _callFunction(tab, functionName, data) {
			if (this.editor.tabs.hasOwnProperty(tab) && this.editor.tabs[tab][functionName] !== undefined) {
				return this.editor.tabs[tab][functionName].apply(this.editor.tabs[tab], data);
			}
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.binding) {
		console.warn('pie.utils.binding is already defined.');return;
	}

	// Навешивание на изменение элементов
	pie.utils.binding = {
		bindings: [],
		checkTimer: undefined,

		// 
		bind: function bind(object, element, callback) {
			var $element = $(element),
			    bindingElements = $element.find('[data-prop-bind]');

			// 
			this.unbind(element);

			// Реакция на смену состояния элемента
			this._getValuesEvent(object, bindingElements, callback);

			// Реакция на смену значений объекта
			this._setValuesEvent(object, bindingElements, callback);
		},

		// Реакция на смену значения у элемента
		_getValuesEvent: function _getValuesEvent(object, $elements, specialParams, callback) {
			var context = this;

			// Реакция на смену состояния элемента
			$elements.on('change', function (event) {
				var $el = $(event.target),
				    propName = $el.attr('data-prop-bind'),
				    value = $el.val();

				// Имя функции для установки значения
				var setFunctionName = 'set' + propName.charAt(0).toUpperCase() + propName.substr(1);

				// Проверка функции "set"
				if (typeof object[setFunctionName] === 'function') {
					object[setFunctionName].apply(object, [value].concat(specialParams));
				} else if (object.hasOwnProperty(propName)) {
					object[propName] = value;
				}

				// Заменяем значение в список
				for (var i in context.bindings) {
					var item = context.bindings[i];

					if (item.element !== event.target) {
						continue;
					}

					if (propName === item.property && value !== item.value) {
						item.value = value;
						break;
					}
				}

				//
				if (typeof callback === 'function') {
					callback($el, propName, value);
				}
			});
		},

		// Реакция на смену значения у объекта
		_setValuesEvent: function _setValuesEvent(object, $elements, callback) {
			var context = this;

			// Формируем список проверяемых параметров
			$elements.forEach(function (item) {
				var $el = $(item),
				    propName = $el.attr('data-prop-bind') || '';

				if (propName !== '') {
					context.bindings.push({ element: item, object: object, property: propName, value: '' });
				}
			});

			// Записываем текущие данные
			// this.bindings.push( { object: object, elements: elementList, callback: callback } );

			// Таймер проверки значений
			this.checkTimer = setInterval(function () {
				console.log('t');

				for (var i in context.bindings) {
					// Изменяемая ссылка на текущий элемент
					var item = context.bindings[i],
					    element = item.element,
					    _object = item.object,
					    propName = item.property,
					    oldValue = item.value,
					    value = '';

					// Имя функции для установки значения
					var getFunctionName = 'get' + propName.charAt(0).toUpperCase() + propName.substr(1);

					// Проверка функции "set"
					if (typeof _object[getFunctionName] === 'function') {
						value = _object[getFunctionName]();
					} else if (_object.hasOwnProperty(propName)) {
						value = _object[propName];
					}

					// Меняем значение элемента
					if (value !== oldValue) {
						item.value = value;
						$(element).val(value);
					}
				}
			}, 500);
		},

		// Снятия проверки событий
		unbind: function unbind(element) {
			var context = this,
			    $element = $(element),
			    bindingsElement = $element.find('[data-prop-bind]').length > 0 ? $element.find('[data-prop-bind]') : $element;

			// Отключение проверки событий
			bindingsElement.off('change');

			//
			$element.forEach(function (el) {
				for (var i in context.bindings) {
					if (context.bindings[i].element === el) {
						debugger;
					}
				}
			});

			// Таймер проверки значений
			clearInterval(this.checkTimer);
		}
	};
})(window);