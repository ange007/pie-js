{% for font in fonts %}
	{% if font.name|length > 0 %}
		<li>
			<a href="#" style="font-family: {{ font.name }};" onclick="pie.getEditor( '{{ id }}' ).{{ tabID }}.addText( '{{ font.name }}' );">
				{{ font.name }}
			</a>
		</li>
	{% endif %}
{% endfor %}