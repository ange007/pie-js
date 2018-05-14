( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Stickers ) { console.warn( 'pie.tabs.stickers is already defined.' );	return; }
	
	// Stickers
	pie.tabs.Stickers = 
	class Stickers extends pie.utils.BasicTab
	{
		// Activating the tab
		activateTab( $tab, data )
		{
			// Parent call
			super.activateTab( $tab, data );

			// Variables
			this.categories = { };

			// Load sticker categories and stickers
			this._loadStickerCategories( )
				._loadStickerList( );

			// Context link
			let context = this;

			// Hanging events
			this.tab.on( 'change', 'select#s-category', function( event )
			{
				let category = $( this ).val( );

				// Load the sticker list
				context._loadStickerList( category );
			} );

			//
			return data;
		}

		//
		_loadStickerCategories( )
		{
			let context = this;

			// Get Categories
			this.editor._getConfig( 'stickers', function( data ) 
			{
				// Clear list
				context.categories = { };

				// Load list
				for( let i in data ) 
				{
					context.categories[ i ] = data[ i ].caption || i; 
				}
			} );

			return this;
		}

		// Download stickers
		_loadStickerList( category = '' )
		{
			let context = this;

			// Get stickers
			this.editor._getConfig( 'stickers', function( data ) 
			{
				let stickerList = [ ];

				//
				for( let i in data )
				{
					// Skipping unnecessary blocks
					if( category !== '' && category !== 'all' && category !== i )
					{
						continue;
					}

					// 
					for( var j in data[ i ].items )
					{
						let item  = data[ i ].items[ j ];

						//
						stickerList.push( { caption: item.caption,
											category: i,
											image: 'packs/stickers/' + i + '/' + item.file,
											action: 'addImage',
											arguments: './packs/stickers/' + i + '/' + item.file } );
					}
				}

				// Template render
				context.editor.render( context.tab, 'tabs/stickers.tpl', $.extend( { }, context.data, { 
					'active_category': category || 'all', 
					'categories': context.categories, 
					'stickers': stickerList 
				} ) );
			} );

			return this;
		}
		
		// Add image
		addImage( image )
		{
			let context = this,
				parts = image.split( '/' ).pop( ).split( '.' ),
				ext = parts.length > 1 ? parts.pop( ) : '';

			if( ext === 'svg' )
			{
				fabric.loadSVGFromURL( image, function( objects, options )
				{
					var obj = fabric.util.groupSVGElements( objects, options );
					
					//
					context.canvas.add( obj )
									.renderAll( );
				 } );
			}
			else
			{
				fabric.Image.fromURL( image, function( oImg ) 
				{
					// 
					oImg.left = Math.floor( Math.random( ) * ( context.canvas.getWidth( ) - oImg.width ) + 1 );
					oImg.top = Math.floor( Math.random( ) * ( context.canvas.getHeight( ) - oImg.height ) + 1 );

					//
					context.canvas.add( oImg )
									.renderAll( );
				} );
			}

			return this;
		}
	};
} )( window );