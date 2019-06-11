
(function($) {
	var notes = [{x: "0.5", y:"0.5"}, 
				{x: "0.2", y:"0.8"}];
	$(window).load(function() {
		var $img = $("#image").imgNotes({
			onEdit: function(ev, elem) {
				var $elem = $(elem);
				$('#NoteDialog').remove();
				return $('<div id="NoteDialog"></div>').dialog({
					title: "Cancel selection?",
					// resizable: false,
					// modal: true,
					// height: "100",
					// width: "100",
					position: { my: "left bottom", at: "right top", of: elem},
					buttons: {
						"Cancel": function() {
							$elem.trigger("remove");
							$(this).dialog("close");
						},
						"Keep": function() {
							$(this).dialog("close");
						}
					},
				});
			}
		});

		$img.imgNotes("import", notes);
		var $toggle = $("#toggleEdit");
		if ($img.imgNotes("option","canEdit")) {
			$toggle.text("View");
		} else {
			$toggle.text("Edit");
		}
		$toggle.on("click", function() {
			var $this = $(this);
			if ($this.text()=="Edit") {
				$this.text("View");
				$img.imgNotes("option", "canEdit", true);
			} else {
				$this.text('Edit');
				$img.imgNotes('option', 'canEdit', false);
			}
		});

		var $export = $("#export");
		$export.on("click", function() {
			var $table = $("<table/>").addClass("gridtable");
			var notes = $img.imgNotes('export');
			$table.append("<th>X</th><th>Y</th>"); 
			$.each(notes, function(index, item) {
				$table.append("<tr><td>" + item.x + "</td><td>" + item.y + "</td><tr>");
			});
			$('#waypoints').html($table);

		});

		var Polygon_pub = new ROSLIB.Topic({
			ros : ros,
			name : "/points_from_ui",
			messageType : 'geometry_msgs/Polygon'
		});
		var points_ui = [];
		var $send = $("#wp_send");
		$send.on("click", function() {
			var notes = $img.imgNotes('export');
			$.each(notes, function(index, item) {
				var msg = new ROSLIB.Message({
					x:item.x,
					y:item.y,
					z:1.5});
				points_ui[index] = msg;
			});
			var PolygonMsg = new ROSLIB.Message({
				points: points_ui
			});
			Polygon_pub.publish(PolygonMsg);
			points_ui = [];
			// $send.text(PolygonMsg.points[0].x);
		});

				
		var $clear = $("#clear");
		$clear.on("click", function() {
			$img.imgNotes('clear');
		});
	});
})(jQuery);

