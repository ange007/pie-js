( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	//
	if( !pie.tabs ) { pie.tabs = { }; }
	if( pie.tabs.Stickers ) { console.warn( 'pie.tabs.stickers is already defined.' );	return; }
	
	//
	pie.tabs.Stickers = 
	class Stickers extends pie.utils.BasicTab
	{
		// Активация таба
		activateTab( $tab, data )
		{
			// Вызов родителя
			super.activateTab( $tab, data );
			
			// Загружаем в память список шрифтов
			this._loadStickerList( );

			// Навешиваем события
			this.tab.on( 'click', '#fonts li', function( )
			{

			} );

			//
			return data;
		}

		// Загрузка шрифтов
		_loadStickerList( category = '' )
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
		}
		
		// Добавление изображения
		addImage( image )
		{
			var context = this;

			fabric.Image.fromURL( image, function( oImg ) 
			{
				// 
				oImg.left = Math.floor( Math.random( ) * ( context.canvas.getWidth( ) - oImg.width ) + 1 );
				oImg.top = Math.floor( Math.random( ) * ( context.canvas.getHeight( ) - oImg.height ) + 1 );
				
				//
				context.canvas.add( oImg );

				// Отрисовываем изменения
				context.canvas.renderAll( );
			} );	
		}
	};
} )( window );