( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Basics ) { console.warn( 'pie.tabs.basics is already defined.' );	return; }

	//
	pie.tabs.Basics =
	class Basics extends pie.utils.BasicTab
	{
		// Background color selection Window
		showBackgroundColor( )
		{
			var	context = this,
				panel = pie.utils.panels.show( this.editor, 'basics', { title: 'Выбор цвета', type: 'color' } );

			// Establish two-way communication
			$( panel ).myData( this.canvas, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.canvas.renderAll.bind( context.canvas )( );
				}
			} );
		}

		// Background image selection window
		showBackgroundImage( )
		{

		}

		// Image on background
		backgroundImage( image )
		{
			this.canvas.setBackgroundImage( image, this.canvas.renderAll.bind( this.canvas ), {
				originX: 'left',
				originY: 'top'
			} );
		}

		// Canvas resize
		showResize( )
		{
			var	context = this,
				panel = pie.utils.panels.show( this.editor, 'basics', { title: 'Resize', type: 'resize', width: this.canvas.getWidth( ), height: this.canvas.getHeight( ) } );

			// Establish two-way communication
			$( panel ).myData( this.canvas, function( type, element, propName, value ) 
			{ 
				
			} );
		}

		// 
		showRound( )
		{

		}

		// Rounded the corners of the canvas
		rounded( )
		{

		}

		// Image selection window
		showAddImage( )
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
		
		// Save
		save( format )
		{
			this.editor.save( format );
		}

		// Export to JSON
		exportToJSON( )
		{
			this.editor.exportToJSON( );
		}
		
		// Import from JSON
		importFromJSON( json )
		{
			this.editor.importFromJSON( json );
		}
	};
} )( window );