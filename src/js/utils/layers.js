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
				
				this.list.push( { id: this.list.length, 
									name: ( i + 1 ) + ': ' + object.get( 'type' ), 
									hide: object.get( 'opacity' ) === 0,
									lock: !object.hasControls,
									type: object.get( 'type' ), 
									object: object } );
			}

			// Template render
			let template = this.editor.utils.template.render( 'layers.tpl', { 'layers': this.list } );
			
			// Apply template
			this.editor.$elements.layers.html( template )
										.myData( { data: this, event: this, exlusive: true } )
										.find( '.list-group' ).sortable( { } );

			return this;
		}
		
		// Click handler
		action( target, id, action, event )
		{
			const $element = $( target );
			const obj = this.editor.canvas.item( id );
			
			//
			if( action[0] === 'remove' ) { this.remove( $element, obj ); }
			else if( action[0] === 'visible' ) { this.hide( $element, obj ); }
			else if( action[0] === 'lock' ) { this.lock( $element, obj ); }
			else if( action[0] === 'select' ) { this.select( $element, obj ); }

			return false;
		}
		
		// Object selection
		select( $element, obj )
		{
			let lock = !obj.hasControls,
				show = obj.get( 'opacity' );
			
			if( lock || !show )
			{
				return this;
			}
			
			this.editor.canvas.discardActiveObject( )
								.setActiveObject( obj )
								.renderAll( );

			return this;
		}
		
		// Remove object
		remove( $button, obj )
		{
			// Delete the object
			this.editor.canvas.remove( obj );
			
			// Update Layer List
			this.load( ); 

			return this;
		}
		
		// Hide/show object
		hide( $button, obj )
		{
			// Check visibility
			let show = obj.get( 'opacity' );
			
			// Set parameters
			obj.set( {
				opacity: ( show === 1 ? 0 : 1 ),
				selectable: ( show !== 1 ),
			} );
			
			// Deactivate All objects
			this.editor.canvas.discardActiveObject( )
								.renderAll( );
			
			// Update icon
			$button.toggleClass( 'btn-primary', show )
					.find( '.glyphicon' ).removeClass( 'glyphicon-eye-open glyphicon-eye-close' )
										.addClass( ( show === 1 ? 'glyphicon-eye-close' : 'glyphicon-eye-open' ) );

			return this;
		}
		
		// Lock/unlock layer
		lock( $button, obj )
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
			$button.toggleClass( 'btn-primary', !lock )
					.find( '.glyphicon' ).removeClass( 'glyphicon-lock glyphicon-lock' )
										.addClass( ( lock ? 'glyphicon-lock' : 'glyphicon-lock' ) );

			return this;
		}
	};
	
} )( window );