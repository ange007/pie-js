{% extends "panels/main.tpl" %}

{% block title %}
	{{ title }}
{% endblock %}

{% block content %}
<div class="btn-toolbar" role="toolbar">
	<div class="btn-group"> 
		<button type="button" class="btn btn-default" aria-label="Left Align">
			<span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
		</button>
		
		<button type="button" class="btn btn-default" aria-label="Center Align">
			<span class="glyphicon glyphicon-align-center" aria-hidden="true"></span>
		</button> 
		
		<button type="button" class="btn btn-default" aria-label="Right Align">
			<span class="glyphicon glyphicon-align-right" aria-hidden="true"></span>
		</button>
		
		<button type="button" class="btn btn-default" aria-label="Justify">
			<span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
		</button>
	</div> 
</div>
{% endblock %}