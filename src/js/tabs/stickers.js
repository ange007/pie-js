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
			
			// Load the sticker list into memory
			this._loadStickerList( );

			// Hanging events
			this.tab.on( 'click', '#fonts li', function( )
			{

			} );

			//
			return data;
		}

		// Download stickers
		_loadStickerList( category = '' )
		{
			let context = this;

			// Get stickers
			this.editor._getConfig( 'stickers', function( data ) 
			{
				let stickerList = [ ],
					stickerCategories = { };

				for( let i in data )
				{
					// Skipping unnecessary blocks
					if( category !== '' && category !== 'all' && category !== i )
					{
						continue;
					}

					//
					let items = data[ i ].items;

					// Categories 
					stickerCategories[ i ] = data[ i ].caption || i;

					// 
					for( var j in items )
					{
						stickerList.push( { caption: items[ j ].caption, 
											image: 'packs/stickers/' + i + '/' + items[ j ].image,
											action: 'addImage',
											arguments: './packs/stickers/' + i + '/' + items[ j ].image } );
					}
					
					// stickerList = stickerList.concat( items );
				}

				// Template render
				let stickersHTML = context.editor.utils.template.render( 'tabs/stickers.tpl', { 'categories': stickerCategories, 'stickers': stickerList } );

				// Apply template
				context.tab.html( stickersHTML );
			} );
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
		}
	};
} )( window );