( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// BaseClass
	pie.BaseClass = 
	class BaseClass
	{
		constructor( editor )
		{
			this.editor = editor;
			this.className = this.constructor.name.charAt( 0 ).toLowerCase( ) + this.constructor.name.slice( 1 );
			this.canvas = editor.canvas;
		}
	}
} )( window );