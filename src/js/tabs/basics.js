( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Basics ) { console.warn( 'pie.tabs.basics is already defined.' );	return; }

	//
	pie.tabs.Basics = function( editor ) 
	{
		this.editor = editor;
		this.canvas = editor.canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Basics.prototype = 
	{
		// Загрузка таба
		loadTab: function( data )
		{		
			return data;
		},

		// Активация таба
		activateTab: function( $tab, data )
		{
			this.tab = $tab;

			return data;
		},

		//
		deactivateTab: function( )
		{

		},

		// Окно выбора цвета
		showBackgroundColor: function( )
		{
			var	context = this,
				modal = pie.utils.panels.show( this.editor, 'basics', { title: 'Выбор цвета', type: 'color' } );

			// Устанавливаем двухстороннюю связь
			pie.utils.binding.bind( this.canvas, modal, [ this.canvas.renderAll.bind( this.canvas ) ], function( element, propName, value )
			{
				
			} );
		},

		// Окно выбора изображения
		showBackgroundImage: function( )
		{

		},

		// Изображение на фоне
		backgroundImage: function( image )
		{
			this.canvas.setBackgroundImage( image, this.canvas.renderAll.bind( this.canvas ), {
				originX: 'left',
				originY: 'top'
			} );
		}, 

		//
		showResize: function( )
		{
			var	context = this,
				modal = pie.utils.panels.show( this.editor, 'basics', { title: 'Resize', type: 'resize', width: this.canvas.getWidth( ), height: this.canvas.getHeight( ) } );

			// 
			pie.utils.binding.bind( context.canvas, modal, function( )
			{
				
			} );

			// Событие
			/*modal.on( 'change', 'input[type="number"][name="width"]', function( event ) { context.canvas.setWidth( event.target.value ); } );
			modal.on( 'change', 'input[type="number"][name="height"]', function( event ) { context.canvas.setHeight( event.target.value ); } );*/
		},

		// 
		showRound: function( )
		{

		},

		// Загругление углов фона
		rounded: function( )
		{

		},

		// Окно выбора изображения
		showAddImage: function( )
		{

		},

		// Добавление изображения
		addImage: function( image )
		{
			var context = this;

			fabric.Image.fromURL( image, function( oImg ) 
			{
				context.canvas.add(oImg);
			} );	
		}
	};
} )( window );