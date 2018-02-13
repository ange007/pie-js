(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["layers.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"panel panel-default\">\r\n\t<div class=\"panel-heading\">\r\n\t\t<h3 class=\"panel-title\">Layers</h3>\r\n\t</div>\r\n\t<div class=\"panel-body\">\r\n\t\t<ul class=\"nav nav-pills nav-stacked\">\r\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "layers");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("layer", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t\t\t<li><a href=\"#\" class=\"layer\" data-layer-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\">\r\n\t\t\t\t";
if(runtime.memberLookup((t_4),"type") == "image") {
output += "\r\n\t\t\t\t\t";
var t_5;
t_5 = "picture";
frame.set("icon", t_5, true);
if(frame.topLevel) {
context.setVariable("icon", t_5);
}
if(frame.topLevel) {
context.addExport("icon", t_5);
}
output += "\r\n\t\t\t\t";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "text" || runtime.memberLookup((t_4),"type") == "textbox") {
output += "\r\n\t\t\t\t\t";
var t_6;
t_6 = "font";
frame.set("icon", t_6, true);
if(frame.topLevel) {
context.setVariable("icon", t_6);
}
if(frame.topLevel) {
context.addExport("icon", t_6);
}
output += "\r\n\t\t\t\t";
;
}
else {
output += "\r\n\t\t\t\t\t";
var t_7;
t_7 = "certificate";
frame.set("icon", t_7, true);
if(frame.topLevel) {
context.setVariable("icon", t_7);
}
if(frame.topLevel) {
context.addExport("icon", t_7);
}
output += "\r\n\t\t\t\t";
;
}
;
}
output += "\r\n\t\t\t\t\r\n\t\t\t\t<span class=\"type-icon glyphicon glyphicon-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "icon"), env.opts.autoescape);
output += "\" aria-hidden=\"true\"></span>\r\n\t\t\t\t&nbsp;&nbsp;\r\n\t\t\t\t<div class=\"btn-group\" role=\"group\">\r\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-action=\"visible\"><span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span></button>\r\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-action=\"lock\"><span class=\"glyphicon glyphicon-lock\" aria-hidden=\"true\"></span></button>\r\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-action=\"remove\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>\r\n\t\t\t\t</div>\r\n\t\t\t\t&nbsp;&nbsp;\r\n\t\t\t\t<span>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</span>\r\n\t\t\t</a></li>\r\n\t\t";
;
}
}
frame = frame.pop();
output += "\r\n\t\t</ul>\r\n\t</div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"editor\">\t\r\n\t<div id=\"toolbar\" class=\"col-md-12 row\">\r\n\r\n\t</div>\r\n\t\r\n\t<div id=\"wrapper\" class=\"col-md-12 row\">\r\n\t\t<div id=\"sidebar\" class=\"col-md-1 row\">\r\n\r\n\t\t</div>\r\n\r\n\t\t<div id=\"tab\" class=\"col-md-2 row\">\r\n\r\n\t\t</div>\r\n\r\n\t\t<div id=\"canvas-wrapper\" class=\"col-md-7\">\t\t\r\n\t\t\t<div id=\"top-panel\"></div>\t\r\n\r\n\t\t\t<div id=\"viewport\">\r\n\t\t\t\t<canvas id=\"canvas\" width=\"500\" height=\"300\"></canvas>\r\n\r\n\t\t\t\t<div id=\"ruler\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div id=\"bottom-panel\"></div>\t\r\n\t\t</div>\r\n\r\n\t\t<div id=\"layers\" class=\"col-md-2 row\"></div>\r\n\t</div>\r\n</div>\r\n\r\n<div id=\"splash\" aria-hidden=\"false\">\r\n\t<div id=\"splash-spinner\"></div>\r\n</div>\t";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sidebar.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"side-menu navbar navbar-inverse col-md-3\" role=\"navigation\">\r\n\t<div class=\"navbar-header\">\r\n\t\t<div class=\"brand-wrapper\">\r\n\t\t\t<button type=\"button\" class=\"navbar-toggle\">\r\n\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t\t<span class=\"icon-bar\"></span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n\t<ul id=\"navigation\" class=\"nav navbar-nav side-menu-container\">\t\t\r\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tabs");
if(t_3) {var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0]
frame.set("tabID", t_3[t_1][0]);
var t_5 = t_3[t_1][1]
frame.set("tab", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t\t\t<li class=\"text-center\"><a href=\"#\" pie-target-tab=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\">\r\n\t\t\t\t";
if(env.getFilter("length").call(context, runtime.memberLookup((t_5),"icon")) > 0) {
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((t_5),"icon")), env.opts.autoescape);
;
}
output += "\r\n\t\t\t\t<div>";
output += runtime.suppressValue(runtime.memberLookup((t_5),"caption"), env.opts.autoescape);
output += "</div>\r\n\t\t\t</a></li>\r\n\t\t";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_6 in t_3) {
t_1++;
var t_7 = t_3[t_6];
frame.set("tabID", t_6);
frame.set("tab", t_7);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t\t\t<li class=\"text-center\"><a href=\"#\" pie-target-tab=\"";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += "\">\r\n\t\t\t\t";
if(env.getFilter("length").call(context, runtime.memberLookup((t_7),"icon")) > 0) {
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((t_7),"icon")), env.opts.autoescape);
;
}
output += "\r\n\t\t\t\t<div>";
output += runtime.suppressValue(runtime.memberLookup((t_7),"caption"), env.opts.autoescape);
output += "</div>\r\n\t\t\t</a></li>\r\n\t\t";
;
}
}
}
frame = frame.pop();
output += "\r\n\t</ul>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["toolbar.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"navbar navbar-inverse nopadding-top-bottom\">\r\n\t<div class=\"container-fluid\">\r\n\r\n\t\t<ul class=\"nav navbar-nav\">\r\n\t\t\t<li class=\"active\"><a href=\"#\" click=\"click:importFromJSON\">Load <span class=\"sr-only\">(current)</span></a></li>\r\n\t\t\t<li><a href=\"#\" data-on=\"click:save\">Save</a></li>\r\n\t\t\t<li class=\"dropdown\">\r\n\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Other<span class=\"caret\"></span></a>\r\n\t\t\t\t<ul class=\"dropdown-menu\">\r\n\t\t\t\t\t<li><a href=\"#\" data-on=\"click:importFromJSON\">Import from JSON</a></li>\r\n\t\t\t\t\t<li role=\"separator\" class=\"divider\"></li>\r\n\t\t\t\t\t<li><a href=\"#\" data-on=\"click:exportToJSON\">Export to JSON</a></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\r\n\t\t<div class=\"navbar-form navbar-right\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<label for=\"height\" class=\"navbar-text nopadding-top-bottom\">H:</label>\r\n\t\t\t\t<input type=\"number\" name=\"height\" class=\"form-control\" data-bind=\"height\"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"navbar-form navbar-right\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<label for=\"width\" class=\"navbar-text nopadding-top-bottom\">W:</label>\r\n\t\t\t\t<input type=\"number\" name=\"width\" class=\"form-control\" data-bind=\"width\"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"navbar-form navbar-right\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<label for=\"bg\" class=\"navbar-text nopadding-top-bottom\">BG:</label>\r\n\t\t\t\t<input type=\"color\" data-bind=\"backgroundColor\">\r\n\t\t\t</div> \r\n\t\t</div>\r\n\t</div>\r\n</div><!-- /.row -->\r\n\r\n\r\n\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["panels/basics.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("panels/main.tpl", true, "panels/basics.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
output += t_5;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.opts.autoescape);
output += "\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t";
if(runtime.contextOrFrameLookup(context, frame, "type") === "crop") {
output += "\r\n\r\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "type") === "rotate") {
output += "\r\n\r\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "type") === "resize") {
output += "\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"width\">Width</label>\r\n\t\t\t<input type=\"number\" name=\"width\" class=\"form-control\" data-bind=\"width\"/>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"height\">Height</label>\r\n\t\t\t<input type=\"number\" name=\"height\" class=\"form-control\" data-bind=\"height\" />\r\n\t\t</div>\r\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "type") === "round") {
output += "\r\n\r\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "type") === "color") {
output += "\r\n\t\t<input type=\"color\" data-bind=\"backgroundColor\">\r\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "type") === "image") {
output += "\r\n\r\n\t";
;
}
;
}
;
}
;
}
;
}
;
}
output += "\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["panels/main.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">\n\t\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "\n\t\t<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t</div>\n\t<div class=\"panel-body\">\n\t\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n\t</div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["panels/text.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("panels/main.tpl", true, "panels/text.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
output += t_5;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.opts.autoescape);
output += "\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"btn-toolbar\" role=\"toolbar\">\n\t<div class=\"btn-group\"> \n\t\t<button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n\t\t\t<span class=\"glyphicon glyphicon-align-left\" aria-hidden=\"true\"></span>\n\t\t</button>\n\t\t\n\t\t<button type=\"button\" class=\"btn btn-default\" aria-label=\"Center Align\">\n\t\t\t<span class=\"glyphicon glyphicon-align-center\" aria-hidden=\"true\"></span>\n\t\t</button> \n\t\t\n\t\t<button type=\"button\" class=\"btn btn-default\" aria-label=\"Right Align\">\n\t\t\t<span class=\"glyphicon glyphicon-align-right\" aria-hidden=\"true\"></span>\n\t\t</button>\n\t\t\n\t\t<button type=\"button\" class=\"btn btn-default\" aria-label=\"Justify\">\n\t\t\t<span class=\"glyphicon glyphicon-align-justify\" aria-hidden=\"true\"></span>\n\t\t</button>\n\t</div> \n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/action-item.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<a href=\"#\" \r\n\t";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"action")) > 0) {
output += " pie-action=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"action"), env.opts.autoescape);
output += "\"";
;
}
output += "\r\n\t";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"arguments")) > 0) {
output += " pie-arguments=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"arguments"), env.opts.autoescape);
output += "\"";
;
}
output += "\r\n>\r\n\r\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "\r\n</a>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/basics-item.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("tabs/action-item.tpl", true, "tabs/basics-item.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"icon")) > 0) {
output += "<span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"icon"), env.opts.autoescape);
output += "</span>";
;
}
output += "\r\n\t<span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"caption"), env.opts.autoescape);
output += "</span>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/basics.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("tabs/main.tpl", false, "tabs/basics.tpl", null, function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
callback(null,t_1);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
callback(null,t_2);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/main.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"tabs\" class=\"panel panel-default scrollable-panel\">\r\n\t<div class=\"panel-body\">\r\n\t\t<div pie-tab=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\">\r\n\t\t\t";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "title")) > 0) {
output += "\t\r\n\t\t\t\t<legend class=\"tab-title\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.opts.autoescape);
output += "</legend>\r\n\t\t\t";
;
}
output += "\r\n\r\n\t\t\t";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "items")) > 0) {
output += "\r\n\t\t\t\t<ul class=\"nav nav-pills nav-stacked\">\r\n\t\t\t\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("tabs/" + runtime.contextOrFrameLookup(context, frame, "id") + "-item.tpl", false, "tabs/main.tpl", null, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
callback(null,t_5);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
callback(null,t_6);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t";
});
}
}
frame = frame.pop();
output += "\r\n\t\t\t\t<ul>\r\n\t\t\t";
;
}
else {
output += "\r\n\t\t\t\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
output += t_9;
output += "\r\n\t\t\t";
});
}
output += "\r\n\t\t</div>\r\n\t</div>\r\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += " ";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/stickers-item.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("tabs/action-item.tpl", true, "tabs/stickers-item.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t<img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"image"), env.opts.autoescape);
output += "\" width=\"70px\" height=\"70px\"/>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/stickers.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("tabs/main.tpl", true, "tabs/stickers.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t<div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"s-category\">Sticker category</label>\r\n\t\t\t<select id=\"s-category\" class=\"form-control\">\r\n\t\t\t\t<option value=\"all\">ALL</option>\r\n\t\t\t\t";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_7) {var t_5;
if(runtime.isArray(t_7)) {
var t_6 = t_7.length;
for(t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5][0]
frame.set("category", t_7[t_5][0]);
var t_9 = t_7[t_5][1]
frame.set("caption", t_7[t_5][1]);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n\t\t\t\t\t<option value=\"";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\"";
output += runtime.suppressValue(((t_8 == runtime.contextOrFrameLookup(context, frame, "active_category"))?" selected":""), env.opts.autoescape);
output += ">";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "</option>\r\n\t\t\t\t";
;
}
} else {
t_5 = -1;
var t_6 = runtime.keys(t_7).length;
for(var t_10 in t_7) {
t_5++;
var t_11 = t_7[t_10];
frame.set("category", t_10);
frame.set("caption", t_11);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n\t\t\t\t\t<option value=\"";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "\"";
output += runtime.suppressValue(((t_10 == runtime.contextOrFrameLookup(context, frame, "active_category"))?" selected":""), env.opts.autoescape);
output += ">";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += "</option>\r\n\t\t\t\t";
;
}
}
}
frame = frame.pop();
output += "\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t</div>\r\n\t<div>\r\n\t\t<div id=\"stickers\">\r\n\t\t\t";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "stickers");
if(t_14) {var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("item", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\r\n\t\t\t\t";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("tabs/stickers-item.tpl", false, "tabs/stickers.tpl", null, function(t_18,t_16) {
if(t_18) { cb(t_18); return; }
callback(null,t_16);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_19,t_17) {
if(t_19) { cb(t_19); return; }
callback(null,t_17);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\r\n\t\t\t";
});
}
}
frame = frame.pop();
output += "\r\n\t\t</div>\r\n\t</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/text-fonts.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "fonts");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("font", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t";
if(env.getFilter("length").call(context, runtime.memberLookup((t_4),"name")) > 0) {
output += "\r\n\t<li><a href=\"#\" style=\"font-family: ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += ";\" onclick=\"pie.getEditor( '";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "' ).";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tabID"), env.opts.autoescape);
output += ".addText( '";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "' );\">\r\n\t\t";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "\r\n\t</a></li>\r\n\t";
;
}
output += "\r\n";
;
}
}
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/text-item.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("tabs/action-item.tpl", true, "tabs/text-item.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t<span href=\"#\" style=\"font-family: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"caption"), env.opts.autoescape);
output += ";\">\r\n\t\t";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"caption"), env.opts.autoescape);
output += "\r\n\t</span>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tabs/text.tpl"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("tabs/main.tpl", true, "tabs/text.tpl", false, function(t_2,_parentTemplate) {
if(t_2) { cb(t_2); return; }
parentTemplate = _parentTemplate
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n\t<div>\r\n\t\t<div class=\"form-group\">\t\t\r\n\t\t\t<label for=\"f-family\">Font family</label>\r\n\t\t\t<select id=\"f-family\" class=\"form-control\">\r\n\t\t\t\t";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_7) {var t_5;
if(runtime.isArray(t_7)) {
var t_6 = t_7.length;
for(t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5][0]
frame.set("category", t_7[t_5][0]);
var t_9 = t_7[t_5][1]
frame.set("caption", t_7[t_5][1]);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n\t\t\t\t\t<option value=\"category\">";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "</option>\r\n\t\t\t\t";
;
}
} else {
t_5 = -1;
var t_6 = runtime.keys(t_7).length;
for(var t_10 in t_7) {
t_5++;
var t_11 = t_7[t_10];
frame.set("category", t_10);
frame.set("caption", t_11);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n\t\t\t\t\t<option value=\"category\">";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += "</option>\r\n\t\t\t\t";
;
}
}
}
frame = frame.pop();
output += "\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"f-search\">Search</label>\r\n\t\t\t<input type=\"text\" id=\"f-search\" class=\"form-control\" />\r\n\t\t</div>\r\n\t</div>\r\n\t<div>\r\n\t\t<ul id=\"fonts\" class=\"nav nav-pills nav-stacked\">\r\n\t\t\t";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "fonts");
if(t_14) {var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("item", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\r\n\t\t\t\t<li>\r\n\t\t\t\t\t";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("tabs/text-item.tpl", false, "tabs/text.tpl", null, function(t_18,t_16) {
if(t_18) { cb(t_18); return; }
callback(null,t_16);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_19,t_17) {
if(t_19) { cb(t_19); return; }
callback(null,t_17);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\r\n\t\t\t\t</li>\r\n\t\t\t";
});
}
}
frame = frame.pop();
output += "\r\n\t\t</ul>\r\n\t</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();
