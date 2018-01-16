( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.panels ) { console.warn( 'pie.utils.panels is already defined.' );	return; }

	//
	pie.utils.panels = 
	{
		selector: '#panel',
		element: undefined,
		
		//
		setSelector: function( )
		{
			
		},
		
		// Показываем модальное окно
		show: function( editor, tpl, data )
		{
			console.log( 'show' );
			
			// Предварительно скрываем модалку
			this.hide( );
				
			// Считываем шаблон
			let context = this,
				template = editor.utils.template.render( 'panels/' + tpl + '.tpl', data );
			
			//
			this.element = $( this.selector );
			
			// Выводим данные шаблона
			return this.element.html( template )
								.show( )
								.on( 'click', '.panel-heading .close', function( ) { context.hide( ); } );
		},
		
		// Скрыть модальное окно
		hide: function( )
		{
			if( this.element === undefined )
			{
				return;
			}

			// Обрываем двухстороннюю связь
			$( this.element ).myData( 'destroy' );
			
			// Снимаем прослушку событий и скрываем
			this.element.off( )
						.hide( );
				
			// Удаляем ссылку на элемент
			delete this.element;
		}
	};

} )( window );