/* @todo: 
*
*/

( function( global )
{
	'use strict';
	let pie = global.pie = global.pie || { };
	
	// Настройки по умолчанию
	pie.defaultOptions = { 
		container: undefined, // Основной контейнер в котором будет располагаться редактор

		// Если не указан контейнер - используются селекторы (необходимо для кастомизации)
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
	
	// Список редакторов
	pie.list = [ ];
	
	// Список редакторов
	pie.getEditorList = function( )
	{
		return this.list;
	};
	
	// Получить редактор по идентификатору
	pie.getEditor = function( id )
	{
		return this.list[ id ];
	};
	
} )( window );

//= editor.js
//= tabs/basics.js
//= tabs/text.js
//= tabs/stickers.js
//= utils/template.js
//= utils/panels.js
//= utils/tabs.js
//= utils/layers.js