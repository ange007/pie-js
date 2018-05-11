<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="collapse navbar-collapse">
		<ul id="menu" class="nav navbar-nav mr-auto">
			<li class="nav-item active">
				<a class="nav-link" href="#" data-on="click:importFromJSON">{{ 'toolbar.load'|i18n }}<span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#" data-on="click:save">{{ 'toolbar.save'|i18n }}</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Other<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a class="nav-link" href="#" data-on="click:importFromJSON">Import from JSON</a></li>
					<li role="separator" class="divider"></li>
					<li><a class="nav-link" href="#" data-on="click:exportToJSON">Export to JSON</a></li>
				</ul>
			</li>
		</ul>

		<div id="control-panel" class="form-inline  my-2 my-lg-0">
			<div class="form-group">
				<label for="clear-bg" class="navbar-text nopadding-top-bottom">Clear BG:</label>
				<button data-on="click:backgroundClear"><i class="glyphicon glyphicon-trash"></i></button>
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
		</div>
	</DIV>
</nav>



