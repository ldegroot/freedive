/**
 * freeDive wizard by Len De Groot and Scot Hacker at the UC Berkeley Graduate School of Journalism.
 *
 * Copyright (c) 2013 The Regents of the University of California
 * Released under the GPL Version 2 license
 * http://www.opensource.org/licenses/gpl-2.0.php
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */


$('#num_search_show').css('display', 'none');

widget_num_search = "";

function widget_num_include() {
	if ($('#widget_num_filter').is(':checked', true)) {
		widget_num_search = "<p><label for='range_num'>NUM_SEARCH  </label><select name='sheet_op' id='sheet_op' style='padding-right:10px;><option value='>='>Greater than or equal to</option><option value='<='>Less than or equal to</option><option value='>'>Greater than</option><option value='<'>Less than</option><option value='='>Equals</option></select><input id='range_num' value='Enter a number'></p>";
	} else {
		widget_num_search = "";
	}
}

function toggleStatus() {
	if ($('#widget_num_filter').is(':checked', true)) {
		$('#num_search_show').css('display', 'block');
	} else {
		$('#num_search_show').css('display', 'none');
	}
}

function clear_num_widget() {
	widget_num_include();
	toggleStatus();
}

function displayYes() {
	document.getElementById("chart_decision_msg").innerHTML = 'Please select one of the available chart types:';
	document.getElementById("select_chart").style.display = 'block';
}


chart_legend = "'none'"

function use_chart_legend() {
	if ($('#legend').is(':checked', true)) {
		chart_legend = "{position: 'top', textStyle: {color: '#3F3F3F', fontSize: 12}}";
	} else if ($('#legend').is(':checked', false)) {
		chart_legend = "'none'";
	}
}

chart_val = '';
chart_bind = '';
chart_div = '';

function displayResult(chart_type) {
	document.getElementById("chart_globals").style.display = 'block';
	document.getElementById("pick_bar").style.display = 'none';
	document.getElementById("pick_bubble").style.display = 'none';
	// document.getElementById("pick_column").style.display = 'none';
	// document.getElementById("pick_scatter").style.display = 'none';
	// document.getElementById("pick_treemap").style.display = 'none';
	disp_inst = document.getElementById("result").value = chart_type;
	document.getElementById(disp_inst).style.display = 'block';
	if (disp_inst == 'pick_bar') {
		document.getElementById("chart_decision_msg").innerHTML = "A bar chart is best when you don't have a lot of data. TIP: Sort your spreadsheet from high to low.";
		chart_val = "var chart = new google.visualization.ChartWrapper({'chartType': 'BarChart','containerId': 'chart_div','options': {'hAxis': {'minValue': 0, baselineColor:'#bbb', textStyle: {color: '#bbb', fontSize: 11}}, 'title': 'CHART_TITLE (click bars for details)','titleTextStyle': {color: '#3F3F3F', fontSize: 14}, 'legend': CHART_LEGEND, 'chartArea': {width:'100%', height:'75%'}, 'colors': ['#bbb']}, 'view': {'columns': [BAR_LABEL_COL, BAR_DATA_COL]} });"
		chart_bind = ", chart";
		chart_div = "<div id='chart_div' class='control' style='height: CHART_HEIGHTpx; width: 100%;'><p style='font-size:1.3em;color:#772327;text-align:center !important;padding:60px 0 20px'>Fetching data... Thank you for waiting. </p> <p style='color:#3F3F3F;text-align:center !important;padding:20px 0'>Searches with a large number of results may take longer to load.</p></div>";
	} else if (disp_inst == 'pick_bubble') {
		document.getElementById("chart_decision_msg").innerHTML = 'Bubble charts excel at making sense of larger data sets and require five columns to work correctly.';
		chart_val = "var chart = new google.visualization.ChartWrapper({'chartType': 'BubbleChart','containerId': 'chart_div','options': {'bubble': {'opacity':0.4, 'stroke':'none', 'textStyle':{'color':'none'}}, 'vAxes':[{'titleTextStyle':{'color':'#858585','italic':true,'fontSize':12},'baselineColor':'#aaa', 'gridlineColor':'#eee','title':'CHART_YLABEL','textStyle': {'color': '#bbb', 'fontSize': 11}}],'hAxis':{'titleTextStyle':{'color':'#858585','italic':true,'fontSize':12},'baselineColor':'#aaa', 'gridlineColor':'#eee','title':'CHART_XLABEL','textStyle': {'color': '#bbb', 'fontSize': 11}}, 'title': 'CHART_TITLE (click bubbles for details)','titleTextStyle': {color: '#3F3F3F', fontSize: 14}, 'legend': CHART_LEGEND, 'chartArea': {width:'80%', height:'75%'}, 'colors': ['#aaa','#CCCA9E','#9FB7CC','#CCB49E','#9EA0CC','#B49ECC','#CA9ECC','#9ECCCA','#7699B7','#537A9D','#CC9EB7','#9ECCB4','#9D7553','#B79476','#CC9EA0','#A0CC9E','#B7CC9E']}, 'view': {'columns': [BUBBLE_LABEL_COL, BUBBLE_DATA_X, BUBBLE_DATA_Y, BUBBLE_CAT, BUBBLE_SIZE]} });"
		chart_bind = ", chart";
		chart_div = "<div id='chart_div' class='control' style='height: CHART_HEIGHTpx; width: TABLE_WIDTHpx;'><p style='font-size:1.3em;color:#772327;text-align:center !important;padding:60px 0 20px'>Fetching data... Thank you for waiting. </p> <p style='color:#3F3F3F;text-align:center !important;padding:20px 0'>Searches with a large number of results may take longer to load.</p></div>";
	} else {
		chart_bar_val = "";
		chart_bind = "";
		chart_div = "";
	}
}

control1_val = "new google.visualization.ControlWrapper({'controlType': 'CONTROL1_TYPE','containerId': 'control1','options': {'filterColumnLabel': 'CONTROL1_COL', 'matchType':'any', 'ui': {'label':'CONTROL1_LABEL', 'cssClass' : 'custom-stringfilter', 'allowMultiple': false,'allowTyping': false}}})";

$('#pick_control2').css('display', 'none'); // delete this
control2_val = "";
control2_bind = "";
control2_div = "";

function clear_control2_func() {
	if ($('#clear_control2').is(':checked', true)) {
		control2_val = "var control2_use = new google.visualization.ControlWrapper({'controlType': 'CONTROL2_TYPE','containerId': 'control2','options': {'filterColumnLabel': 'CONTROL2_COL', 'matchType':'any', 'ui': {'label':'CONTROL2_LABEL','cssClass' : 'custom-stringfilter', 'allowMultiple': false,'allowTyping': false}}});";
		control2_bind = ", control2_use";
		control2_div = "<div id='control2' class='control'></div>";
	} else {
		control2_val = "";
		control2_bind = "";
		control2_div = "";
	}
}

function toggleControl2() {
	if ($('#clear_control2').is(':checked', true)) {
		$('#pick_control2').css('display', 'block');
		$('#pick_control3').css('display', 'none');
		$('#show_cont3').css('display', 'block');
	} else {
		$('#pick_control2').css('display', 'none');
		$('#show_cont3').css('display', 'none');

	}
}

function set_control2() {
	clear_control2_func();
	toggleControl2();
}


control3_val = "";
control3_bind = "";
control3_div = "";

function clear_control3_func() {
	if ($('#clear_control3').is(':checked', true)) {
		control3_val = "var control3_use = new google.visualization.ControlWrapper({'controlType': 'CONTROL3_TYPE','containerId': 'control3','options': {'filterColumnLabel': 'CONTROL3_COL', 'matchType':'any', 'ui': {'label':'CONTROL3_LABEL','cssClass' : 'custom-stringfilter', 'allowMultiple': false,'allowTyping': false}}});";
		control3_bind = ", control3_use";
		control3_div = "<div id='control3' class='control'></div>";
	} else {
		control3_val = "";
		control3_bind = "";
		control3_div = "";
	}
}

function toggleControl3() {
	if ($('#clear_control3').is(':checked', true)) {
		$('#pick_control3').css('display', 'block');
	} else {
		$('#pick_control3').css('display', 'none');
	}
}

function set_control3() {
	clear_control3_func();
	toggleControl3();
}

function test_id() {
	document.getElementById('sheet_id_field').value = '0AtP_YtDJ532RdDR5eUcxV1dtQTllYTFIS0k0T3lwMnc';
}

var PopUpObj;

function popUp(url) {
	PopUpObj = window.open(url, "Popup", "toolbar=no,scrollbars=no,location=no" + ",statusbar=no,menubar=no,resizable=0,width=800," + "height=600,left = 490,top = 262");
	PopUpObj.focus();
}

function preview_pop() {
	popUp('templates/preview.html')
}


function downloadTable() {
	uriContent = "data:application/octet-stream," + encodeURIComponent(document.getElementById('widget_embed_text').value);
	location.href = uriContent;
};



$.extend({
	getUrlVars: function() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});


// In-wizard functions
// Populate any known parameters from URL
var spreadsheet_id = $.getUrlVar('sid');
$('input[id=sheet_id_field]').val(spreadsheet_id);

// Initially hide the loading spinners, then toggle on as needed
$('#sidtest_spinner').hide();
$('#colfetch_spinner').hide();

// Test SID for validity - throws an alert if SID is inaccessible. 
$('input[id=sidtest]').click(function() {
	$('#sidtest_spinner').show();
	var testsid = $('input[id=sheet_id_field]').val();
	validateTable(testsid);
});

// Populate sets of original column checkboxes 


function populateColCells(orig_cols) {
	$.each(orig_cols, function(column, value) {
		$("tr#colnames").append('<td class="td_pick_cols">' + value.label + '</td>');
	});
}

function populateColIDCells(orig_cols) {
	$.each(orig_cols, function(column, value) {
		$("tr#colids").append('<td><input type="checkbox" name="cols_use" value="' + column + '" /></td>');
	});
}


// Dropdown lists of columns appear at several places in the wizard, populated either with
// the original list of columns or a subset. This function populates them as needed. 
// Takes an object of column data to use and a CSS selector as args.  

function populateDropDown(cols_ob, selector) {
	$(selector).empty(); // Erase children first to prevent duplicate entries when they hit prev/next
	$.each(cols_ob, function(column, value) {
		$(selector).append('<option value="' + value.label + '">' + value.label + '</option>');
	});
}

// For reverse lookups, retrieves a column ID (e.g. "B")
// from "columns" object, given a column label.    

function getColIdFromLabel(labelstring) {
	var matchcol = "undefined";
	$.each(columns, function(key, value) {
		if (value.label.toString() == labelstring) {
			matchcol = key;
		};
	});

	return matchcol;
};

// Generate array from selected values in columns object
var flatCols = [];

function flattenColumns() {
	for (var i in orig_cols) {
		var e = [];
		e = orig_cols[i];
		flatCols.push(e);
	}
};

var flatColsSub = [];

function flattenColumnsSubset() {
	for (var i in columns) {
		var e = [];
		e = columns[i];
		flatColsSub.push(e);
	} //e = {}
	console.log(flatColsSub)
};

// For reverse lookups, retrieves a Index ID (e.g. "0")

function getColIndexFromLabel(labelstring) {
	var matchcol = "undefined";
	$.each(flatCols, function(index, value) {
		if (value.label.toString() == labelstring) {
			matchcol = index;
		};
	});
	return matchcol;
};

function getColIndexFromLabelLab(labelstring) {
	var matchcol = "undefined";
	$.each(flatColsSub, function(index, value) {
		if (value.label.toString() == labelstring) {
			matchcol = index;
		};
	});
	return matchcol;
};

function pseudoMinify(s) {
	// Convert our "template" code into embed code 
	// Gotcha - URLs contain // just like comments so removing comments
	// will also break URLs. Should be a better way to do this,
	// but for now, replacing http:// with httpZZZ and then back again at the end.
	s = s.replace(/https:\/\//gi, 'httpsZZZ'); // Preserve URLs cheap trick
	s = s.replace(/http:\/\//gi, 'httpZZZ'); // Preserve URLs cheap trick        
	s = s.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, ''); // Remove Javascript comments
	s = s.replace(/\n /, "\n"); // Remove spaces after linebreaks
	s = s.replace(/\s+/g, " "); // Replace double spaces with single
	s = s.replace(/(\r\n|\n|\r)/gm, ""); // Remove all possible linebreak types (flatten)   
	// Reverse the URL preservation cheap trick
	s = s.replace(/httpsZZZ/gi, 'https://'); // Preserve URLs cheap trick
	s = s.replace(/httpZZZ/gi, 'http://'); // Preserve URLs cheap trick
	return s;
}


// Warn if user tries to select more than five columns

function limitCols() {
	$('input[name=cols_use]').click(function() {
		selected = $('input[name="cols_use"]').filter(':checked').length;
		if (selected > 5) {
			$('#wizard').smartWizard('showMessage', 'You have selected more than five columns. Are you sure you need all of them?');
		} else {
			$('div.msgBox').hide();
		}
	});
}


// Validate spreadsheet ID step #1 (similar to getTableMeta)

function validateTable(spreadsheet_id, response) {
	var query = new google.visualization.Query('https://spreadsheets.google.com/a/google.com/tq?key=' + spreadsheet_id);
	query.send(validateQueryResponse);
}

// Validate spreadsheet ID step #2 (similar to handleQueryResponse but without all the extra processing)

function validateQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + '. Please click Previous and enter a different spreadsheet ID.');
	} else {
		alert('Spreadsheet is valid and accessible!');
	}
	// Turn off the spinner after tests.
	$('#sidtest_spinner').hide();
}

// Get table metadata from Google

function getTableMeta(spreadsheet_id, response) {

	// ------------ Load data from google docs ----------------
	var query = new google.visualization.Query('https://spreadsheets.google.com/a/google.com/tq?key=' + spreadsheet_id); //+'&tq=limit%201'
	query.send(handleQueryResponse);
}

var orig_cols = {}

function handleQueryResponse(response) {
	// Validation removed - we should always be working with a valid spreadsheet at this point.
	var data = response.getDataTable();
	var colNum = data.getNumberOfColumns();
	var rowNum = data.getNumberOfRows();
	var col_labels = [];
	var col_ids = [];

	for (var i = 0; i < data.getNumberOfColumns(); i++) {
		propertyName = data.getColumnLabel(i).split(' ').join(' ');
		col_labels[i] = propertyName;
	};

	for (var col = 0; col < data.getNumberOfColumns(); col++) {
		propertyId = data.getColumnId(col).split(' ').join(' ');
		orig_cols[col_ids[col] = propertyId] = {
			label: col_labels[col]
		};
	}

	// alert(col_ids);
	// Populate original column cells with returned data
	// Make sure user doesn't select more than n columns
	populateColCells(orig_cols);
	populateColIDCells(orig_cols);
	limitCols();


	// Example: How to iterate through cols array:
	// for(var col_id in orig_cols) {
	//  var label = orig_cols[col_id].label;
	//  console.log(col_id,label);
	// }  
	// Turn off the spinner after data is loaded
	$('#colfetch_spinner').hide();
};


