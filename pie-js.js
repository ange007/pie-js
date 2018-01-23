'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * pie-js - 
 * @version v0.0.1
 * @link 
 * @license MIT
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

	// Получить редактор по индексу
	pie.getEditorFromIndex = function (index) {
		// return this.list[ index ];
	};
})(window);

// http://jsfiddle.net/zmWs4/
// http://fabricjs.com/js/kitchensink/controller.js
// https://jsfiddle.net/drzaus/fa9jbu17/

(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Основной класс
	pie.Editor = function () {
		function Editor(options) {
			_classCallCheck(this, Editor);

			// Генерируем уникальный ключ
			this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

			// Считываем параметры
			this.options = $.extend(true, pie.defaultOptions, options);

			// Дополнительные переменные
			this.$elements = {};
			this.layers = [];
			this.tabs = {};

			// Инициализация дополнительных библиотек
			this.utils = {
				tabs: new pie.utils.Tabs(this),
				template: new pie.utils.Template(this),
				layers: new pie.utils.Layers(this),
				toolbar: new pie.utils.Toolbar(this)
			};

			// Встраиваем редактор
			this._insertEditor();

			// Записываем редактор в список
			pie.list[this.id] = this;
		}

		// Встраивание редактора


		_createClass(Editor, [{
			key: '_insertEditor',
			value: function _insertEditor() {
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
					toolbar: $container.find(this.options.container !== undefined ? '#toolbar' : selectors.toolbar),
					layers: $container.find(this.options.container !== undefined ? '#layers' : selectors.layers),
					panel: $container.find(this.options.container !== undefined ? '#panel' : selectors.panel),
					tab: $container.find(this.options.container !== undefined ? '#tab' : selectors.tab),
					canvas: $container.find(this.options.container !== undefined ? 'canvas' : selectors.canvas)
				};

				// Создаём fabricJS
				this.canvas = new fabric.Canvas(this.$elements.canvas[0]);

				// Загрузка содержимого табов
				this.utils.tabs.load();

				// Загрузка содержимого тулбара
				this.utils.toolbar.load();

				// Загрузка списка слоёв
				this.loadLayers();

				// Устанавливаем обработчики событий
				this.setEvents();
			}

			// Получение настроек

		}, {
			key: '_getConfig',
			value: function _getConfig(config, callback) {
				// Запрашиваем параметры табов
				$.ajax({
					url: './config/' + config + '.json',
					dataType: 'json',
					success: function success(data) {
						callback(data);
					}
				});
			}

			//

		}, {
			key: '_saveToFile',
			value: function _saveToFile(fileName, content) {
				var link = document.createElement('a');
				link.href = content;
				link.download = fileName;
				link.click();
			}

			// Установка событий

		}, {
			key: 'setEvents',
			value: function setEvents() {
				var context = this;

				// События генерируемы fabricJS
				// Позиционирование по центру https://stackoverflow.com/questions/43024617/snap-shape-to-center-with-fabricjs
				// 
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
						return;
					}

					//
					switch (event.keyCode) {
						// Up arrow
						case 38:
							activeObject.top -= movementDelta;
							break;
						// Down arrow	
						case 40:
							activeObject.top += movementDelta;
							break;
						// Left arrow	
						case 37:
							activeObject.left -= movementDelta;
							break;
						// Right arrow
						case 39:
							activeObject.left += movementDelta;
							break;
						// Delete
						case 46:
							context.utils.layers.remove(null, activeObject);
							break;
					}

					//
					if ([37, 38, 39, 40].indexOf(event.keyCode) >= 0) {
						event.preventDefault();
						context.canvas.renderAll();
					}
				};
			}

			// Список объектов на канве
			// http://jsfiddle.net/rodrigopandini/BGgDg/5/

		}, {
			key: 'loadLayers',
			value: function loadLayers() {
				return this.utils.layers.load();
			}

			// Сохранение изображения

		}, {
			key: 'save',
			value: function save(format) {
				if (!fabric.Canvas.supports('toDataURL')) {
					alert('This browser doesn\'t provide means to serialize canvas to an image');
				} else {
					var _format = _format || 'png';

					// Убираем выделения и обновляем канву
					this.canvas.deactivateAll().renderAll();

					// Сохранение в SVG
					if (_format === 'svg') {
						var SVGString = this.canvas.toSVG();

						this._saveToFile(this.id + '.' + _format, 'data:text/plain;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(SVGString))));
					} else {
						var imageString = canvas.toDataURL({ format: _format, quality: 0.8 });

						this._saveToFile(this.id + '.' + _format, imageString);
					}
				}
			}

			// Экспорт

		}, {
			key: 'exportToJSON',
			value: function exportToJSON() {
				var jsonData = JSON.stringify(this.canvas.toDatalessJSON());

				// Сохраняем файл
				this._saveToFile(this.id + '.json', 'data:text/plain;charset=utf-8;base64,' + btoa(jsonData));
			}

			// Импорт

		}, {
			key: 'importFromJSON',
			value: function importFromJSON(json) {
				var context = this;

				fabric.loadSVGFromString(json, function (objects, options) {
					var obj = fabric.util.groupSVGElements(objects, options);

					// Добавляем объект
					context.canvas.add(obj).centerObject(obj);

					// Устанавливаем координаты
					obj.setCoords();

					// Расчитыываем и отрисовываем
					context.canvas.calcOffset();
					context.canvas.renderAll();
				});
			}

			// 

		}, {
			key: 'getSelected',
			value: function getSelected() {
				return this.activeObject;
			}

			//

		}, {
			key: 'getActiveStyle',
			value: function getActiveStyle(styleName, object) {
				object = object || this.activeObject;
				if (!object) return '';

				return object.getSelectionStyles && object.isEditing ? object.getSelectionStyles()[styleName] || '' : object[styleName] || '';
			}

			//

		}, {
			key: 'setActiveStyle',
			value: function setActiveStyle(styleName, value, object) {
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
			}

			//

		}, {
			key: 'getActiveProp',
			value: function getActiveProp(name) {
				var object = this.activeObject;
				if (!object) return '';

				return object[name] || '';
			}

			//

		}, {
			key: 'setActiveProp',
			value: function setActiveProp(name, value) {
				var object = this.activeObject;
				if (!object) return;

				object.set(name, value).setCoords();

				this.canvas.renderAll();
			}
		}]);

		return Editor;
	}();
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Template) {
		console.warn('pie.utils.Template is already defined.');return;
	}

	//
	pie.utils.Template = function () {
		function Template(editor) {
			_classCallCheck(this, Template);

			this.editor = editor;
		}

		// Отрисовка шаблона


		_createClass(Template, [{
			key: 'render',
			value: function render(template, data) {
				return nunjucks.render(template, $.extend(data, { 'editorID': this.editor.id }));
			}
		}]);

		return Template;
	}();
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Toolbar) {
		console.warn('pie.utils.Toolbar is already defined.');return;
	}

	//
	pie.utils.Toolbar = function () {
		//
		function Toolbar(editor) {
			_classCallCheck(this, Toolbar);

			this.editor = editor;
		}

		//


		_createClass(Toolbar, [{
			key: 'load',
			value: function load() {
				// Считываем шаблон
				var context = this,
				    template = this.editor.utils.template.render('toolbar.tpl', {});

				// Устанавливаем шаблон и двухстороннюю связь
				this.editor.$elements.toolbar.html(template).myData(this.editor.canvas, function (type, element, propName, value) {
					if (type === 'set') {
						context.editor.canvas.renderAll.bind(context.editor.canvas)();
					}
				});
			}

			// Изображение на фоне

		}, {
			key: 'backgroundImage',
			value: function backgroundImage(image) {
				this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
					originX: 'left',
					originY: 'top'
				});
			}

			// Загругление углов фона

		}, {
			key: 'rounded',
			value: function rounded() {}

			// Добавление изображения

		}, {
			key: 'addImage',
			value: function addImage(image) {
				var context = this;

				fabric.Image.fromURL(image, function (oImg) {
					context.canvas.add(oImg);
				});
			}

			//

		}, {
			key: 'save',
			value: function save(format) {
				this.editor.save(format);
			}

			//

		}, {
			key: 'exportToJSON',
			value: function exportToJSON() {
				this.editor.exportToJSON();
			}
		}, {
			key: 'importFromJSON',
			value: function importFromJSON(json) {
				this.editor.importFromJSON(json);
			}
		}]);

		return Toolbar;
	}();
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
			console.log('show');

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

			// Обрываем двухстороннюю связь
			$(this.element).myData('destroy');

			// Снимаем прослушку событий и скрываем
			this.element.off().hide();

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
		console.warn('pie.utils.Tabs is already defined.');return;
	}

	//
	pie.utils.Tabs = function () {
		//
		function Tabs(editor) {
			_classCallCheck(this, Tabs);

			this.editor = editor;
		}

		// Загрузка содержимого табов


		_createClass(Tabs, [{
			key: 'load',
			value: function load() {
				var context = this;

				// Запрашиваем параметры табов
				this.editor._getConfig('tabs', function (config) {
					// Вызов события загрузки вкладки в нужном модуле
					// @todo: Здесь нужно фильтровать вкладки в зависимости от настроек редактора
					var data = {};
					for (var tabID in config) {
						var tabName = tabID.charAt(0).toUpperCase() + tabID.slice(1);

						//
						if (pie.tabs.hasOwnProperty(tabID)) {
							context.editor.tabs[tabID] = new pie.tabs[tabID](context.editor);
						} else if (pie.tabs.hasOwnProperty(tabName)) {
							context.editor.tabs[tabID] = new pie.tabs[tabName](context.editor);
						}

						//
						data[tabID] = context._callFunction(tabID, 'loadTab', [config[tabID]]);
					}

					// Считываем шаблон
					var sidebarTemplate = context.editor.utils.template.render('sidebar.tpl', { 'tabs': data });

					//
					var $sidebar = context.editor.$elements.sidebar;

					// Выводим данные шаблона
					$sidebar.html(sidebarTemplate).on('click', '#navigation a[pie-target-tab]', function (event) {
						var targetTab = $(this).attr('pie-target-tab');

						// Активация таба
						context._callFunction(targetTab, 'activateTab', []);
					});
				});
			}

			// Вызов функции из "таба"

		}, {
			key: '_callFunction',
			value: function _callFunction(tab, functionName, data) {
				if (this.editor.tabs.hasOwnProperty(tab) && this.editor.tabs[tab][functionName] !== undefined) {
					return this.editor.tabs[tab][functionName].apply(this.editor.tabs[tab], data);
				}
			}
		}]);

		return Tabs;
	}();

	// Базовый класс таба
	pie.utils.BasicTab = function () {
		function BasicTab(editor) {
			_classCallCheck(this, BasicTab);

			this.className = this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1);
			this.editor = editor;
			this.canvas = editor.canvas;
			this.tab = editor.$elements.tab;
			this.data = {};
		}

		// Загрузка таба


		_createClass(BasicTab, [{
			key: 'loadTab',
			value: function loadTab(data) {
				this.data = data;
				this.data['id'] = this.className;

				return data;
			}

			// Активация таба

		}, {
			key: 'activateTab',
			value: function activateTab() {
				// Формируем шаблон
				var templateHTML = this.editor.utils.template.render('tabs/' + this.className + '.tpl', this.data);

				// Применяем шаблон
				this.tab.html(templateHTML);

				// Обработка клика по функции
				this.setEvents();
			}

			// Деактивация таба

		}, {
			key: 'deactivateTab',
			value: function deactivateTab() {
				this.tab.off();
				// pie.utils.panels.hide( );
			}

			//

		}, {
			key: 'setEvents',
			value: function setEvents() {
				var context = this;

				//
				this.tab.off().on('click', 'a[pie-action]', function (event) {
					context._onTabItemClick(this, event);
				});
			}

			// Выбор пункта действия

		}, {
			key: '_onTabItemClick',
			value: function _onTabItemClick(target, event) {
				var action = $(target).attr('pie-action'),
				    args = $(target).attr('pie-arguments');

				// Вызываем функцию
				this._callFunction(action, [].concat(args));
			}

			// Вызов функции по названию

		}, {
			key: '_callFunction',
			value: function _callFunction(functionName, data) {
				if (typeof this[functionName] === 'function') {
					return this[functionName].apply(this, data);
				}
			}
		}]);

		return BasicTab;
	}();
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	//
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Layers) {
		console.warn('pie.utils.Layers is already defined.');return;
	}

	//
	pie.utils.Layers = function () {
		function Layers(editor) {
			_classCallCheck(this, Layers);

			//
			this.editor = editor;

			// Список слоёв
			this.list = [];
		}

		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/


		_createClass(Layers, [{
			key: 'load',
			value: function load() {
				//
				var context = this;

				// Считываем текущие объекты
				var objects = this.editor.canvas.getObjects();

				//
				this.list = [];

				// Формируем новый список слоёв
				for (var i in objects) {
					var object = objects[i];
					object.set('id', i);

					this.list.push({ id: this.list.length, name: i + 1 + ': ' + objects[i].get('type'), type: objects[i].get('type'), object: objects[i] });
				}

				// Считываем шаблон
				var template = this.editor.utils.template.render('layers.tpl', { 'layers': this.list });

				// Выводим данные шаблона
				return this.editor.$elements.layers.off().html(template).on('click', '.layer, button', function (event) {
					context._onLayerClick(this, event);event.stopPropagation();
				});
			}

			// Обработчик клика

		}, {
			key: '_onLayerClick',
			value: function _onLayerClick(target, event) {
				var $element = $(target);

				// Нажатие на кнопку
				if ($element.is('button')) {
					var id = $element.closest('[data-layer-id]').data('layer-id');
					var obj = this.editor.canvas.item(id);

					if ($element.is('[data-action="remove"]')) {
						this.remove($element, obj);
					} else if ($element.is('[data-action="visible"]')) {
						this.hide($element, obj);
					} else if ($element.is('[data-action="lock"]')) {
						this.lock($element, obj);
					}
				} else {
					var _id = $element.data('layer-id');
					var _obj = this.editor.canvas.item(_id);

					this.select($element, _obj);
				}
			}

			// Выделение объета

		}, {
			key: 'select',
			value: function select(target, obj) {
				var lock = !obj.hasControls,
				    show = obj.get('opacity');

				if (lock || !show) {
					return;
				}

				this.editor.canvas.deactivateAll();
				this.editor.canvas.setActiveObject(obj);
			}

			// Удаление слоя

		}, {
			key: 'remove',
			value: function remove(target, obj) {
				// Удаляем объект
				this.editor.canvas.remove(obj);

				// Обновление списка слоёв
				this.load();
			}

			// Скрытие/отображение слоя

		}, {
			key: 'hide',
			value: function hide(target, obj) {
				// Проверяем видимость
				var show = obj.get('opacity');

				// Устанавливаем параметры
				obj.set({
					opacity: show === 1 ? 0 : 1,
					selectable: show !== 1
				});

				//
				this.editor.canvas.deactivateAll();

				// Обновляем канву
				this.editor.canvas.renderAll();

				// Обновляем иконку
				target.toggleClass('btn-primary', show).find('.glyphicon').removeClass('glyphicon-eye-open glyphicon-eye-close').addClass(show === 1 ? 'glyphicon-eye-close' : 'glyphicon-eye-open');
			}

			// Блокировка/разблокировка слоя

		}, {
			key: 'lock',
			value: function lock(target, obj) {
				// Проверяем блокировку
				var lock = !obj.hasControls;

				// Устанавливаем параметры
				obj.hasControls = lock;
				obj.hasRotatingPoint = lock;
				obj.hasBorders = lock;
				obj.hasStateChanged = lock;
				obj.lockMovementX = !lock;
				obj.lockMovementY = !lock;

				// Обновляем канву
				this.editor.canvas.renderAll();

				// Обновляем иконку
				target.toggleClass('btn-primary', !lock).find('.glyphicon').removeClass('glyphicon-lock glyphicon-lock').addClass(lock ? 'glyphicon-lock' : 'glyphicon-lock');
			}
		}]);

		return Layers;
	}();
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
	pie.tabs.Text = function (_pie$utils$BasicTab) {
		_inherits(Text, _pie$utils$BasicTab);

		function Text() {
			_classCallCheck(this, Text);

			return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
		}

		_createClass(Text, [{
			key: 'activateTab',

			// Активация таба
			value: function activateTab($tab, data) {
				// Вызов родителя
				_get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'activateTab', this).call(this, $tab, data);

				// Загружаем в память список шрифтов
				this.loadFontList();

				// Навешиваем события
				this.tab.on('click', '#fonts li', function () {});

				//
				return data;
			}

			// Загрузка шрифтов

		}, {
			key: 'loadFontList',
			value: function loadFontList() {
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
							fontList.push({ font: items[j].file,
								caption: items[j].caption,
								action: 'addText',
								arguments: items[j].caption });
						}

						// Записываем web шрифты
						for (var j in items) {
							if (items[j].file === '' && items[j].caption !== '') {
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
			}

			// Использование Web шрифтов

		}, {
			key: 'loadWebFont',
			value: function loadWebFont(fonts) {
				// Удаляем старые подключенные шрифты
				$('head').find('link[name="g-fonts"]').remove();

				// Добавляем новые
				$('head').append("<link href='http://fonts.googleapis.com/css?family=" + fonts.join('|') + "' rel='stylesheet' type='text/css' name='g-fonts'>");

				// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
				// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
			}

			//

		}, {
			key: 'addText',
			value: function addText(fontFamily) {
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
		}]);

		return Text;
	}(pie.utils.BasicTab);
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
	pie.tabs.Stickers = function (_pie$utils$BasicTab2) {
		_inherits(Stickers, _pie$utils$BasicTab2);

		function Stickers() {
			_classCallCheck(this, Stickers);

			return _possibleConstructorReturn(this, (Stickers.__proto__ || Object.getPrototypeOf(Stickers)).apply(this, arguments));
		}

		_createClass(Stickers, [{
			key: 'activateTab',

			// Активация таба
			value: function activateTab($tab, data) {
				// Вызов родителя
				_get(Stickers.prototype.__proto__ || Object.getPrototypeOf(Stickers.prototype), 'activateTab', this).call(this, $tab, data);

				// Загружаем в память список шрифтов
				this._loadStickerList();

				// Навешиваем события
				this.tab.on('click', '#fonts li', function () {});

				//
				return data;
			}

			// Загрузка шрифтов

		}, {
			key: '_loadStickerList',
			value: function _loadStickerList() {
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
								image: 'packs/stickers/' + i + '/' + items[j].file,
								action: 'addImage',
								arguments: './packs/stickers/' + i + '/' + items[j].file });
						}

						// stickerList = stickerList.concat( items );
					}

					// Формируем шаблон
					var stickersHTML = context.editor.utils.template.render('tabs/stickers.tpl', { 'categories': stickerCategories, 'stickers': stickerList });

					// Применяем шаблон
					context.tab.html(stickersHTML);
				});
			}

			// Добавление изображения

		}, {
			key: 'addImage',
			value: function addImage(image) {
				var context = this,
				    parts = image.split('/').pop().split('.'),
				    ext = parts.length > 1 ? parts.pop() : '';

				if (ext === 'svg') {
					fabric.loadSVGFromURL(image, function (objects, options) {
						var obj = fabric.util.groupSVGElements(objects, options);

						//
						context.canvas.add(obj).renderAll();
					});
				} else {
					fabric.Image.fromURL(image, function (oImg) {
						// 
						oImg.left = Math.floor(Math.random() * (context.canvas.getWidth() - oImg.width) + 1);
						oImg.top = Math.floor(Math.random() * (context.canvas.getHeight() - oImg.height) + 1);

						//
						context.canvas.add(oImg).renderAll();
					});
				}
			}
		}]);

		return Stickers;
	}(pie.utils.BasicTab);
})(window);