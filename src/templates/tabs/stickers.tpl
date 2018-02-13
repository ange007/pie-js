{% extends 'tabs/main.tpl' %}

{% block content %}
	<div>
		<div class="form-group">
			<label for="s-category">Sticker category</label>
			<select id="s-category" class="form-control">
				<option value="all">ALL</option>
				{% for category, caption in categories %}
					<option value="{{ category }}"{{ ' selected' if ( category == active_category ) }}>{{ caption }}</option>
				{% endfor %}
			</select>
		</div>
	</div>
	<div>
		<div id="stickers">
			{% for item in stickers %}
				{% include 'tabs/stickers-item.tpl' %}
			{% endfor %}
		</div>
	</div>
{% endblock %}