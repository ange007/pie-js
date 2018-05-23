<div class="card scrollable-panel bg-dark">
	{% if title|length > 0 %}
		<h5 class="card-header">{{ title }}</h5>
	{% endif %}
	<div class="card-body" pie-tab="{{ id }}">
		{% if items|length > 0 %}
			<ul id="navigation" class="list-group">
				{% for item in items %}
					{% include 'tabs/' + id + '-item.tpl' %}
				{% endfor %}
			</ul>
		{% else %}
			{% block content %} {% endblock %}
		{% endif %}
	</div>
</div>