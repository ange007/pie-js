
<a href="#" 
	class="{% block class %}{% endblock %}"
	{% if item.action|length > 0 %} pie-action="{{ item.action }}"{% endif %}
	{% if item.arguments|length > 0 %} pie-arguments="{{ item.arguments }}"{% endif %}
	{% block custom %}{% endblock %}
>
	{% block content %}{% endblock %}
</a>