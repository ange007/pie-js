( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.actions ) { pie.utils = { }; }
	if( pie.actions.Template ) { console.warn( 'pie.actions.Demo is already defined.' ); return; }

	// Demo
	pie.actions.Demo = 
	class Demo extends pie.BaseClass 
	{
		toolbarPosition( )
		{
			// this.editor.$elements.
		}

		actionsPanelPosition( )
		{

		}
	}
} )( window );