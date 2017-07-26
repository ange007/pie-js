( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.tabs ) { console.warn( 'pie.utils.tabs is already defined.' );	return; }

	// Навешивание на изменение элементов
	pie.utils.tabs = 
	{
		// Загрузка содержимого табов
		load: function( selector )
		{
			const context = this;
			
			// Запрашиваем параметры табов
			this.getConfig( 'tabs', function( data ) 
			{
				let $sidebar = $( selector || '#sidebar' );

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
							//
							$element.off( );
							
							// 
							context.callTabFunction( targetTab, 'deactivateTab', [ $element ] );
						}

						// Отображение/скрытие вкладок
						$element.toggle( $element.attr( 'id' ) === targetTab );
					} );
				} );
			} );
		},		
			
	};

} )( window );