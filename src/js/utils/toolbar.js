( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Toolbar ) { console.warn( 'pie.utils.Toolbar is already defined.' );	return; }

	// Toolbar
	pie.utils.Toolbar = 
	class Toolbar
	{
		//
		constructor( editor )
		{
			this.editor = editor;
		}
		
		// Load Toolbar
		load( )
		{
			// Template render
			let context = this,
				template = this.editor.utils.template.render( 'toolbar.tpl', { } );

			// Set template and two-way communication
			this.editor.$elements.toolbar.html( template );

			// Menu
			this.editor.$elements.toolbar.find( '#menu' ).myData( this, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.editor.canvas.renderAll.bind( context.editor.canvas )( );
				}
			} );

			// Canvas
			this.editor.$elements.toolbar.find( '#control-panel' ).myData( this.editor.canvas, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.editor.canvas.renderAll.bind( context.editor.canvas )( );
				}
			} );
		}

		// BackgroundImage
		backgroundImage( image )
		{
			this.canvas.setBackgroundImage( image, this.canvas.renderAll.bind( this.canvas ), {
				originX: 'left',
				originY: 'top'
			} );
		}

		// Round
		rounded( )
		{

		}

		// Add image
		addImage( image )
		{
			var context = this;

			fabric.Image.fromURL( image, function( oImg ) 
			{
				context.canvas.add( oImg );
			} );	
		}
		
		//
		save( format )
		{
			this.editor.save( format );
		}

		//
		exportToJSON( )
		{
			alert( 'export' );
			this.editor.exportToJSON( );
		}
		
		//
		importFromJSON( json )
		{
			alert( 'import' );
			this.editor.importFromJSON( json );
		}
	};
} )( window );