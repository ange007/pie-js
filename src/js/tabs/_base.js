( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs._Tab ) { console.warn( 'pie.tabs.tab is already defined.' );	return; }

	//
	pie.tabs._Base = 
	class _Base 
	{
		//
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
		}
		
		//
		setEvents( )
		{
			const context = this;

			//
			this.tab.find( 'a[pie-action]' ).on( 'click', function( event ){ context._onTabItemClick( this, event ); } );
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