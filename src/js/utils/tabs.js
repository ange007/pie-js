( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Tabs ) { console.warn( 'pie.utils.tabs is already defined.' ); return; }

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
				for( var i in config ) { data[ i ] = context._callFunction( i, 'loadTab', [ config[ i ] ] ); }

				// Считываем шаблон
				const sidebarTemplate = context.editor.utils.template.render( 'sidebar.tpl', { 'tabs': data } );

				//
				const $sidebar = context.editor.$elements.sidebar;

				// Выводим данные шаблона
				$sidebar.html( sidebarTemplate )
						.on( 'click', '#navigation a[pie-target-tab]', function( event ) { context._onTabClick( this, event ); } );
				
				// Обработка клика по функции
				$sidebar.find( '#tabs' )
						.on( 'click', '.tab a[pie-action]', function( event ) { context._onTabItemClick( this, event ); } );
			} );
		}
		
		// Переключением табов
		_onTabClick( target, event )
		{
			const context = this,
				$sidebar = this.editor.$elements.sidebar;
			
			const targetTab = $( target ).attr( 'pie-target-tab' );

			// Перебираем навигацию
			$sidebar.find( '#navigation a[pie-target-tab]' ).each( function( index, element )
			{
				const $element = $( element );

				// $element.toggleClass( $element.attr( 'id' ) === targetTab );
			} );

			// Перебираем табы
			$sidebar.find( '#tabs .tab' ).each( function( index, element )
			{
				var $element = $( element );

				// Вызов события загрузки вкладки в нужном модуле
				if( $element.attr( 'pie-tab' ) === targetTab )
				{
					context._callFunction( targetTab, 'activateTab', [ $element ] );
				}
				else
				{
					//
					$element.off( );

					// Вызов функции деактивации вкладки
					context._callFunction( targetTab, 'deactivateTab', [ $element ] );
				}

				// Отображение/скрытие вкладок
				$element.toggle( $element.attr( 'pie-tab' ) === targetTab );
			} );
		}
		
		// Выбор пункта действия
		_onTabItemClick( target, event )
		{
			const targetTab = $( target ).parents( '.tab' ).attr( 'pie-tab' ),
				action = $( target ).attr( 'pie-action' ),
				args = $( target ).attr( 'pie-arguments' );

			// Вызываем функцию
			this._callFunction( targetTab, action, [ ].concat( args ) );
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
			this.editor = editor;
			this.canvas = editor.canvas;
			this.tab = undefined;
		}
		
		// Загрузка таба
		loadTab( data )
		{
			return data;
		}
		
		// Активация таба
		activateTab( $tab, data )
		{
			this.tab = $tab;

			return data;
		}

		//
		deactivateTab( )
		{
			pie.utils.panels.hide( );
		}
	};
} )( window );