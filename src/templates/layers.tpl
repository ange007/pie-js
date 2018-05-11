<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Layers</h3>
	</div>
	<div class="panel-body">
		<ul class="nav nav-pills nav-stacked">
		{% for layer in layers %}
			<li data-on="click:action( 'select' )" data-on-value="{{ layer.id }}">
				<a href="#" class="layer">
					{% if layer.type == 'image' %}
						{% set icon = 'picture' %}
					{% elseif layer.type == 'text' or layer.type == 'textbox' %}
						{% set icon = 'font' %}
					{% else %}
						{% set icon = 'certificate' %}
					{% endif %}
					
					<div>
						<span class="type-icon glyphicon glyphicon-{{ icon }}" aria-hidden="true"></span>
						&nbsp;&nbsp;
						{{ layer.name }}
					</div>
					<div class="text-right">
						<div class="btn-group" role="group">
							<button type="button" class="btn btn-xs btn-default{{ ' btn-primary' if layer.hide }}" data-on="click:action( 'visible' )" data-on-value="{{ layer.id }}"><span class="glyphicon {{ 'glyphicon-eye-close' if layer.hide else 'glyphicon-eye-open' }}" aria-hidden="true"></span></button>
							<button type="button" class="btn btn-xs btn-default{{ ' btn-primary' if layer.lock }}" data-on="click:action( 'lock' )" data-on-value="{{ layer.id }}"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></button>
							<button type="button" class="btn btn-xs btn-default" data-on="click:action( 'remove' )" data-on-value="{{ layer.id }}"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
						</div>
					</div>
				</a>
			</li>
		{% endfor %}
		</ul>
	</div>
</div>