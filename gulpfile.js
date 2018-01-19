'use strict';

/* * * * * * * * * * * * * *
 *  Подключениемые модули 
 * * * * * * * * * * * * * */

let fs = require( 'fs' ),
	path = require( 'path' ),
	async = require( 'async' ),
	gulp = require( 'gulp' ),
	gulpif = require( 'gulp-if' ),
	rename = require( 'gulp-rename' ),
	replace = require('gulp-replace'),
	watch = require( 'gulp-watch' ),
	debug = require( 'gulp-debug' ),
	sync = require( 'gulp-config-sync' ),
	header = require('gulp-header'),
	rimraf = require( 'rimraf' ),
	rigger = require( 'gulp-rigger' ),
	concat = require( 'gulp-concat' ),
	uglify = require( 'gulp-uglify' ),
	sass = require( 'gulp-sass' ),
	cssmin = require( 'gulp-clean-css' ),
	postcss = require( 'gulp-postcss' ),
	babel = require( 'gulp-babel' ),
	nunjucks = require( 'gulp-nunjucks' ),
	autoprefixer = require( 'autoprefixer' );

/* * * * * * * * * * * * * *
 * Переменные / Функции 
 * * * * * * * * * * * * * */

// Основные параметры плагина
var params = 
{
	fileName: 'pie-js'
};

// Пути
var pathList = 
{
	src: { 
		main: './src/',
		templates: './src/templates/',
		js: './src/js/**/',
		style: './src/scss/',
		packs: './src/packs/'
	},
	
	build: './build/'
};

// Параметры сборок
var bundles =
{
	dev: {
		fileSuffix: '',
		compress: false,
		mainPath: ''
	},
	
	min: {
		fileSuffix: '.min',
		compress: true,
		mainPath: ''
	}
};

// Сборка по умолчанию
var bundle = bundles[ 'dev' ];

/* * * * * * * * * * * * * *
 *  
 * * * * * * * * * * * * * */

function getFiles( dirPath, fileExt, type, readSubDir, callback )
{
	fs.readdir( dirPath, function( err, files )
	{
		if( err ) { return callback( err ); }
		let filePaths = [ ];
		
		async.eachSeries( files, function( fileName, eachCallback )
		{
			let filePath = path.join( dirPath, fileName );

			fs.stat( filePath, function( err, stat )
			{
				if( err ) { return eachCallback( err ); }

				if( ( type === 'dir' || readSubDir ) && stat.isDirectory( ) )
				{
					if( type === 'dir' )
					{
						filePaths.push( filePath );
						eachCallback( null );
					}
					
					if( readSubDir )
					{
						getFiles( filePath, fileExt, type, readSubDir, function( err, subDirFiles )
						{
							if( err ) { return eachCallback( err ); }

							filePaths = filePaths.concat( subDirFiles );
							eachCallback( null );
						} );
					}
				} 
				else
				{
					if( type === 'file' && stat.isFile( ) && ( new RegExp( '\.' + fileExt + '$' ) ).test( filePath ) )
					{
						filePaths.push( filePath );
					}

					eachCallback( null );
				}
			} );
		}, 
		function( err )
		{
			console.log( 'getFiles:end' );
			callback( err, filePaths );
		} );

	} );
}

/* * * * * * * * * * * * * *
 * Задачи 
 * * * * * * * * * * * * * */

// Синхронизация изменений конфигураций для bower и сomposer
gulp.task( 'config:sync', function( )
{
	var options = 
	{
		fields: [
			'version',
			'description',
			'keywords',
			'repository',
			'license',
			{
				from: 'contributors',
				to: 'authors'
			}
		],
		space: '  '
	};
	
	//
	gulp.src( [ 'bower.json', 'composer.json' ] )
		.pipe( sync( options ) ) // Синхронизируем данные
		.pipe( gulp.dest( '.' ) );
} );

// Очищаем директорию сборки
gulp.task( 'clean', function( )
{  
    return rimraf.sync( pathList.build + '/**' );
} );

// Задача обработки скриптов библиотеки
gulp.task( 'js:build', function( ) 
{
	// Основные параметры
	const fileName = params.fileName + bundle.fileSuffix + '.js',
			path = pathList.build + bundle.mainPath,
			stickersPath = pathList.src.packs + 'stickers';
		
	let stickersConfig = { };
	
	// Считываем стикеры
	getFiles( stickersPath, '', 'dir', false, function( err, dirs )
	{
		console.log( dirs );
		
		for( var i = 0; i < dirs.length; i++ )
		{
			const item = dirs[ i ],
				dirName = item.match( /(^.*)\/(.[a-zA-Z0-9_-]+)(?:(\/)|)$/ )[ 2 ];
			
			stickersConfig[ dirName ] = { 
				'caption': '',
				'items': [ ]
			};
			
			getFiles( item, 'svg', 'file', false, function( err, files )
			{
				for( var j = 0; j < files.length; j++ )
				{
					const fileName = path.basename( files[ j ] );
					
					stickersConfig[ dirname ][ 'items' ].push( { 'image': fileName } );
				}
			} );
		}
		
		// console.log( err || items );
	} );

	// Формируем заголовок для файла
	var pkg = require( './package.json' ),
		banner = [ '/**',
					' * <%= pkg.name %> - <%= pkg.description %>',
					' * @version v<%= pkg.version %>',
					' * @link <%= pkg.homepage %>',
					' * @license <%= pkg.license %>',
					' * @author <%= pkg.author %>',
					' */',
					'',
					'' ].join( '\n' );
	
	// Собираем файл
    return gulp.src( [ pathList.src.js + 'main.js' ] )
				.pipe( debug( { title: 'js:' } ) ) // Вывод пофайлового лога
				.pipe( rigger( ) ) // Подстановка исходного кода файлов на место переменных
				.pipe( gulpif( bundle.compress, uglify( { mangle: true, compress: false } ) ) ) //
				.pipe( header( banner, { pkg : pkg } ) ) // Установка хидера
				.pipe( babel( {	presets: [ 'env' ] } ) ) // Преобразовываем
				.pipe( rename( fileName ) ) // Переименовываем
				.pipe( gulp.dest( path ) );
} );

// Сборка SASS/SCSS
gulp.task( 'scss:build', function( ) 
{ 
	var target = [ pathList.src.style + '**/**.scss' ],
		fileName = params.fileName,
		path = pathList.build + bundle.mainPath;

	// Собираем каркас
	return gulp.src( target )
				.pipe( debug( { title: 'scss:' } ) ) // Вывод пофайлового лога
				.pipe( sass( { errLogToConsole: true } ) ) // Компилируем SCSS файлы
				.pipe( postcss( [ autoprefixer( ) ] ) ) // Добавим префиксы
				.pipe( concat( fileName + bundle.fileSuffix + '.css' ) ) // Собираем
				.pipe( gulpif( bundle.compress, cssmin( ) ) ) // Сжимаем
				.pipe( gulp.dest( path ) );
} );

// Обработка стилей
gulp.task( 'other:transfer', function( )
{
	//
    gulp.src( [ pathList.src.main + '**/*.*', 
				'!' +  pathList.src.main + '**/*.+(js|css|scss|tpl)',
				'!' +  pathList.src.main + 'vendor/**/*.*' ], { base: pathList.src.main } )
        .pipe( gulp.dest( pathList.build ) );

	//
    return gulp.src( [ pathList.src.main + 'vendor/**/*.*' ], { base: pathList.src.main } )
        .pipe( gulp.dest( pathList.build ) );
} );

// Прекомпиляция шаблонов
gulp.task( 'template:precompile', function( ) 
{ 
	// Компилируем шаблоны
	return gulp.src( [ pathList.src.templates + '**/*.tpl' ], { base: pathList.src.templates } )
			.pipe( nunjucks.precompile( { } ) )
			.pipe( concat( 'templates.js' ) )
			.pipe( gulp.dest( pathList.build ) );
} );

// Задача по сборке
gulp.task( 'build', function( ) 
{
	// Делаем обычную версию
	gulp.start( 'js:build', 'scss:build', 'template:precompile', 'other:transfer' ); 
} );

// Задача по сборке
gulp.task( 'build:min', function( ) 
{
	// Делаем минифицированную версию
	bundle = bundles[ 'min' ];
	gulp.start( 'build' ); 
} );

// Задача по умолчанию
gulp.task( 'default', function( ) 
{  
	// Запускаем основные задания
	gulp.start( 'clean', 'build' );

	/* * * * * * * * * * * * * *
	 * Смотрители 
	 * * * * * * * * * * * * * */

	gulp.watch( [ pathList.src.js + '/*.js' ], [ 'js:build' ] ),
	gulp.watch( [ pathList.src.style + '/**/*.scss' ], [ 'scss:build' ] );
	gulp.watch( [ pathList.src.templates + '**/*.tpl' ], [ 'template:precompile' ] );
	gulp.watch( [ pathList.src.main + '**/*.*', 
				'!' +  pathList.src.main + '**/*.+(js|css|scss)' ], [ 'other:transfer' ] );
} );