{% extends 'tabs/action-item.tpl' %}

{% block class %}list-group-item list-group-item-action{% endblock %}
{% block custom %}style="font-family: {{ item.caption }};"{% endblock %}
{% block content %}{{ item.caption }}{% endblock %}