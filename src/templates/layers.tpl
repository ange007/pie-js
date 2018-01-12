<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Layers</h3>
	</div>
	<div class="panel-body">
		<ul class="nav nav-pills nav-stacked">
		{% for layer in layers %}
			<li><a href="#" class="layer" data-layer-id="{{ layer.id }}">
				{% if layer.type == 'image' %}
					{% set icon = 'picture' %}
				{% elseif layer.type == 'text' or layer.type == 'textbox' %}
					{% set icon = 'font' %}
				{% else %}
					{% set icon = 'certificate' %}
				{% endif %}
				
				<span class="type-icon glyphicon glyphicon-{{ icon }}" aria-hidden="true"></span>
				&nbsp;&nbsp;
				<div class="btn-group" role="group">
					<button type="button" class="btn btn-default" data-action="visible"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-action="lock"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></button>
					<button type="button" class="btn btn-default" data-action="remove"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
				</div>
				&nbsp;&nbsp;
				<span>{{ layer.name }}</span>
			</a></li>
		{% endfor %}
		</ul>
	</div>
</div>