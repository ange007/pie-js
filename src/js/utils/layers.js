( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Layers ) { console.warn( 'pie.utils.Layers is already defined.' ); return; }

	// Layers
	pie.utils.Layers = 
	class Layers 
	{
		constructor( editor )
		{
			//
			this.editor = editor;
			
			// List of layers
			this.list = [ ];
		}
		
		// List of objects on the canvas
		// http://jsfiddle.net/rodrigopandini/BGgDg/5/
		load( )
		{
			//
			const context = this;
			
			// Read the current objects
			let objects = this.editor.canvas.getObjects( );
			
			//
			this.list = [ ];
			
			// Form a new list of layers
			for( let i in objects )
			{
				let object = objects[ i ];
					object.set( 'id', i );
				
				this.list.push( { id: this.list.length, name: ( i + 1 ) + ': ' + objects[ i ].get( 'type' ), type: objects[ i ].get( 'type' ), object: objects[ i ] } );
			}

			// Template render
			let template = this.editor.utils.template.render( 'layers.tpl', { 'layers': this.list } );
			
			// Apply template
			return this.editor.$elements.layers.off( )
												.html( template )
												.on( 'click', '.layer, button', function( event ) { context._onLayerClick( this, event ); event.stopPropagation( ); } );
		}
		
		// Click handler
		_onLayerClick( target, event )
		{
			const $element = $( target );
			
			// Click on the button
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
		
		// Object selection
		select( target, obj )
		{
			let lock = !obj.hasControls,
				show = obj.get( 'opacity' );
			
			if( lock || !show )
			{
				return;
			}
			
			this.editor.canvas.discardActiveObject( );
			this.editor.canvas.setActiveObject( obj );
		}
		
		// Remove object
		remove( target, obj )
		{
			// Delete the object
			this.editor.canvas.remove( obj );
			
			// Update Layer List
			this.load( ); 
		}
		
		// Hide/show object
		hide( target, obj )
		{
			// Check visibility
			let show = obj.get( 'opacity' );
			
			// Set parameters
			obj.set( {
				opacity: ( show === 1 ? 0 : 1 ),
				selectable: ( show !== 1 ),
			} );
			
			// Deactivate All objects
			this.editor.canvas.discardActiveObject( );

			// Updated canvas
			this.editor.canvas.renderAll( );
			
			// Update icon
			target.toggleClass( 'btn-primary', show )
					.find( '.glyphicon' ).removeClass( 'glyphicon-eye-open glyphicon-eye-close' )
										.addClass( ( show === 1 ? 'glyphicon-eye-close' : 'glyphicon-eye-open' ) );
		}
		
		// Lock/unlock layer
		lock( target, obj )
		{
			// Checking the lock
			let lock = !obj.hasControls;
			
			// Set the parameters
			obj.hasControls = lock;
			obj.hasRotatingPoint = lock;
			obj.hasBorders = lock;
			obj.hasStateChanged = lock;
			obj.lockMovementX = !lock;
			obj.lockMovementY = !lock;
			
			// Updated canvas
			this.editor.canvas.renderAll( );
			
			// Update icon
			target.toggleClass( 'btn-primary', !lock )
					.find( '.glyphicon' ).removeClass( 'glyphicon-lock glyphicon-lock' )
										.addClass( ( lock ? 'glyphicon-lock' : 'glyphicon-lock' ) );
		}
	};
	
} )( window );