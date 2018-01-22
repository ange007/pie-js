( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Text ) { console.warn( 'pie.tabs.text is already defined.' );	return; }
	
	//
	pie.tabs.Text = 
	class Text extends pie.utils.BasicTab
	{
		// Активация таба
		activateTab( $tab, data )
		{
			// Вызов родителя
			super.activateTab( $tab, data );

			// Загружаем в память список шрифтов
			this.loadFontList( );

			// Навешиваем события
			this.tab.on( 'click', '#fonts li', function( )
			{

			} );

			//
			return data;
		}

		// Загрузка шрифтов
		loadFontList( category = '' )
		{
			let context = this;

			// Запрашиваем шрифты
			this.editor._getConfig( 'fonts', function( data ) 
			{
				let fontList = [ ],
					fontCategories = { },
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
					fontCategories[ i ] = data[ i ].caption || i;

					// Шрифты
					for( var j in items )
					{
						fontList.push( { font: items[ j ].file, 
										caption: items[ j ].caption, 
										action: 'addText',
										arguments: items[ j ].caption } );
					}

					// Записываем web шрифты
					for( var j in items )
					{
						if( items[ j ].file === '' && items[ j ].caption !== ''  )
						{
							webFontList.push( items[ j ].caption  );
						}
					}
				}

				// Загрузка шрифтов
				if( webFontList.length > 0 )
				{
					context.loadWebFont( webFontList );
				}

				// Формируем шаблон
				let fontsHTML = context.editor.utils.template.render( 'tabs/text.tpl', { 'categories': fontCategories, 'fonts': fontList } );

				// Применяем шаблон
				context.tab.html( fontsHTML );
			} );
		}

		// Использование Web шрифтов
		loadWebFont( fonts )
		{
			// Удаляем старые подключенные шрифты
			$( 'head' ).find( 'link[name="g-fonts"]' ).remove( );

			// Добавляем новые
			$( 'head' ).append( "<link href='http://fonts.googleapis.com/css?family=" + fonts.join( '|' ) + "' rel='stylesheet' type='text/css' name='g-fonts'>" );

			// <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
			// https://fonts.googleapis.com/css?family=Indie+Flower|Pacifico|Gloria+Hallelujah|Shadows+Into+Light|Dancing+Script|Amatic+SC|Architects+Daughter|Yellowtail|Courgette|Satisfy|Kaushan+Script|Permanent+Marker|Cookie|Great+Vibes|Kalam|Handlee|Bad+Script
		}

		//
		addText( fontFamily )
		{
			var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
						'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

			// 
			var textSample = new fabric.Textbox( text, 
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

			// Добавляем текст
			this.canvas.add( textSample );
		}
	};

} )( window );