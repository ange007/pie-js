{% extends 'tabs/action-item.tpl' %}

{% block class %}list-group-item list-group-item-action{% endblock %}

{% block content %}
	{% if item.icon|length > 0 %}<span>{{ item.icon }}</span>{% endif %}
	<span>{{ item.caption }}</span>
{% endblock %}