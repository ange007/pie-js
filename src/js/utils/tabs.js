( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Tabs ) { console.warn( 'pie.utils.Tabs is already defined.' ); return; }

	//
	pie.utils.Tabs =
	class Tabs 
	{
		//
		constructor( editor ) 
		{
			this.editor = editor;
		}
		
		// Загрузка содержимого табов
		load( )
		{
			const context = this;

			// Запрашиваем параметры табов
			this.editor._getConfig( 'tabs', function( config ) 
			{
				// Вызов события загрузки вкладки в нужном модуле
				// @todo: Здесь нужно фильтровать вкладки в зависимости от настроек редактора
				let data = { };
				for( let tabID in config ) 
				{
					let tabName = tabID.charAt( 0 ).toUpperCase( ) + tabID.slice( 1 );

					//
					if( pie.tabs.hasOwnProperty( tabID ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabID ]( context.editor ); }
					else if( pie.tabs.hasOwnProperty( tabName ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabName ]( context.editor ); }

					//
					data[ tabID ] = context._callFunction( tabID, 'loadTab', [ config[ tabID ] ] ); 
				}

				// Считываем шаблон
				const sidebarTemplate = context.editor.utils.template.render( 'sidebar.tpl', { 'tabs': data } );

				//
				const $sidebar = context.editor.$elements.sidebar;

				// Выводим данные шаблона
				$sidebar.html( sidebarTemplate )
						.on( 'click', '#navigation a[pie-target-tab]', function( event ) 
				{
					var targetTab = $( this ).attr( 'pie-target-tab' );
					
					// Активация таба
					context._callFunction( targetTab, 'activateTab', [ ] );
				} );
			} );
		}

		// Вызов функции из "таба"
		_callFunction( tab, functionName, data )
		{	
			if( this.editor.tabs.hasOwnProperty( tab ) && this.editor.tabs[ tab ][ functionName ] !== undefined )
			{
				return this.editor.tabs[ tab ][ functionName ].apply( this.editor.tabs[ tab ], data );
			}
		}
	};

	// Базовый класс таба
	pie.utils.BasicTab =
	class BasicTab
	{
		constructor( editor )
		{
			this.className = this.constructor.name.charAt(0).toLowerCase( ) + this.constructor.name.slice( 1 );
			this.editor = editor;
			this.canvas = editor.canvas;
			this.tab = editor.$elements.tab;
			this.data = { };
		}
		
		// Загрузка таба
		loadTab( data )
		{			
			this.data = data;
			this.data[ 'id' ] = this.className;

			return data;
		}

		// Активация таба
		activateTab( )
		{
			// Формируем шаблон
			let templateHTML = this.editor.utils.template.render( 'tabs/' + this.className + '.tpl', this.data );

			// Применяем шаблон
			this.tab.html( templateHTML );
			
			// Обработка клика по функции
			this.setEvents( );
		}

		// Деактивация таба
		deactivateTab( )
		{
			this.tab.off( );
			// pie.utils.panels.hide( );
		}
		
		//
		setEvents( )
		{
			const context = this;

			//
			this.tab.off( )
					.on( 'click', 'a[pie-action]', function( event ){ context._onTabItemClick( this, event ); } );
		}
		
		// Выбор пункта действия
		_onTabItemClick( target, event )
		{
			const action = $( target ).attr( 'pie-action' ),
				args = $( target ).attr( 'pie-arguments' );

			// Вызываем функцию
			this._callFunction( action, [ ].concat( args ) );
		}

		// Вызов функции по названию
		_callFunction( functionName, data )
		{
			if( typeof this[ functionName ] === 'function' )
			{
				return this[ functionName ].apply( this, data );
			}
		}
	};
} )( window );