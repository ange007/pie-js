( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.template ) { console.warn( 'pie.utils.template is already defined.' );	return; }

	//
	pie.utils.template = 
	{
		// Отрисовка шаблона
		render: function( editor, template, data )
		{
			return nunjucks.render( template, $.extend( data, { 'id': editor.id } ) );
		}
	};

} )( window );