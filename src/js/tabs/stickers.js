( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Stickers ) { console.warn( 'pie.tabs.stickers is already defined.' );	return; }
	
	//
	pie.tabs.Stickers = function( editor ) 
	{
		this.editor = editor;
		this.canvas = editor.canvas;
		this.tab = undefined;
	};

	//
	pie.tabs.Stickers.prototype = 
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
			this._loadStickerList( );

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
		_loadStickerList: function( category = '' )
		{
			let context = this;

			// Запрашиваем шрифты
			this.editor._getConfig( 'stickers', function( data ) 
			{
				let stickerList = [ ],
					stickerCategories = { };

				for( let i in data )
				{
					// Пропуск ненужных блоков
					if( category !== '' && category !== 'all' && category !== i )
					{
						continue;
					}

					//
					let items = data[ i ].items;

					// Категории 
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

				// Формируем шаблон
				let stickersHTML = context.editor.utils.template.render( 'tabs/stickers.tpl', { 'categories': stickerCategories, 'stickers': stickerList } );

				// Применяем шаблон
				context.tab.html( stickersHTML );
			} );
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