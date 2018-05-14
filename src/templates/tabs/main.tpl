<div class="card scrollable-panel bg-dark">
	{% if title|length > 0 %}
		<h5 class="card-header">{{ title }}</h5>
	{% endif %}
	<div class="card-body" pie-tab="{{ id }}">
		{% if items|length > 0 %}
			<ul class="card-text nav nav-pills nav-stacked">
				{% for item in items %}
					<li>
						{% include 'tabs/' + id + '-item.tpl' %}
					</li>
				{% endfor %}
			<ul>
		{% else %}
			{% block content %} {% endblock %}
		{% endif %}
	</div>
</div>