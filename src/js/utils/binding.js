( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.binding ) { console.warn( 'pie.utils.binding is already defined.' );	return; }

	// Навешивание на изменение элементов
	pie.utils.binding = 
	{
		bindings: [ ],
		checkTimer: undefined,
		
		// 
		bind: function( object, element, callback )
		{
			let $element = $( element ),
				bindingElements = $element.find( '[data-prop-bind]' );
		
			// 
			this.unbind( element );
				
			// Реакция на смену состояния элемента
			this._getValuesEvent( object, bindingElements, callback );
			
			// Реакция на смену значений объекта
			this._setValuesEvent( object, bindingElements, callback );
		},
		
		// Реакция на смену значения у элемента
		_getValuesEvent: function( object, $elements, specialParams, callback )
		{
			let context = this;
			
			// Реакция на смену состояния элемента
			$elements.on( 'change', function( event )
			{
				let $el = $( event.target ),
					propName = $el.attr( 'data-prop-bind' ),
					value = $el.val( );
									
				// Имя функции для установки значения
				let setFunctionName = 'set' + propName.charAt( 0 ).toUpperCase( ) + propName.substr( 1 );

				// Проверка функции "set"
				if( typeof object[ setFunctionName ] === 'function' )
				{
					object[ setFunctionName ].apply( object,[ value ].concat( specialParams ) );
				}
				else if( object.hasOwnProperty( propName ) )
				{
					object[ propName ] = value;
				}

				// Заменяем значение в список
				for( let i in context.bindings )
				{
					let item = context.bindings[ i ];
					
					if( item.element !== event.target )	{ continue; }

					if( propName === item.property && value !== item.value )
					{
						item.value = value;
						break;
					}
				}
				
				//
				if( typeof callback === 'function' )
				{
					callback( $el, propName, value );
				}
			} );
		},
		
		// Реакция на смену значения у объекта
		_setValuesEvent: function( object, $elements, callback )
		{
			let context = this;
			
			// Формируем список проверяемых параметров
			$elements.forEach( function( item )
			{
				let $el = $( item ),
					propName = $el.attr( 'data-prop-bind' ) || '';
				
				if( propName !== '' ) 
				{	
					context.bindings.push( { element: item, object: object, property: propName, value: '' } );
				}
			} );

			// Записываем текущие данные
			// this.bindings.push( { object: object, elements: elementList, callback: callback } );
			
			// Таймер проверки значений
			this.checkTimer = setInterval( function( )
			{
				console.log( 't' );
				
				for( let i in context.bindings )
				{
					// Изменяемая ссылка на текущий элемент
					let item = context.bindings[ i ],
						element = item.element,
						object = item.object,
						propName = item.property,
						oldValue = item.value,
						value = '';

					// Имя функции для установки значения
					let getFunctionName = 'get' + propName.charAt( 0 ).toUpperCase( ) + propName.substr( 1 );

					// Проверка функции "set"
					if( typeof object[ getFunctionName ] === 'function' )
					{
						value = object[ getFunctionName ]( );
					}
					else if( object.hasOwnProperty( propName ) )
					{
						value = object[ propName ];
					}
					
					// Меняем значение элемента
					if( value !== oldValue )
					{
						item.value = value;
						$( element ).val( value );
					}
				}
			}, 500 );

		},
				
		// Снятия проверки событий
		unbind: function( element )
		{
			let context = this,
				$element = $( element ),
				bindingsElement = $element.find( '[data-prop-bind]' ).length > 0 ? $element.find( '[data-prop-bind]' ) : $element;
		
			// Отключение проверки событий
			bindingsElement.off( 'change' );
			
			//
			$element.forEach( function( el )
			{
				for( let i in context.bindings )
				{
					if( context.bindings[ i ].element === el  )
					{
						debugger;
					}
				}
			} );
			
			// Таймер проверки значений
			clearInterval( this.checkTimer );
		}
	};

} )( window );