( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Config ) { console.warn( 'pie.utils.Config is already defined.' ); return; }

	// Config
	pie.utils.Config = 
	class Config 
	{
		constructor( editor )
		{
			this.editor = editor;
		}

		//
		load( file, callback )
		{
			let data = { 
				url: './' + file + '.json', 
				dataType: 'json',
			};

			//
			if( typeof callback === 'function'  )
			{
				$.ajax( $.extend( { }, data, 
				{
					success: function( response )
					{ 
						let object = ( typeof response === 'object' ? response : JSON.parse( response ) );
						
						callback( object ); 
					} 
				} ) );
			}
			else
			{
				let response = $.ajax( $.extend( { }, data, { async: false } ) ).responseText;
				let	object = ( typeof response === 'object' ? response : JSON.parse( response ) );

				return object;
			}
		}
	}
} )( window );