<div class="card bg-light">
	<div class="card-header">
		Layers
	</div>
	<div class="card-body">
		<ul class="list-group">
		{% for layer in layers %}
			<li class="list-group-item list-group-item-action layer" data-on="click:action( 'select' )" data-on-value="{{ layer.id }}">
				{% if layer.type == 'image' %}
					{% set icon = 'picture' %}
				{% elseif layer.type == 'text' or layer.type == 'textbox' %}
					{% set icon = 'font' %}
				{% else %}
					{% set icon = 'certificate' %}
				{% endif %}
				
				<div>
					<span class="type-icon fa fa-{{ icon }}" aria-hidden="true"></span>
					&nbsp;&nbsp;
					{{ layer.name }}
				</div>
				<div class="text-right">
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-xs btn-default{{ ' btn-primary' if layer.hide }}" data-on="click:action( 'visible' )" data-on-value="{{ layer.id }}"><span class="fa {{ 'fa-eye-slash' if layer.hide else 'fa-eye' }}" aria-hidden="true"></span></button>
						<button type="button" class="btn btn-xs btn-default{{ ' btn-primary' if layer.lock }}" data-on="click:action( 'lock' )" data-on-value="{{ layer.id }}"><span class="fa fa-lock" aria-hidden="true"></span></button>
						<button type="button" class="btn btn-xs btn-default" data-on="click:action( 'remove' )" data-on-value="{{ layer.id }}"><span class="fa fa-trash" aria-hidden="true"></span></button>
					</div>
				</div>
			</li>
		{% endfor %}
		</ul>
	</div>
</div>