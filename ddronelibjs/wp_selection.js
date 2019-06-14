(function($) {
	// var notes = [{x: 0.65, y: 0.9}];
	// var notes = [{x: "0.5", y:"0.2"}, 
	// 			{x: "0.2", y:"0.2"}];
	var notes = [{x: 0.664, y: 0.925}];
	var init_x = 0.664;
	var init_y = 0.925;
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
		var points_ui = [];
		var $export = $("#export");
		$export.on("click", function() {
			points_ui = [];
			var $table1 = $("<table/>").addClass("gridtable");
			$table1.append("<th>X</th><th>Y</th>"); 

			var notes = $img.imgNotes('export');
			$.each(notes, function(index, item) {
				if(index == 0){
					init_x = item.x;
					init_y = item.y;
				}
				var py = -50 * (item.x - init_x);
				var px = -50 * (item.y - init_y);
				var msg = new ROSLIB.Message({
					x:px,
					y:py,
					z:1.5});
				if(index != 0){
					points_ui[index-1] = msg;
					$table1.append("<tr><td>" + px + "</td><td>" + py + "</td><tr>");
				}
					
			});
			$('#waypoints').html($table1);

			// $send.text(PolygonMsg.points[0].x);

		});

		var Polygon_pub = new ROSLIB.Topic({
			ros : ros,
			name : "/points_from_ui",
			messageType : 'geometry_msgs/Polygon'
		});

		var $send = $("#wp_send");
		$send.on("click", function() {
			var PolygonMsg = new ROSLIB.Message({
				points: points_ui
			});
			
			Polygon_pub.publish(PolygonMsg);
			points_ui = [];
			$('#waypoints').html($table1);

			// $send.text(PolygonMsg.points[0].x);
		});

				
		var $clear = $("#clear");
		$clear.on("click", function() {
			$img.imgNotes('clear');
		});
	});
})(jQuery);

