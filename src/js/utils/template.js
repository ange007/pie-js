( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Template ) { console.warn( 'pie.utils.Template is already defined.' ); return; }

	// Template
	pie.utils.Template = 
	class Template extends pie.BaseClass 
	{
		constructor( editor )
		{
			super( editor );

			//
			this.language = '';

			//
			const customEnv = nunjucks.configure( );
				customEnv.addFilter( 'i18n', function( str, data ) { return I18n.t( str, data ); } );
		}

		// Change Language
		changeLanguage( lang )
		{
			this.language = lang;

			//
			I18n.fallbacks = true;
			I18n.defaultLocale = 'en';
			I18n.locale = lang;
			I18n.translations[ 'en' ] = pie.helpers.config.load( 'locales/en' );

			// Load other language
			if( lang !== 'en' ) 
			{
				I18n.translations[ lang ] = pie.helpers.config.load( 'locales/' + lang );
			}
		}

		// Reload Templatess
		reload( )
		{

		}

		// Template Render
		render( template, data )
		{
			// Load language
			if( this.language === '' )
			{
				this.changeLanguage( 'en' );
			}

			// Render template
			return nunjucks.render( template, $.extend( data, {
				'editorID': this.editor.id
			} ) );
		}

		// Translate
		translate( str, data )
		{
			I18n.t( str, data );
		}
	};
} )( window );