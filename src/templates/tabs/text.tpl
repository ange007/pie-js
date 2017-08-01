<div>
	<div class="form-group">		
		<label for="f-family">Font family</label>
		<select id="f-family" class="form-control">
			{% for category, caption in categories %}
				<option value="category">{{ caption }}</option>
			{% endfor %}
		</select>
	</div>
	<div class="form-group">
		<label for="f-search">Search</label>
		<input type="text" id="f-search" class="form-control" />
	</div>
</div>
<div>
    <ul id="fonts" class="nav nav-pills nav-stacked">
		{% for item in fonts %}
			<li>
				{% include 'tabs/text-item.tpl' %}
			</li>
		{% endfor %}
	</ul>
</div>