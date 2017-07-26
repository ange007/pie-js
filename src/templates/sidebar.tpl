<div class="side-menu navbar navbar-inverse col-md-3" role="navigation">
	<div class="navbar-header">
		<div class="brand-wrapper">
			<button type="button" class="navbar-toggle">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
	</div>
	<ul id="navigation" class="nav navbar-nav side-menu-container">
		{% for tabID, tab in tabs %}
			<li class="text-center"><a href="#" data-target-tab="{{ tabID }}">
				{% if tab.icon|length > 0 %}{{ tab.icon|safe }}{% endif %}
				<div>{{ tab.caption }}</div>
			</a></li>
		{% endfor %}
	</ul>
</div>

<div id="tabs" class="panel panel-default side-body">
	<div class="panel-body">
		{% for tabID, tab in tabs %}
		<div id="{{ tabID }}" class="tab">
			{% if tab.title|length > 0 %}	
				<legend class="tab-title">{{ tab.title }}</legend>
			{% endif %}

			{% if tab.items|length > 0 %}
			<ul class="nav nav-pills nav-stacked">
				{% for item in tab.items %}
					<li><a href="#" onclick="pie.getEditor( '{{ id }}' ).{{ tabID }}.{{ item.action }}">
					{% if item.type === 'text' %}
						{% if item.icon|length > 0 %}<span>{{ item.icon }}</span>{% endif %}
						<span>{{ item.caption }}</span>
					{% elseif item.type === 'image' %}
						<img src="{{ item.image }}" />
					{% else %}
						 {% include 'tabs/' + tabID + '-item.tpl' %}
					{% endif %}
					</a></li>
				{% endfor %}
			<ul>
			{% else %}
				 {% include 'tabs/' + tabID + '.tpl' %}
			{% endif %}
		</div>
		{% endfor %}
	</div>
</div>