<div class="card bg-dark">
	{% if title|length > 0 %}
		<h5 class="card-header">{% block title %}{% endblock %}</h5>
	{% endif %}
	<div class="card-body">
		{% block content %}{% endblock %}
	</div>
</div>