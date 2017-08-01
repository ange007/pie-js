<div>
	<div class="form-group">
		<label for="f-family">Sticker category</label>
		<select id="f-family" class="form-control">
			{% for category, caption in categories %}
				<option value="category">{{ caption }}</option>
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