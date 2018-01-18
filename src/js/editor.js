// http://jsfiddle.net/zmWs4/
// http://fabricjs.com/js/kitchensink/controller.js
// https://jsfiddle.net/drzaus/fa9jbu17/

( function( global )
{
	'use strict';
	let pie = global.pie = global.pie || { };
	
	// Основной класс
	pie.Editor =
	class Editor 
	{
		constructor( options ) 
		{
			// Генерируем уникальный ключ
			this.id = Math.random( ).toString( 36 ).replace( /[^a-z]+/g, '' ).substr( 0, 5 );

			// Считываем параметры
			this.options = $.extend( true, pie.defaultOptions, options );

			// Дополнительные переменные
			this.$elements = { };
			this.layers = [ ];
			this.tabs = { };

			// Инициализация дополнительных библиотек
			this.utils = {
				tabs: new pie.utils.Tabs( this ),
				template: new pie.utils.Template( this ),
				layers: new pie.utils.Layers( this ),
				toolbar: new pie.utils.Toolbar( this )
			};

			// Встраиваем редактор
			this._insertEditor( );

			// Записываем редактор в список
			pie.list[ this.id ] = this;
		}

		// Встраивание редактора
		_insertEditor( )
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
				toolbar: $container.find( this.options.container !== undefined ? '#toolbar' : selectors.toolbar ),
				layers: $container.find( this.options.container !== undefined ? '#layers' : selectors.layers ),
				panel: $container.find( this.options.container !== undefined ? '#panel' : selectors.panel ),
				tab: $container.find( this.options.container !== undefined ? '#tab' : selectors.tab ),
				canvas: $container.find( this.options.container !== undefined ? 'canvas' : selectors.canvas )
			};
			
			// Создаём fabricJS
			this.canvas = new fabric.Canvas( this.$elements.canvas[ 0 ] );
			
			// Загрузка содержимого табов
			this.utils.tabs.load( );
			
			// Загрузка содержимого тулбара
			this.utils.toolbar.load( );

			// Загрузка списка слоёв
			this.loadLayers( );
			
			// Устанавливаем обработчики событий
			this.setEvents( );
		}
						
		// Получение настроек
		_getConfig( config, callback )
		{
			// Запрашиваем параметры табов
			$.ajax( { 
				url: './config/' + config + '.json', 
				dataType: 'json',
				success: function( data ) { callback( data ); }
			} );
		}
		
		//
		_saveToFile( fileName, content )
		{
			var link = document.createElement( 'a' );
				link.href = content;
				link.download = fileName;
				link.click( );
		}
		
		// Установка событий
		setEvents( )
		{
			const context = this;
			
			// События генерируемы fabricJS
			// Позиционирование по центру https://stackoverflow.com/questions/43024617/snap-shape-to-center-with-fabricjs
			// 
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
					return;
				}
				
				//
				switch( event.keyCode ) 
				{
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
						context.utils.layers.remove( null, activeObject );
						break;
				}
				
				//
				if( [ 37, 38, 39, 40 ].indexOf( event.keyCode ) >= 0 )
				{
					event.preventDefault( );	
					context.canvas.renderAll( );
				}
			};
		}
		
		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		loadLayers( )
		{
			return this.utils.layers.load( );
		}
		
		// Сохранение изображения
		save( format )
		{	
			if( !fabric.Canvas.supports( 'toDataURL' ) ) 
			{
				alert( 'This browser doesn\'t provide means to serialize canvas to an image' );
			}
			else 
			{
				let format = format || 'png';
								
				// Убираем выделения и обновляем канву
				this.canvas.deactivateAll( )
							.renderAll( );
				
				// Сохранение в SVG
				if( format === 'svg' )
				{
					let SVGString = this.canvas.toSVG( );
					
					this._saveToFile( this.id + '.' + format, 'data:text/plain;charset=utf-8;base64,' + btoa( unescape( encodeURIComponent( SVGString ) ) ) );
				}
				else
				{
					let imageString = canvas.toDataURL( { format: format, quality: 0.8 } );
					
					this._saveToFile( this.id + '.' + format, imageString );
				}
			}
		}
		
		// Экспорт
		exportToJSON( )
		{
			var jsonData = JSON.stringify( this.canvas.toDatalessJSON( ) ); 

			// Сохраняем файл
			this._saveToFile( this.id + '.json', 'data:text/plain;charset=utf-8;base64,' + btoa( jsonData ) );
		}

		// Импорт
		importFromJSON( json )
		{
			let context = this;
			
			fabric.loadSVGFromString( json , function( objects, options ) 
			{
				let obj = fabric.util.groupSVGElements( objects, options );
				
				// Добавляем объект
				context.canvas.add( obj )
								.centerObject( obj );
					
				// Устанавливаем координаты
				obj.setCoords( );
				
				// Расчитыываем и отрисовываем
				context.canvas.calcOffset( );
				context.canvas.renderAll( );
			} ); 
		}
		
		// 
		getSelected( ) 
		{
			return this.activeObject;
		}

		//
		getActiveStyle( styleName, object )
		{
			object = object || this.activeObject;
			if( !object ) return '';

			return ( object.getSelectionStyles && object.isEditing )
					? ( object.getSelectionStyles( )[ styleName ] || '')
					: ( object[ styleName ] || '' );
		}

		//
		setActiveStyle( styleName, value, object )
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
		}

		//
		getActiveProp( name ) 
		{
			var object = this.activeObject;
			if( !object ) return '';

			return object[ name ] || '';
		}

		//
		setActiveProp( name, value ) 
		{
			var object = this.activeObject;
			if( !object ) return;
			
			object.set( name, value )
					.setCoords( );
			
			this.canvas.renderAll( );
		}
	};	
} )( window );