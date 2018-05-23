( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.helpers ) { pie.helpers = { }; }
	if( pie.helpers.panels ) { console.warn( 'pie.helpers.panels is already defined.' ); return; }

	// Panels
	pie.helpers.panels = 
	{
		selector: '#panel',
		element: undefined,
		
		//
		setSelector: function( )
		{
			
		},
		
		// Show modal window
		show: function( editor, tpl, data )
		{
			console.log( 'show' );
			
			// Prevent hide
			this.hide( );
				
			// Render template
			let context = this,
				template = editor.utils.template.render( 'panels/' + tpl + '.tpl', data );
			
			//
			this.element = $( this.selector );
			
			// Display the template data
			return this.element.html( template )
								.show( )
								.on( 'click', '.panel-heading .close', function( ) { context.hide( ); } );
		},
		
		// Hide modal window
		hide: function( )
		{
			if( this.element === undefined )
			{
				return;
			}

			// Break off two-way communication
			$( this.element ).myData( 'destroy' );
			
			// Remove the listener of events and hide
			this.element.off( )
						.hide( );
				
			// Remove the link to the item
			delete this.element;
		}
	};

} )( window );