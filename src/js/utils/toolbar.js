( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Toolbar ) { console.warn( 'pie.utils.Toolbar is already defined.' ); return; }

	// Toolbar
	pie.utils.Toolbar = 
	class Toolbar extends pie.BaseClass 
	{
		// Load Toolbar
		load( )
		{
			// Template render
			let context = this,
				template = this.editor.utils.template.render( 'toolbar.tpl', { demo: this.editor.options.demo } );

			// Set template and two-way communication
			this.editor.$elements[ 'toolbar' ].html( template );

			// Menu
			this.editor.$elements[ 'toolbar' ].find( '#menu' ).myData( this, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.editor.canvas.renderAll.bind( context.editor.canvas )( );
				}
			} );

			// Canvas
			this.editor.$elements[ 'toolbar' ].find( '#control-panel' ).myData( { data: this.editor.canvas, event: this }, function( type, element, propName, value ) 
			{
				if( type === 'set' )
				{
					context.editor.canvas.renderAll.bind( context.editor.canvas )( );
				}
			} );
		}

		//
		backgroundClear( )
		{
			this.editor.canvas.setBackgroundColor( '' )
								.setBackgroundImage( '' )
								.renderAll.bind( this.editor.canvas )( );
			/*
			this.canvas.backgroundColor = null;
			this.canvas.backgroundImage = null; 
			*/
		}

		// BackgroundImage
		backgroundImage( image )
		{
			this.editor.canvas.setBackgroundImage( image, this.editor.canvas.renderAll.bind( this.canvas ), {
				originX: 'left',
				originY: 'top'
			} );
		}

		// Add image
		addImage( image )
		{
			let context = this;

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
		
		//
		importFromJSON( json )
		{
			alert( 'import' );
			this.editor.importFromJSON( json );
		}

		//
		actionsPanelPosition( position )
		{
			let $container = $( this.editor.$elements[ 'container' ] );
			let $element = $( this.editor.$elements[ 'actions' ] );
			let positionClass = '';

			if( position === 'left' ) { positionClass = 'order-first'; }
			else if( position === 'right' ) { positionClass = 'order-last'; }
			// else if( position === 'bottom' ) { positionClass = 'd-flex'; }

			$element.removeClass( 'top bottom left right vertical horizontal order-first order-last' )
					.addClass( ( position === 'left' || position === 'right' ) ? 'vertical' : 'horizontal' )
					.addClass( position )
					.addClass( positionClass );
		}

		//
		toolbarPosition( position )
		{
			let $container = $( this.editor.$elements[ 'container' ] );
			let $element = $( this.editor.$elements[ 'toolbar' ] );

			$element.removeClass( 'top bottom' )
					.addClass( position );
		}

		//
		zoom( value )
		{
			let state = ( value === 'true' );
			let percentage = this.editor.zoom( state );

			$( '#zoom-value' ).html( 'Zoom ' + percentage + '%' );
		}
	};
} )( window );