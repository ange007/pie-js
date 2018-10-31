( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.helpers ) { pie.utils = { }; }
	if( pie.helpers.config ) { console.warn( 'pie.helpers.config is already defined.' ); return; }

	// Config
	pie.helpers.config =
	{
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
						let object = ( typeof response === 'object' ? response : JSON.parse( response || '{}' ) );
						
						callback( object ); 
					} 
				} ) );
			}
			else
			{
				let response = $.ajax( $.extend( { }, data, { async: false } ) ).responseText;
				let	object = ( typeof response === 'object' ? response : JSON.parse( response || '{}' ) );

				return object;
			}
		}
	}
} )( window );