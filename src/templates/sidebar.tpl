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
			<li class="text-center"><a href="#" pie-target-tab="{{ tabID }}">
				{% if tab.icon|length > 0 %}{{ tab.icon|safe }}{% endif %}
				<div>{{ tab.caption }}</div>
			</a></li>
		{% endfor %}
	</ul>
</div>