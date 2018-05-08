'use strict';

/* * * * * * * * * * * * * *
 *  Подключениемые модули 
 * * * * * * * * * * * * * */

const fs			= require( 'fs' ),
	path			= require( 'path' ),
	async			= require( 'async' ),
	gulp			= require( 'gulp' ),
	gulpif			= require( 'gulp-if' ),
	rename			= require( 'gulp-rename' ),
	replace			= require( 'gulp-replace' ),
	watch			= require( 'gulp-watch' ),
	debug			= require( 'gulp-debug' ),
	sync			= require( 'gulp-config-sync' ),
	header			= require( 'gulp-header' ),
	rimraf			= require( 'rimraf' ),
	rigger			= require( 'gulp-rigger' ),
	concat			= require( 'gulp-concat' ),
	uglify			= require( 'gulp-uglify' ),
	sass			= require( 'gulp-sass' ),
	cssmin			= require( 'gulp-clean-css' ),
	postcss			= require( 'gulp-postcss' ),
	babel			= require( 'gulp-babel' ),
	nunjucks		= require( 'gulp-nunjucks' ),
	autoprefixer	= require( 'autoprefixer' );

/* * * * * * * * * * * * * *
 * Переменные / Функции 
 * * * * * * * * * * * * * */

// Основные параметры плагина
let params = 
{
	fileName: 'pie-js'
};

// Пути
let pathList = 
{
	src: { 
		main: './src/',
		templates: './src/templates/',
		js: './src/js/**/',
		style: './src/scss/',
		packs: './src/packs/',
		locales: './src/locales/',
	},
	
	build: './build/'
};

// Параметры сборок
let bundles =
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

//
let synchronizingConfig =
[
	'stickers',
	'fonts'
];


// Сборка по умолчанию
var bundle = bundles[ 'dev' ];

/* * * * * * * * * * * * * *
 *  
 * * * * * * * * * * * * * */

// Считываем пак
function readPacks( dirPath )
{
	const files = fs.readdirSync( dirPath ),
		dataList = { };
			
	// Считываем основную директорию
	files.forEach( function( name )
	{
		if( fs.statSync( dirPath + '/' + name ).isDirectory( ) ) 
		{
			dataList[ name ] = { 
				'caption': name,
				'items': [ ]
			};

			// Считываем содержимое поддиректории
			fs.readdirSync( dirPath + '/' + name + '/' )
				.forEach( function( fileName )
			{
				if( fs.statSync( dirPath + '/' + name + '/' + fileName ).isFile( ) )
				{
					let caption = path.parse( fileName )[ 'name' ].replace( /[_-]/g, ' ' );
					
					// Прописываем файл
					if( /\.(svg|gif|png|jpeg|jpg|ttf|otf)$/.test( fileName ) )
					{
						dataList[ name ][ 'items' ].push( {
							'caption': caption,
							'file': fileName
						} );
					}
					// Считываем содержимое конфига и подставляем на это место
					else if( /\.(json)$/.test( fileName ) )
					{
						/*
						dataList[ name ][ 'items' ].push( {
							'config': fileName
						} );
						*/
					}
				}
			} );
		}
		else
		{
			/*
			dataList.push( {
				'caption': name, 
				'file': dirPath + '/' + name
			} );
			*/
		}
	});
	
	return dataList;
}

/* * * * * * * * * * * * * *
 * Tasks 
 * * * * * * * * * * * * * */

/**
 * Sync config
 */
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

/**
 * Sync packs and other data
 */
gulp.task( 'packs:read', function( done )
{
	// Read packs
	synchronizingConfig.forEach( function( name )
	{
		if( fs.statSync( pathList.src.packs ).isDirectory( ) ) 
		{
			let packConfig = readPacks( pathList.src.packs + name );
				
			//
			fs.writeFile( pathList.src.main + 'config/' + name + '.json' , JSON.stringify( packConfig, null, 2 ), function( err )
			{
				if( err ) { throw err; }
			} );  
		}
	} );
	
	//
	done( );
} );

/**
 * Clean
 */
gulp.task( 'clean', function( done )
{  
    rimraf.sync( pathList.build + '/**' );
	
	//
	done( );
} );

/**
 * JS
 */
gulp.task( 'js:build', function( ) 
{
	//
	let fileName = params.fileName + bundle.fileSuffix + '.js';
	
	// Header
	let pkg = require( './package.json' ),
		banner = [ '/**',
					' * <%= pkg.name %> - <%= pkg.description %>',
					' * @version v<%= pkg.version %>',
					' * @link <%= pkg.homepage %>',
					' * @license <%= pkg.license %>',
					' * @author <%= pkg.author %>',
					' */',
					'',
					'' ].join( '\n' );
	
	//
    return gulp.src( [ pathList.src.js + 'main.js' ] )
				.pipe( debug( { title: 'js:' } ) ) // Вывод пофайлового лога
				.pipe( rigger( ) ) // Подстановка исходного кода файлов на место переменных
				.pipe( gulpif( bundle.compress, uglify( { mangle: true, compress: false } ) ) ) //
				.pipe( header( banner, { pkg : pkg } ) ) // Установка хидера
				.pipe( babel( {	presets: [ 'env' ] } ) ) // Преобразовываем
				.pipe( rename( fileName ) ) // Переименовываем
				.pipe( gulp.dest(  pathList.build + bundle.mainPath ) );
} );

/**
 * SASS/SCSS
 */
gulp.task( 'scss:build', function( ) 
{ 
	let target = [ pathList.src.style + '**/**.scss' ],
		fileName = params.fileName;

	//
	return gulp.src( target )
				.pipe( debug( { title: 'scss:' } ) ) // Вывод пофайлового лога
				.pipe( sass( { errLogToConsole: true } ) ) // Компилируем SCSS файлы
				.pipe( postcss( [ autoprefixer( ) ] ) ) // Добавим префиксы
				.pipe( concat( fileName + bundle.fileSuffix + '.css' ) ) // Собираем
				.pipe( gulpif( bundle.compress, cssmin( ) ) ) // Сжимаем
				.pipe( gulp.dest( pathList.build + bundle.mainPath ) );
} );

/**
 * Other files
 */
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

/**
 * Template precompile
 */
gulp.task( 'template:precompile', function( ) 
{ 
	// Compile template
	return gulp.src( [ pathList.src.templates + '**/*.tpl' ], { base: pathList.src.templates } )
				.pipe( nunjucks.precompile( { } ) )
				.pipe( concat( 'templates.js' ) )
				.pipe( gulp.dest( pathList.build ) );
} );

/**
 * Main build
 */
gulp.task( 'build', gulp.series( 'js:build', 'scss:build', 'packs:read', 'template:precompile', 'other:transfer', function( done ) 
{
	//
	 done( );
} ) );

// Задача по сборке
/*
gulp.task( 'build:min', function( ) 
{
	// Делаем минифицированную версию
	bundle = bundles[ 'min' ];
	gulp.task( '', [ 'build' ] ); 
} );
*/

/**
 * Default
 */
gulp.task( 'default', gulp.series( 'clean', 'build' , function( done ) 
{
	//
	gulp.watch( [ pathList.src.js + '**/*.js' ], gulp.parallel( 'js:build' ) ),
	gulp.watch( [ pathList.src.style + '**/*.scss' ], gulp.parallel( 'scss:build' ) );
	gulp.watch( [ pathList.src.templates + '**/*.tpl' ], gulp.parallel( 'template:precompile' ) );
	gulp.watch( [ pathList.src.main + '**/*.*', 
				'!' +  pathList.src.main + '**/*.+(js|css|scss)' ], gulp.parallel( 'other:transfer' ) );
		
	//
	done( );
} ) );