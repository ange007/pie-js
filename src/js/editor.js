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
				
		// Встраиваем редактор
		this.insertEditor( );
		
		// Инициализация дополнительных библиотек после полноценного встраивания
		this.basics = new pie.tabs.Basics( this, this.canvas );
		this.text = new pie.tabs.Text( this, this.canvas );
		
		// Записываем редактор в список
		pie.list[ this.id ] = this;
	};
	
	// Функционал класса
	pie.Editor.prototype = 
	{
		// Встраивание редактора
		insertEditor: function( )
		{
			// 
			let $container = $( this.options.container || body ),
				selectors = this.options.selectors || { };
			
			// Работа с шаблоном по умолчанию
			if( this.options.container !== undefined )
			{
				// Считываем шаблон
				let template = pie.utils.template.render( this, 'main.tpl', { } );

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
			this.loadTabs( );

			// Загрузка списка слоёв
			this.loadLayers( );
			
			// Устанавливаем обработчики событий
			this.setEvents( );
		},
		
		// Вызов функции
		callTabFunction: function( tab, functionName, data )
		{
			if( this.hasOwnProperty( tab ) && this[ tab ][ functionName ] !== undefined )
			{
				return this[ tab ][ functionName ].apply( this[ tab ], data );
			}
		},
		
		// Загрузка содержимого табов
		loadTabs: function( )
		{
			const context = this;
			
			// Запрашиваем параметры табов
			this.getConfig( 'tabs', function( data ) 
			{
				let $sidebar = context.$elements.sidebar;

				// Вызов события загрузки вкладки в нужном модуле
				for( var i in data )
				{
					data[ i ] = context.callTabFunction( i, 'loadTab', [ data[ i ] ] );
				}

				// Считываем шаблон
				var html = pie.utils.template.render( context, 'sidebar.tpl', { 'tabs': data } );

				// Выводим данные шаблона
				$sidebar.html( html )
						.on( 'click', '#navigation a', function( event )
				{
					var targetTab = $( this ).data( 'target-tab' );

					// Перебираем навигацию
					$sidebar.find( '#navigation li' ).each( function( index, element )
					{
						var $element = $( element );

						// $element.toggleClass( $element.attr( 'id' ) === targetTab );
					} );

					// Перебираем табы
					$sidebar.find( '#tabs .tab' ).each( function( index, element )
					{
						var $element = $( element );

						// Вызов события загрузки вкладки в нужном модуле
						if( $element.attr( 'id' ) === targetTab )
						{
							context.callTabFunction( targetTab, 'activateTab', [ $element ] );
						}
						else
						{
							context.callTabFunction( targetTab, 'deactivateTab', [ $element ] );
						}

						// Отображение/скрытие вкладок
						$element.toggle( $element.attr( 'id' ) === targetTab );
					} );
				} );
			} );
		},		
				
		// Получение настроек
		getConfig: function( config, callback )
		{
			// Запрашиваем параметры табов
			$.ajax( { 
				url: './config/' + config + '.json', 
				dataType: 'json',
				success: function( data ) 
				{
					callback( data );
				}
			} );
		},
		
		// Установка событий
		setEvents: function( )
		{
			const context = this;
			
							// Добавление объекта
			this.canvas.on( { 'object:added': function( ) {	context.loadLayers( ); },
							// Удаления объекта
							'object:removed': function( ) { context.loadLayers( ); } } );
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
			let template = pie.utils.template.render( this, 'layers.tpl', { 'layers': this.layers } );

			// Выводим данные шаблона
			return this.$elements.layers.html( template );
		},
		
		// 
		getSelected: function( ) 
		{
			return this.canvas.getActiveObject( );
		},

		//
		getActiveStyle: function( styleName, object )
		{
			object = object || this.canvas.getActiveObject( );
			if( !object ) return '';

			return ( object.getSelectionStyles && object.isEditing )
					? ( object.getSelectionStyles( )[ styleName ] || '')
					: ( object[ styleName ] || '' );
		},

		//
		setActiveStyle: function( styleName, value, object )
		{
			object = object || this.canvas.getActiveObject( );
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
			var object = this.canvas.getActiveObject( );
			if( !object ) return '';

			return object[ name ] || '';
		},

		//
		setActiveProp: function( name, value ) 
		{
			var object = this.canvas.getActiveObject( );
			if( !object ) return;
			
			object.set( name, value )
					.setCoords( );
			
			this.canvas.renderAll( );
		}
	};
	
} )( window );