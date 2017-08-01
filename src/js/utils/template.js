( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Template ) { console.warn( 'pie.utils.template is already defined.' );	return; }

	//
	pie.utils.Template = function( editor ) { this.editor = editor; };
	pie.utils.Template.prototype =
	{
		// Отрисовка шаблона
		render: function( template, data )
		{
			return nunjucks.render( template, $.extend( data, { 'id': this.editor.id } ) );
		}
	};

} )( window );