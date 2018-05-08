/* @todo: 
*
*/

( function( global )
{
	'use strict';
	let pie = global.pie = global.pie || { };
	
	// Default options
	pie.defaultOptions = { 
		container: undefined, // The main container in which the editor will be located

		// If no container is specified - used selectors (needed from customizing).
		selectors: {
			sidebar: '#sidebar',
			layers: '#layers',
			panel: '#panel',
			canvas: 'canvas'
		},

		//
		callbacks: {
			onLoad: function( ) { },
			onSave: function( ) { },
			onError: function( ) { },
			onClose: function( ) { }
		},

		blocks: [ 'layers', 'sidebar' ],
		tabs: [ ],
		lang: 'ru'
	};
	
	// Editor list
	pie.list = [ ];
	
	// Get editor list
	pie.getEditorList = function( )
	{
		return this.list;
	};
	
	// Get editor by identifier
	pie.getEditor = function( id )
	{
		return this.list[ id ];
	};
	
	// Get the editor by index
	pie.getEditorFromIndex = function( index )
	{
		// return this.list[ index ];
	}	
} )( window );

//= editor.js
//= helpers/panels.js
//= utils/config.js
//= utils/template.js
//= utils/toolbar.js
//= utils/tabs.js
//= utils/layers.js
//= tabs/text.js
//= tabs/stickers.js