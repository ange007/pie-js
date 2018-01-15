<div class="panel panel-default">
	<div class="panel-body">
		<div pie-tab="{{ id }}">
			{% if title|length > 0 %}	
				<legend class="tab-title">{{ title }}</legend>
			{% endif %}

			{% if items|length > 0 %}
				<ul class="nav nav-pills nav-stacked">
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
</div>