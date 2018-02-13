( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Template ) { console.warn( 'pie.utils.Template is already defined.' ); return; }

	// Template
	pie.utils.Template = 
	class Template
	{
		constructor( editor )
		{
			this.editor = editor;
		}

		// Template render
		render( template, data )
		{
			return nunjucks.render( template, $.extend( data, { 'editorID': this.editor.id } ) );
		}
	};

} )( window );