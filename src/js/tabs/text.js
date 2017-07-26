( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Text ) { console.warn( 'pie.tabs.text is already defined.' );	return; }
	
	//
	pie.tabs.Text = function( editor, canvas ) 
	{
		this.editor = editor;
		this.canvas = canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Text.prototype = 
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

			// Загружаем в память список шрифтов
			this.loadFontList( );

			// Навешиваем события
			this.tab.on( 'click', '#fonts li', function( )
			{

			} );

			//
			return data;
		},

		//
		deactivateTab: function( )
		{

		},

		// Загрузка шрифтов
		loadFontList: function( category = '' )
		{
			let context = this;

			// Запрашиваем шрифты
			this.editor.getConfig( 'fonts', function( data ) 
			{
				let fontList = [ ],
					fontGroups = [ ],
					webFontList = [ ];

				for( let i in data )
				{
					// Пропуск ненужных блоков
					if( category !== '' && category !== 'all' && category !== i )
					{
						continue;
					}

					//
					let items = data[ i ].items;

					// Группы шрифтов
					fontGroups[ i ] = data[ i ].caption || i;

					// Шрифты
					fontList = fontList.concat( items );

					// Записываем web шрифты
					for( var j in items )
					{
						if( items[ j ].font === '' && items[ j ].name !== ''  )
						{
							webFontList.push( items[ j ].name  );
						}
					}
				}

				// Загрузка шрифтов
				if( webFontList.length > 0 )
				{
					context.loadWebFont( webFontList );
				}

				// Формируем шаблон
				let fontsHTML = pie.utils.template.render( context, 'tabs/text-fonts.tpl', { 'fonts': fontList } );

				// Применяем шаблон
				context.tab.find( '#fonts' ).html( fontsHTML );
			} );
		},

		// Использование Web шрифтов
		loadWebFont: function( fonts )
		{
			// Удаляем старые подключенные шрифты
			$( 'head' ).find( 'link[name="g-fonts"]' ).remove( );

			// Добавляем новые
			$( 'head' ).append( "<link href='http://fonts.googleapis.com/css?family=" + fonts.join( '|' ) + "' rel='stylesheet' type='text/css' name='g-fonts'>" );

			// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
			// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
		},

		//
		addText: function( )
		{
			var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
						'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

			// 
			var textSample = new fabric.Textbox( text.slice( 0, getRandomInt( 0, text.length ) ), 
			{
			  fontSize: 20,
			  left: getRandomInt(350, 400),
			  top: getRandomInt(350, 400),
			  fontFamily: 'helvetica',
			  angle: getRandomInt(-10, 10),
			  fill: '#' + getRandomColor(),
			  fontWeight: '',
			  originX: 'left',
			  width: 300,
			  hasRotatingPoint: true,
			  centerTransform: true
			} );

			// Добавляем текст
			this.canvas.add( textSample );
		}
	};

} )( window );