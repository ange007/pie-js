( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Layers ) { console.warn( 'pie.utils.Layers is already defined.' ); return; }

	//
	pie.utils.Layers = 
	class Layers 
	{
		constructor( editor )
		{
			//
			this.editor = editor;
			
			// Список слоёв
			this.list = [ ];
		}
		
		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		load( )
		{
			//
			const context = this;
			
			// Считываем текущие объекты
			let objects = this.editor.canvas.getObjects( );
			
			//
			this.list = [ ];
			
			// Формируем новый список слоёв
			for( let i in objects )
			{
				let object = objects[ i ];
					object.set( 'id', i );
				
				this.list.push( { id: this.list.length, name: ( i + 1 ) + ': ' + objects[ i ].get( 'type' ), type: objects[ i ].get( 'type' ), object: objects[ i ] } );
			}

			// Считываем шаблон
			let template = this.editor.utils.template.render( 'layers.tpl', { 'layers': this.list } );
			
			// Выводим данные шаблона
			return this.editor.$elements.layers.off( )
												.html( template )
												.on( 'click', '.layer, button', function( event ) { context._onLayerClick( this, event ); event.stopPropagation( ); } );
		}
		
		// Обработчик клика
		_onLayerClick( target, event )
		{
			const $element = $( target );
			
			// Нажатие на кнопку
			if( $element.is( 'button' ) )
			{
				const id = $element.closest( '[data-layer-id]' ).data( 'layer-id' );
				let obj = this.editor.canvas.item( id );

				if( $element.is( '[data-action="remove"]' ) ) { this.remove( $element, obj ); }
				else if( $element.is( '[data-action="visible"]' ) ) { this.hide( $element, obj ); }
				else if( $element.is( '[data-action="lock"]' ) ) { this.lock( $element, obj ); }
			}
			else
			{
				const id = $element.data( 'layer-id' );
				let obj = this.editor.canvas.item( id );

				this.select( $element, obj );
			}
		}
		
		// Выделение объета
		select( target, obj )
		{
			let lock = !obj.hasControls,
				show = obj.get( 'opacity' );
			
			if( lock || !show )
			{
				return;
			}
			
			this.editor.canvas.deactivateAll( );
			this.editor.canvas.setActiveObject( obj );
		}
		
		// Удаление слоя
		remove( target, obj )
		{
			// Удаляем объект
			this.editor.canvas.remove( obj );
			
			// Обновление списка слоёв
			this.load( ); 
		}
		
		// Скрытие/отображение слоя
		hide( target, obj )
		{
			// Проверяем видимость
			let show = obj.get( 'opacity' );
			
			// Устанавливаем параметры
			obj.set( {
				opacity: ( show === 1 ? 0 : 1 ),
				selectable: ( show !== 1 ),
			} );
			
			//
			this.editor.canvas.deactivateAll( );

			// Обновляем канву
			this.editor.canvas.renderAll( );
			
			// Обновляем иконку
			target.toggleClass( 'btn-primary', show )
					.find( '.glyphicon' ).removeClass( 'glyphicon-eye-open glyphicon-eye-close' )
										.addClass( ( show === 1 ? 'glyphicon-eye-close' : 'glyphicon-eye-open' ) );
		}
		
		// Блокировка/разблокировка слоя
		lock( target, obj )
		{
			// Проверяем блокировку
			let lock = !obj.hasControls;
			
			// Устанавливаем параметры
			obj.hasControls = lock;
			obj.hasRotatingPoint = lock;
			obj.hasBorders = lock;
			obj.hasStateChanged = lock;
			obj.lockMovementX = !lock;
			obj.lockMovementY = !lock;
			
			// Обновляем канву
			this.editor.canvas.renderAll( );
			
			// Обновляем иконку
			target.toggleClass( 'btn-primary', !lock )
					.find( '.glyphicon' ).removeClass( 'glyphicon-lock glyphicon-lock' )
										.addClass( ( lock ? 'glyphicon-lock' : 'glyphicon-lock' ) );
		}
	};
	
} )( window );