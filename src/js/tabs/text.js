( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Text ) { console.warn( 'pie.tabs.text is already defined.' );	return; }
	
	// Text
	pie.tabs.Text = 
	class Text extends pie.utils.BasicTab
	{
		// Activating the tab
		activateTab( $tab, data )
		{
			// Parent call
			super.activateTab( $tab, data );

			// Load into memory font list
			this.loadFontList( );

			// Hanging events
			this.tab.on( 'click', '#fonts li', function( )
			{

			} );

			//
			return data;
		}

		// Downloading Fonts
		loadFontList( category = '' )
		{
			let context = this;

			// Get fonts
			this.editor._getConfig( 'fonts', function( data ) 
			{
				let fontList = [ ],
					fontCategories = { },
					webFontList = [ ];

				for( let i in data )
				{
					// Skipping unnecessary blocks
					if( category !== '' && category !== 'all' && category !== i )
					{
						continue;
					}

					//
					let items = data[ i ].items;

					// Font Groups
					fontCategories[ i ] = data[ i ].caption || i;

					// Fonts
					for( var j in items )
					{
						fontList.push( { font: items[ j ].file, 
										caption: items[ j ].caption, 
										action: 'addText',
										arguments: items[ j ].caption } );
					}

					// Write Web fonts
					for( var j in items )
					{
						if( items[ j ].file === '' && items[ j ].caption !== ''  )
						{
							webFontList.push( items[ j ].caption  );
						}
					}
				}

				// Download Font
				if( webFontList.length > 0 )
				{
					context.loadWebFont( webFontList );
				}

				// Template render
				context.editor.render( context.tab, 'tabs/text.tpl', $.extend( { }, context.data, { 
					'categories': fontCategories, 
					'fonts': fontList
				} ) );
			} );
		}

		// Using Web Fonts
		loadWebFont( fonts )
		{
			// Delete the old connected fonts
			$( 'head' ).find( 'link[name="g-fonts"]' ).remove( );

			// Adding new
			$( 'head' ).append( "<link href='http://fonts.googleapis.com/css?family=" + fonts.join( '|' ) + "' rel='stylesheet' type='text/css' name='g-fonts'>" );

			// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
			// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
		}

		// Text add
		addText( fontFamily, text )
		{
			let defaultText = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
								'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

			// 
			var textSample = new fabric.Textbox( text || defaultText, 
			{
			  fontSize: 20,
			  left: Math.random(400),
			  top: Math.random(400),
			  fontFamily: fontFamily,
			  angle: Math.random(10),
			  fill: '#2196f3',
			  fontWeight: '',
			  originX: 'left',
			  width: 300,
			  hasRotatingPoint: true,
			  centerTransform: true
			} );

			// Adding text
			this.canvas.add( textSample );
		}
	};

} )( window );