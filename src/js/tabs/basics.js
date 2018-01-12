( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Basics ) { console.warn( 'pie.tabs.basics is already defined.' );	return; }

	//
	pie.tabs.Basics =
	class Basics extends pie.utils.BasicTab
	{
		// Окно выбора цвета
		showBackgroundColor( )
		{
			var	context = this,
				panel = pie.utils.panels.show( this.editor, 'basics', { title: 'Выбор цвета', type: 'color' } );

			// Устанавливаем двухстороннюю связь
			$( panel ).myData( this.canvas, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.canvas.renderAll.bind( context.canvas )( );
				}
			} );
		}

		// Окно выбора изображения
		showBackgroundImage( )
		{

		}

		// Изображение на фоне
		backgroundImage( image )
		{
			this.canvas.setBackgroundImage( image, this.canvas.renderAll.bind( this.canvas ), {
				originX: 'left',
				originY: 'top'
			} );
		}

		//
		showResize( )
		{
			var	context = this,
				panel = pie.utils.panels.show( this.editor, 'basics', { title: 'Resize', type: 'resize', width: this.canvas.getWidth( ), height: this.canvas.getHeight( ) } );

			// Устанавливаем двухстороннюю связь
			$( panel ).myData( this.canvas, function( type, element, propName, value ) 
			{ 
				
			} );

			// Событие
			/*modal.on( 'change', 'input[type="number"][name="width"]', function( event ) { context.canvas.setWidth( event.target.value ); } );
			modal.on( 'change', 'input[type="number"][name="height"]', function( event ) { context.canvas.setHeight( event.target.value ); } );*/
		}

		// 
		showRound( )
		{

		}

		// Загругление углов фона
		rounded( )
		{

		}

		// Окно выбора изображения
		showAddImage( )
		{

		}

		// Добавление изображения
		addImage( image )
		{
			var context = this;

			fabric.Image.fromURL( image, function( oImg ) 
			{
				context.canvas.add( oImg );
			} );	
		}
		
		//
		save( format )
		{
			this.editor.save( format );
		}

		//
		exportToJSON( )
		{
			this.editor.exportToJSON( );
		}
		
		importFromJSON( json )
		{
			this.editor.importFromJSON( json );
		}
	};
} )( window );