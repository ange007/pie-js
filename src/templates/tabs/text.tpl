<div>
	<div class="form-group">
		<label for="f-family">Font family</label>
		<select id="f-family" class="form-control">
			<option>AL</option>
			<option>CA</option>
			<option>IL</option>
		</select>
	</div>
	<div class="form-group">
		<label for="f-search">Search</label>
		<input type="text" id="f-search" class="form-control" />
	</div>
</div>
<div>
    <ul id="fonts" class="nav nav-pills nav-stacked">
		{% include 'tabs/text-fonts.tpl' %}
	</ul>
</div>