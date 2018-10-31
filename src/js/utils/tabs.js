( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Tabs ) { console.warn( 'pie.utils.Tabs is already defined.' ); return; }

	// Tabs
	pie.utils.Tabs =
	class Tabs extends pie.BaseClass 
	{
		// Loading the contents of tabs
		load( )
		{
			const context = this;

			// Get tabs parameters
			this.editor._getConfig( 'tabs', function( config ) 
			{
				// Calling the load event of the tab in the required module
				// @todo: Here we need to filter tabs depending on the settings of the editor
				let data = { };
				
				for( let tabID in config ) 
				{
					let tabName = tabID.charAt( 0 ).toUpperCase( ) + tabID.slice( 1 );

					console.log( tabName );

					//
					if( pie.tabs.hasOwnProperty( tabID ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabID ]( context.editor ); }
					else if( pie.tabs.hasOwnProperty( tabName ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabName ]( context.editor ); }

					//
					data[ tabID ] = context._callFunction( tabID, 'loadTab', [ config[ tabID ] ] ); 
				}

				// Template render
				const actionsTemplate = context.editor.utils.template.render( 'actions.tpl', { 'tabs': data } );

				//
				const $actions = context.editor.$elements[ 'actions-menu' ];

				// Display the template data
				$actions.html( actionsTemplate )
						.myData( { }, function( type, element, propName, value, data ) 
						{
							if( type === 'on' ) { context._callFunction( value, propName, [ ] ); }
						} );
			} );
		}

		// Calling a function from Tab
		_callFunction( tab, functionName, data )
		{	
			if( this.editor.tabs.hasOwnProperty( tab ) && this.editor.tabs[ tab ][ functionName ] !== undefined )
			{
				return this.editor.tabs[ tab ][ functionName ].apply( this.editor.tabs[ tab ], data );
			}
		}
	};

	// Base class of the tab
	pie.utils.BasicTab =
	class BasicTab extends pie.BaseClass 
	{
		constructor( editor )
		{
			super( editor );

			//
			this.tab = editor.$elements[ 'tab' ];
			this.data = { };
		}
		
		// Tab loading
		loadTab( data )
		{			
			this.data = data;
			this.data[ 'id' ] = this.className;

			return data;
		}

		// Tab activating
		activateTab( )
		{
			// Template render
			let templateHTML = this.editor.utils.template.render( 'tabs/' + this.className + '.tpl', this.data );
			
			// Apply template
			this.tab.addClass( 'active' )
					.html( templateHTML );
			
			// Set events
			this.setEvents( );
		}

		// Tab deactivating
		deactivateTab( )
		{			
			//
			this.tab.removeClass( 'active' )
					.off( );

			// pie.helpers.panels.hide( );
		}
		
		// Set events
		setEvents( )
		{
			const context = this;

			//
			this.tab.off( )
					.on( 'click', 'a[pie-action]', function( event ){ context._onTabItemClick( this, event ); } );
		}
		
		// Select Action Point
		_onTabItemClick( target, event )
		{
			const action = $( target ).attr( 'pie-action' ),
				args = $( target ).attr( 'pie-arguments' );

			// Call the function
			this._callFunction( action, [ ].concat( args ) );
		}

		// Calling a function by name
		_callFunction( functionName, data )
		{
			if( typeof this[ functionName ] === 'function' )
			{
				return this[ functionName ].apply( this, data );
			}
		}
	};
} )( window );