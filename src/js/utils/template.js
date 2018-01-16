( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Template ) { console.warn( 'pie.utils.Template is already defined.' );	return; }

	//
	pie.utils.Template = 
	class Template
	{
		constructor( editor )
		{
			this.editor = editor;
		}

		// Отрисовка шаблона
		render( template, data )
		{
			return nunjucks.render( template, $.extend( data, { 'editorID': this.editor.id } ) );
		}
	};

} )( window );