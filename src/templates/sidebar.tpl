<nav id="side-menu" class="bg-light">
	<!--
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
	-->
	<ul id="navigation" class="nav nav-pills flex-column">
		{% for tabID, tab in tabs %}
			<li class="nav-item text-center"><a href="#" class="nav-link" pie-target-tab="{{ tabID }}">
				{% if tab.icon|length > 0 %}{{ tab.icon|safe }}{% endif %}
				<div>{{ tab.caption }}</div>
			</a></li>
		{% endfor %}
	</ul>
</nav>