{% extends 'tabs/action-item.tpl' %}

{% block content %}
	<span href="#" style="font-family: {{ item.caption }};">
		{{ item.caption }}
	</span>
{% endblock %}