{% extends "panels/main.tpl" %}

{% block title %}
	{{ title }}
{% endblock %}

{% block content %}
	{% if type === 'crop' %}

	{% elseif type === 'rotate' %}

	{% elseif type === 'resize' %}
		<div class="form-group">
			<label for="width">Width</label>
			<input type="number" name="width" class="form-control" data-bind="width"/>
		</div>

		<div class="form-group">
			<label for="height">Height</label>
			<input type="number" name="height" class="form-control" data-bind="height" />
		</div>
	{% elseif type === 'round' %}

	{% elseif type === 'color' %}
		<input type="color" data-bind="backgroundColor">
	{% elseif type === 'image' %}

	{% endif %}
{% endblock %}