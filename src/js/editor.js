// http://jsfiddle.net/zmWs4/
// http://fabricjs.com/js/kitchensink/controller.js
// https://jsfiddle.net/drzaus/fa9jbu17/

( function( global )
{
	'use strict';
	let pie = global.pie = global.pie || { };
	
	// Основной класс
	pie.Editor = function( options ) 
	{
		// Генерируем уникальный ключ
		this.id = Math.random( ).toString( 36 ).replace( /[^a-z]+/g, '' ).substr( 0, 5 );
		
		// Считываем параметры
		this.options = $.extend( true, pie.defaultOptions, options );

		// Дополнительные переменные
		this.$elements = { };
		this.layers = [ ];
		
		// Инициализация дополнительных библиотек
		this.utils = {
			tabs: new pie.utils.Tabs( this ),
			template: new pie.utils.Template( this )
		};
		
		// Встраиваем редактор
		this._insertEditor( );
		
		// Инициализация библиотек вкладок (после полноценного встраивания)
		this.tabs = {
			basics: new pie.tabs.Basics( this ),
			text: new pie.tabs.Text( this ),
			stickers: new pie.tabs.Stickers( this )
		};
		
		// Записываем редактор в список
		pie.list[ this.id ] = this;
	};
	
	// Функционал класса
	pie.Editor.prototype = 
	{
		utils: { },
		tabs: { },
		
		// Встраивание редактора
		_insertEditor: function( )
		{
			// 
			let $container = $( this.options.container || body ),
				selectors = this.options.selectors || { };
			
			// Работа с шаблоном по умолчанию
			if( this.options.container !== undefined )
			{
				// Считываем шаблон
				let template = this.utils.template.render( 'main.tpl', { } );

				// Выводим данные шаблона
				$container = $( template ).appendTo( this.options.container );
			}
			
			//
			this.$elements = {
				sidebar: $container.find( this.options.container !== undefined ? '#sidebar' : selectors.sidebar ),
				layers: $container.find( this.options.container !== undefined ? '#layers' : selectors.layers ),
				panel: $container.find( this.options.container !== undefined ? '#panel' : selectors.panel ),
				canvas: $container.find( this.options.container !== undefined ? 'canvas' : selectors.canvas )
			};
			
			// Создаём fabricJS
			this.canvas = new fabric.Canvas( this.$elements.canvas[ 0 ] );
			
			// Загрузка содержимого табов
			this.utils.tabs.load( );

			// Загрузка списка слоёв
			this.loadLayers( );
			
			// Устанавливаем обработчики событий
			this.setEvents( );
		},
						
		// Получение настроек
		_getConfig: function( config, callback )
		{
			// Запрашиваем параметры табов
			$.ajax( { 
				url: './config/' + config + '.json', 
				dataType: 'json',
				success: function( data ) { callback( data ); }
			} );
		},
		
		// Установка событий
		setEvents: function( )
		{
			const context = this;
			
			// События генерируемы fabricJS		
			this.canvas.on( 
			{ 
				// Добавление объекта
				'object:added': function( ) {	context.loadLayers( ); },
				// Удаления объекта
				'object:removed': function( ) { context.loadLayers( ); } 
			} );
					
			// События браузера
			// https://stackoverflow.com/questions/24733030/fabric-js-moving-image-with-keyboard
			document.onkeydown = function( event ) 
			{
				//
				const movementDelta = 5,
					activeObject = context.canvas.getActiveGroup( ) || context.canvas.getActiveObject( );
				
				//
				if( activeObject === undefined )
				{
					return false;
				}
				
				//
				switch( event.keyCode ) 
				{
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
						activeObject.remove( );
						break;
				}
				
				//
				if( [ 37, 38, 39, 40, 46 ].indexOf( event.keyCode ) >= 0 )
				{
					event.preventDefault( );	
					context.canvas.renderAll( );
				}
			};
		},
		
		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		loadLayers: function( )
		{
			// Очищаем массив слоёв
			this.layers = [ ];
			
			// Считываем текущие объекты
			let objects = this.canvas.getObjects( );
			
			// Формируем новый список слоёв
			for( var i in objects )
			{
				this.layers.push( { name: objects[ i ].cacheKey, object: objects[ i ] } );
			}
					
			// Считываем шаблон
			let template = this.utils.template.render( 'layers.tpl', { 'layers': this.layers } );

			// Выводим данные шаблона
			return this.$elements.layers.html( template );
		},
		
		// 
		getSelected: function( ) 
		{
			return this.activeObject;
		},

		//
		getActiveStyle: function( styleName, object )
		{
			object = object || this.activeObject;
			if( !object ) return '';

			return ( object.getSelectionStyles && object.isEditing )
					? ( object.getSelectionStyles( )[ styleName ] || '')
					: ( object[ styleName ] || '' );
		},

		//
		setActiveStyle: function( styleName, value, object )
		{
			object = object || this.activeObject;
			if( !object ) return;

			if( object.setSelectionStyles && object.isEditing ) 
			{
				var style = { };
				
				style[ styleName ] = value;
				object.setSelectionStyles( style );
				object.setCoords( );
			} 
			else 
			{
				object.set( styleName, value );
			}

			object.setCoords( );
			this.canvas.renderAll( );
		},

		//
		getActiveProp: function( name ) 
		{
			var object = this.activeObject;
			if( !object ) return '';

			return object[ name ] || '';
		},

		//
		setActiveProp: function( name, value ) 
		{
			var object = this.activeObject;
			if( !object ) return;
			
			object.set( name, value )
					.setCoords( );
			
			this.canvas.renderAll( );
		}
	};
	
} )( window );