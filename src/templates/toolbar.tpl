<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="collapse navbar-collapse">
		<ul id="menu" class="nav navbar-nav mr-auto">
			<li class="nav-item active">
				<a class="nav-link" href="#" data-on="click:importFromJSON">
					<i class="fas fa-upload"></i>&nbsp;{{ 'toolbar.load'|i18n }}<span class="sr-only">(current)</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#" data-on="click:save">
					<i class="fas fa-save"></i>&nbsp;{{ 'toolbar.save'|i18n }}
				</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Other<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a class="nav-link" href="#" data-on="click:importFromJSON">{{ 'toolbar.importJSON'|i18n }}</a></li>
					<li role="separator" class="divider"></li>
					<li><a class="nav-link" href="#" data-on="click:exportToJSON">{{ 'toolbar.exportJSON'|i18n }}</a></li>
				</ul>
			</li>
			{% if demo %}
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Actions Panel Position<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a class="nav-link dropdown-item" href="#" data-on="click:actionsPanelPosition('left')">Left</a></li>
					<li><a class="nav-link dropdown-item" href="#" data-on="click:actionsPanelPosition('right')">Right</a></li>
					<li><a class="nav-link dropdown-item" href="#" data-on="click:actionsPanelPosition('top')">Top</a></li>
					<li><a class="nav-link dropdown-item" href="#" data-on="click:actionsPanelPosition('bottom')">Bottom</a></li>
				</ul>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Toolbar Position<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a class="nav-link" href="#" data-on="click:toolbarPosition('top')">Top</a></li>
					<li><a class="nav-link" href="#" data-on="click:toolbarPosition('bottom')">Bottom</a></li>
				</ul>
			</li>
			{% endif %}
		</ul>

		<div id="control-panel" class="form-inline my-2 my-lg-0 btn-toolbar" role="toolbar">
			<div class="input-group">
				<div class="btn-toolbar mx-auto pr-3" role="toolbar">
					<div class="input-group-prepend">
						<button type="button" class="btn btn-light" title="Zoom UP" data-on="zoom(false)"><i class="fas fa-plus-circle"></i></button>
					</div>
					<div id="zoom-value" class="input-group-text">
						Zoom 100%
					</div>
					<div class="input-group-append">
						<button type="button" class="btn btn-light" title="Zoom DOWN" data-on="zoom(true)"><i class="fas fa-minus-circle"></i></button>
					</div>
				</div>
			</div>

			<div class="btn-group" role="group" aria-label="Basic example">
				<button type="button" class="btn btn-light" title="History"><i class="fas fa-history"></i></button>
				<button type="button" class="btn btn-light" title="Layers"><i class="fas fa-clone"></i></button>
			</div>

			<!--
			<div class="form-group">
				<label for="clear-bg" class="navbar-text nopadding-top-bottom">Clear BG:</label>
				<button data-on="click:backgroundClear"><i class="fa fa-trash"></i></button>
			</div> 

			<div class="form-group">
				<label for="bg" class="navbar-text nopadding-top-bottom">BG:</label>
				<input type="color" data-bind="backgroundColor">
			</div> 
			
			<div class="form-group">
				<label for="height" class="navbar-text nopadding-top-bottom">H:</label>
				<input type="number" name="height" class="form-control" data-bind="height"/>
			</div>
			
			<div class="form-group">
				<label for="width" class="navbar-text nopadding-top-bottom">W:</label>
				<input type="number" name="width" class="form-control" data-bind="width"/>
			</div>
			-->
		</div>
	</div>
</nav>



