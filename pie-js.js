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

	// Default options
	pie.defaultOptions = {
		container: undefined, // The main container in which the editor will be located

		// If no container is specified - used selectors (needed from customizing).
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

	// Editor list
	pie.list = [];

	// Get editor list
	pie.getEditorList = function () {
		return this.list;
	};

	// Get editor by identifier
	pie.getEditor = function (id) {
		return this.list[id];
	};

	// Get the editor by index
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

	// Main class
	pie.Editor = function () {
		function Editor(options) {
			_classCallCheck(this, Editor);

			// Generate a unique key
			this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

			// Read the parameters
			this.options = $.extend(true, pie.defaultOptions, options);

			// Additional variables
			this.$elements = {};
			this.layers = [];
			this.tabs = {};

			// Initializing additional libraries
			this.utils = {
				tabs: new pie.utils.Tabs(this),
				template: new pie.utils.Template(this),
				layers: new pie.utils.Layers(this),
				toolbar: new pie.utils.Toolbar(this)
			};

			// Embed the editor
			this._insertEditor();

			// Write the editor to the list
			pie.list[this.id] = this;
		}

		// Embed Editor


		_createClass(Editor, [{
			key: '_insertEditor',
			value: function _insertEditor() {
				// 
				var $container = $(this.options.container || body),
				    selectors = this.options.selectors || {};

				// Working with the default template
				if (this.options.container !== undefined) {
					// Template render
					var template = this.utils.template.render('main.tpl', {});

					// Display the template data
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

				// Create fabricJS
				this.canvas = new fabric.Canvas(this.$elements.canvas[0]);

				// Loading the tabs content
				this.utils.tabs.load();

				// Loading the contents of the toolbar
				this.utils.toolbar.load();

				// Layer list loading
				this.loadLayers();

				// Set event handlers
				this.setEvents();
			}

			// Getting Settings

		}, {
			key: '_getConfig',
			value: function _getConfig(config, callback) {
				// Requesting tab options
				$.ajax({
					url: './config/' + config + '.json',
					dataType: 'json',
					success: function success(data) {
						callback(data);
					}
				});
			}

			// Save to File

		}, {
			key: '_saveToFile',
			value: function _saveToFile(fileName, content) {
				var link = document.createElement('a');
				link.href = content;
				link.download = fileName;
				link.click();
			}

			// Setting Events

		}, {
			key: 'setEvents',
			value: function setEvents() {
				var context = this;

				// Events generated by fabricJS
				// Positioning in the center https://stackoverflow.com/questions/43024617/snap-shape-to-center-with-fabricjs
				// 
				this.canvas.on({
					// Adding an object
					'object:added': function objectAdded() {
						context.loadLayers();
					},
					// Deleting an object
					'object:removed': function objectRemoved() {
						context.loadLayers();
					}
				});

				// Browser Events
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

			// List of objects on the canvas
			// http://jsfiddle.net/rodrigopandini/BGgDg/5/

		}, {
			key: 'loadLayers',
			value: function loadLayers() {
				return this.utils.layers.load();
			}

			// Image saving

		}, {
			key: 'save',
			value: function save(format) {
				if (!fabric.Canvas.supports('toDataURL')) {
					alert('This browser doesn\'t provide means to serialize canvas to an image');
				} else {
					var _format = _format || 'png';

					// Remove the selection and update the canvas
					this.canvas.deactivateAll().renderAll();

					// Save in SVG
					if (_format === 'svg') {
						var SVGString = this.canvas.toSVG();

						this._saveToFile(this.id + '.' + _format, 'data:text/plain;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(SVGString))));
					} else {
						var imageString = canvas.toDataURL({ format: _format, quality: 0.8 });

						this._saveToFile(this.id + '.' + _format, imageString);
					}
				}
			}

			// Export to JSON

		}, {
			key: 'exportToJSON',
			value: function exportToJSON() {
				var jsonData = JSON.stringify(this.canvas.toDatalessJSON());

				// Save the file
				this._saveToFile(this.id + '.json', 'data:text/plain;charset=utf-8;base64,' + btoa(jsonData));
			}

			// Import form JSON

		}, {
			key: 'importFromJSON',
			value: function importFromJSON(json) {
				var context = this;

				fabric.loadSVGFromString(json, function (objects, options) {
					var obj = fabric.util.groupSVGElements(objects, options);

					// Add object
					context.canvas.add(obj).centerObject(obj);

					// Set the coordinates
					obj.setCoords();

					// Calculate and draw
					context.canvas.calcOffset();
					context.canvas.renderAll();
				});
			}

			// Get selected object

		}, {
			key: 'getSelected',
			value: function getSelected() {
				return this.activeObject;
			}

			// Get active style from object

		}, {
			key: 'getActiveStyle',
			value: function getActiveStyle(styleName, object) {
				object = object || this.activeObject;
				if (!object) {
					return '';
				}

				return object.getSelectionStyles && object.isEditing ? object.getSelectionStyles()[styleName] || '' : object[styleName] || '';
			}

			// Set style to Active object

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

			// Get properties from active object

		}, {
			key: 'getActiveProp',
			value: function getActiveProp(name) {
				var object = this.activeObject;
				if (!object) {
					return '';
				};

				return object[name] || '';
			}

			// Set properties to active object

		}, {
			key: 'setActiveProp',
			value: function setActiveProp(name, value) {
				var object = this.activeObject;
				if (!object) {
					return;
				}

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

	// Init scope
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Template) {
		console.warn('pie.utils.Template is already defined.');return;
	}

	// Template
	pie.utils.Template = function () {
		function Template(editor) {
			_classCallCheck(this, Template);

			this.editor = editor;
		}

		// Template render


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

	// Init scope
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Toolbar) {
		console.warn('pie.utils.Toolbar is already defined.');return;
	}

	// Toolbar
	pie.utils.Toolbar = function () {
		//
		function Toolbar(editor) {
			_classCallCheck(this, Toolbar);

			this.editor = editor;
		}

		// Load Toolbar


		_createClass(Toolbar, [{
			key: 'load',
			value: function load() {
				// Template render
				var context = this,
				    template = this.editor.utils.template.render('toolbar.tpl', {});

				// Set template and two-way communication
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

	// Init scope
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.panels) {
		console.warn('pie.utils.panels is already defined.');return;
	}

	// Panels
	pie.utils.panels = {
		selector: '#panel',
		element: undefined,

		//
		setSelector: function setSelector() {},

		// Show modal window
		show: function show(editor, tpl, data) {
			console.log('show');

			// Prevent hide
			this.hide();

			// Render template
			var context = this,
			    template = editor.utils.template.render('panels/' + tpl + '.tpl', data);

			//
			this.element = $(this.selector);

			// Display the template data
			return this.element.html(template).show().on('click', '.panel-heading .close', function () {
				context.hide();
			});
		},

		// Hide modal window
		hide: function hide() {
			if (this.element === undefined) {
				return;
			}

			// Break off two-way communication
			$(this.element).myData('destroy');

			// Remove the listener of events and hide
			this.element.off().hide();

			// Remove the link to the item
			delete this.element;
		}
	};
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Init scope
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Tabs) {
		console.warn('pie.utils.Tabs is already defined.');return;
	}

	// Tabs
	pie.utils.Tabs = function () {
		//
		function Tabs(editor) {
			_classCallCheck(this, Tabs);

			this.editor = editor;
		}

		// Loading the contents of tabs


		_createClass(Tabs, [{
			key: 'load',
			value: function load() {
				var context = this;

				// Get tabs parameters
				this.editor._getConfig('tabs', function (config) {
					// Calling the load event of the tab in the required module
					// @todo: Here we need to filter tabs depending on the settings of the editor
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

					// Template render
					var sidebarTemplate = context.editor.utils.template.render('sidebar.tpl', { 'tabs': data });

					//
					var $sidebar = context.editor.$elements.sidebar;

					// Display the template data
					$sidebar.html(sidebarTemplate).on('click', '#navigation a[pie-target-tab]', function (event) {
						var targetTab = $(this).attr('pie-target-tab');

						// Tab activation
						context._callFunction(targetTab, 'activateTab', []);
					});
				});
			}

			// Calling a function from Tab

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

	// Base class of the tab
	pie.utils.BasicTab = function () {
		function BasicTab(editor) {
			_classCallCheck(this, BasicTab);

			this.className = this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1);
			this.editor = editor;
			this.canvas = editor.canvas;
			this.tab = editor.$elements.tab;
			this.data = {};
		}

		// Tab loading


		_createClass(BasicTab, [{
			key: 'loadTab',
			value: function loadTab(data) {
				this.data = data;
				this.data['id'] = this.className;

				return data;
			}

			// Tab activating

		}, {
			key: 'activateTab',
			value: function activateTab() {
				// Template render
				var templateHTML = this.editor.utils.template.render('tabs/' + this.className + '.tpl', this.data);

				// Apply template
				this.tab.html(templateHTML);

				// Set events
				this.setEvents();
			}

			// Tab deactivating

		}, {
			key: 'deactivateTab',
			value: function deactivateTab() {
				this.tab.off();
				// pie.utils.panels.hide( );
			}

			// Set events

		}, {
			key: 'setEvents',
			value: function setEvents() {
				var context = this;

				//
				this.tab.off().on('click', 'a[pie-action]', function (event) {
					context._onTabItemClick(this, event);
				});
			}

			// Select Action Point

		}, {
			key: '_onTabItemClick',
			value: function _onTabItemClick(target, event) {
				var action = $(target).attr('pie-action'),
				    args = $(target).attr('pie-arguments');

				// Call the function
				this._callFunction(action, [].concat(args));
			}

			// Calling a function by name

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

	// Init scope
	if (!pie.utils) {
		pie.utils = {};
	}
	if (pie.utils.Layers) {
		console.warn('pie.utils.Layers is already defined.');return;
	}

	// Layers
	pie.utils.Layers = function () {
		function Layers(editor) {
			_classCallCheck(this, Layers);

			//
			this.editor = editor;

			// List of layers
			this.list = [];
		}

		// List of objects on the canvas
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/


		_createClass(Layers, [{
			key: 'load',
			value: function load() {
				//
				var context = this;

				// Read the current objects
				var objects = this.editor.canvas.getObjects();

				//
				this.list = [];

				// Form a new list of layers
				for (var i in objects) {
					var object = objects[i];
					object.set('id', i);

					this.list.push({ id: this.list.length, name: i + 1 + ': ' + objects[i].get('type'), type: objects[i].get('type'), object: objects[i] });
				}

				// Template render
				var template = this.editor.utils.template.render('layers.tpl', { 'layers': this.list });

				// Apply template
				return this.editor.$elements.layers.off().html(template).on('click', '.layer, button', function (event) {
					context._onLayerClick(this, event);event.stopPropagation();
				});
			}

			// Click handler

		}, {
			key: '_onLayerClick',
			value: function _onLayerClick(target, event) {
				var $element = $(target);

				// Click on the button
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

			// Object selection

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

			// Remove object

		}, {
			key: 'remove',
			value: function remove(target, obj) {
				// Delete the object
				this.editor.canvas.remove(obj);

				// Update Layer List
				this.load();
			}

			// Hide/show object

		}, {
			key: 'hide',
			value: function hide(target, obj) {
				// Check visibility
				var show = obj.get('opacity');

				// Set parameters
				obj.set({
					opacity: show === 1 ? 0 : 1,
					selectable: show !== 1
				});

				// Deactivate All objects
				this.editor.canvas.deactivateAll();

				// Updated canvas
				this.editor.canvas.renderAll();

				// Update icon
				target.toggleClass('btn-primary', show).find('.glyphicon').removeClass('glyphicon-eye-open glyphicon-eye-close').addClass(show === 1 ? 'glyphicon-eye-close' : 'glyphicon-eye-open');
			}

			// Lock/unlock layer

		}, {
			key: 'lock',
			value: function lock(target, obj) {
				// Checking the lock
				var lock = !obj.hasControls;

				// Set the parameters
				obj.hasControls = lock;
				obj.hasRotatingPoint = lock;
				obj.hasBorders = lock;
				obj.hasStateChanged = lock;
				obj.lockMovementX = !lock;
				obj.lockMovementY = !lock;

				// Updated canvas
				this.editor.canvas.renderAll();

				// Update icon
				target.toggleClass('btn-primary', !lock).find('.glyphicon').removeClass('glyphicon-lock glyphicon-lock').addClass(lock ? 'glyphicon-lock' : 'glyphicon-lock');
			}
		}]);

		return Layers;
	}();
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Init scope
	if (!pie.tabs) {
		pie.tabs = {};
	}
	if (pie.tabs.Text) {
		console.warn('pie.tabs.text is already defined.');return;
	}

	// Text
	pie.tabs.Text = function (_pie$utils$BasicTab) {
		_inherits(Text, _pie$utils$BasicTab);

		function Text() {
			_classCallCheck(this, Text);

			return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
		}

		_createClass(Text, [{
			key: 'activateTab',

			// Activating the tab
			value: function activateTab($tab, data) {
				// Parent call
				_get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'activateTab', this).call(this, $tab, data);

				// Load into memory font list
				this.loadFontList();

				// Hanging events
				this.tab.on('click', '#fonts li', function () {});

				//
				return data;
			}

			// Downloading Fonts

		}, {
			key: 'loadFontList',
			value: function loadFontList() {
				var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

				var context = this;

				// Get fonts
				this.editor._getConfig('fonts', function (data) {
					var fontList = [],
					    fontCategories = {},
					    webFontList = [];

					for (var i in data) {
						// Skipping unnecessary blocks
						if (category !== '' && category !== 'all' && category !== i) {
							continue;
						}

						//
						var items = data[i].items;

						// Font Groups
						fontCategories[i] = data[i].caption || i;

						// Fonts
						for (var j in items) {
							fontList.push({ font: items[j].file,
								caption: items[j].caption,
								action: 'addText',
								arguments: items[j].caption });
						}

						// Write Web fonts
						for (var j in items) {
							if (items[j].file === '' && items[j].caption !== '') {
								webFontList.push(items[j].caption);
							}
						}
					}

					// Download Font
					if (webFontList.length > 0) {
						context.loadWebFont(webFontList);
					}

					// Template render
					var fontsHTML = context.editor.utils.template.render('tabs/text.tpl', { 'categories': fontCategories, 'fonts': fontList });

					// Apply template
					context.tab.html(fontsHTML);
				});
			}

			// Using Web Fonts

		}, {
			key: 'loadWebFont',
			value: function loadWebFont(fonts) {
				// Delete the old connected fonts
				$('head').find('link[name="g-fonts"]').remove();

				// Adding new
				$('head').append("<link href='http://fonts.googleapis.com/css?family=" + fonts.join('|') + "' rel='stylesheet' type='text/css' name='g-fonts'>");

				// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
				// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
			}

			// Text add

		}, {
			key: 'addText',
			value: function addText(fontFamily, text) {
				var defaultText = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' + 'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

				// 
				var textSample = new fabric.Textbox(text || defaultText, {
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

				// Adding text
				this.canvas.add(textSample);
			}
		}]);

		return Text;
	}(pie.utils.BasicTab);
})(window);
(function (global) {
	'use strict';

	var pie = global.pie = global.pie || {};

	// Init scope
	if (!pie.tabs) {
		pie.tabs = {};
	}
	if (pie.tabs.Stickers) {
		console.warn('pie.tabs.stickers is already defined.');return;
	}

	// Stickers
	pie.tabs.Stickers = function (_pie$utils$BasicTab2) {
		_inherits(Stickers, _pie$utils$BasicTab2);

		function Stickers() {
			_classCallCheck(this, Stickers);

			return _possibleConstructorReturn(this, (Stickers.__proto__ || Object.getPrototypeOf(Stickers)).apply(this, arguments));
		}

		_createClass(Stickers, [{
			key: 'activateTab',

			// Activating the tab
			value: function activateTab($tab, data) {
				// Parent call
				_get(Stickers.prototype.__proto__ || Object.getPrototypeOf(Stickers.prototype), 'activateTab', this).call(this, $tab, data);

				// Load the sticker list into memory
				this._loadStickerList();

				// Hanging events
				this.tab.on('click', '#fonts li', function () {});

				//
				return data;
			}

			// Download stickers

		}, {
			key: '_loadStickerList',
			value: function _loadStickerList() {
				var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

				var context = this;

				// Get stickers
				this.editor._getConfig('stickers', function (data) {
					var stickerList = [],
					    stickerCategories = {};

					for (var i in data) {
						// Skipping unnecessary blocks
						if (category !== '' && category !== 'all' && category !== i) {
							continue;
						}

						//
						var items = data[i].items;

						// Categories 
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

					// Template render
					var stickersHTML = context.editor.utils.template.render('tabs/stickers.tpl', { 'categories': stickerCategories, 'stickers': stickerList });

					// Apply template
					context.tab.html(stickersHTML);
				});
			}

			// Add image

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