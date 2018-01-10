'use strict';

/* * * * * * * * * * * * * *
 *  Подключениемые модули 
 * * * * * * * * * * * * * */

var gulp = require( 'gulp' ),
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
var paths = 
{
	src: { 
		main: './src/',
		templates: './src/templates/',
		js: './src/js/**/',
		style: './src/scss/'
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
    return rimraf.sync( paths.build + '/**' );
} );

// Задача обработки скриптов библиотеки
gulp.task( 'js:build', function( ) 
{
	// Основные параметры
	var fileName = params.fileName + bundle.fileSuffix + '.js',
		path = paths.build + bundle.mainPath;
	
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
    return gulp.src( paths.src.js + 'main.js')
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
	var target = paths.src.style + '**/**.scss',
		fileName = params.fileName,
		path = paths.build + bundle.mainPath;

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
    gulp.src( [ paths.src.main + '**/*.*', 
						'!' +  paths.src.main + '**/*.+(js|css|scss|tpl)',
						'!' +  paths.src.main + 'vendor/**/*.*' ], { base: paths.src.main } )
        .pipe( gulp.dest( paths.build ) );

	//
    return gulp.src( [ paths.src.main + 'vendor/**/*.*' ], { base: paths.src.main } )
        .pipe( gulp.dest( paths.build ) );
} );

// Прекомпиляция шаблонов
gulp.task( 'template:precompile', function( ) 
{ 
	// Компилируем шаблоны
	return gulp.src( paths.src.templates + '**/*.tpl', { base: paths.src.templates } )
			.pipe( nunjucks.precompile( { } ) )
			.pipe( concat( 'templates.js' ) )
			.pipe( gulp.dest( paths.build ) );
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

	gulp.watch( paths.src.js + '/*.js', [ 'js:build' ] ),
	gulp.watch( paths.src.style + '/**/*.scss', [ 'scss:build' ] );
	gulp.watch( [ paths.src.templates + '**/*.tpl' ], [ 'template:precompile' ] );
	gulp.watch( [ paths.src.main + '**/*.*', 
				'!' +  paths.src.main + '**/*.+(js|css|scss)' ], [ 'other:transfer' ] );
} );