( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Layers ) { console.warn( 'pie.utils.layers is already defined.' ); return; }

	//
	pie.utils.Layers = function( editor ) { this.editor = editor; };
	pie.utils.Layers.prototype = 
	{
		// Список слоёв
		list: [],
		
		// Список объектов на канве
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		load: function( )
		{
			//
			const context = this;
			
			// Считываем текущие объекты
			let objects = this.editor.canvas.getObjects( );
			
			// Формируем новый список слоёв
			for( var i in objects )
			{
				this.list.push( { id: this.list.length, name: objects[ i ].cacheKey, object: objects[ i ] } );
			}

			// Считываем шаблон
			let template = this.editor.utils.template.render( 'layers.tpl', { 'layers': this.list } );
			
			// Выводим данные шаблона
			return this.editor.$elements.layers.html( template )
										.on( 'click', '.btn-group button', function( event ) { context._onLayerClick( this, event ); } );
		},
		
		//
		_onLayerClick: function( target, event )
		{
			const $element = $( target );
			
			// Нажатие на кнопку
			if( $element.is( 'button' ) )
			{
				const id = $element.closest( '[data-layer-id]' ).data( 'layer-id' ),
					obj = this.editor.canvas.item( id );

				if( $element.is( '[data-action="remove"]' ) ) { this.remove( obj ); }
				else if( $element.is( '[data-action="visible"]' ) ) { this.hide( obj ); }
				else if( $element.is( '[data-action="lock"]' ) ) { this.lock( obj ); }
			}
		},
		
		//
		select: function( obj )
		{
			/*
			var obj = canvas.item(id);
			canvas.setActiveObject(obj);
			 */
		},
		
		//
		remove: function( obj )
		{
			// debugger;
			obj.remove( );
		},
		
		//
		hide: function( obj )
		{
			
		},
		
		//
		lock: function( obj )
		{
			
		}
	};
	
} )( window );