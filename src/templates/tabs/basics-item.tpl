{% extends 'tabs/action-item.tpl' %}

{% block content %}
	{% if item.icon|length > 0 %}<span>{{ item.icon }}</span>{% endif %}
	<span>{{ item.caption }}</span>
{% endblock %}