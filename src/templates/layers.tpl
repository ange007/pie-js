<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Layers</h3>
	</div>
	<div class="panel-body">
		<ul class="nav nav-pills nav-stacked">
		{% for layer in layers %}
			<li><a href="#" data-layer-id="{{ layer.id }}">
				<div class="btn-group" role="group">
					<button type="button" class="btn btn-default" data-action="visible"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-action="remove"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-action="lock"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></button>
				</div>

				<span>{{ layer.name }}</span>
			</a></li>
		{% endfor %}
		</ul>
	</div>
</div>