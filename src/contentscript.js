(function() {
	let $document = $(document);

	$document.bind('keydown._tabGroupsExtension', 'ctrl+g', function () {
		alert('show');
		let $body = $("body");

//		var css = [
//			"lib/jquery-ui-1.12.1.custom/jquery-ui.min.css",
//			"lib/jquery-ui-1.12.1.custom/jquery-ui.structure.min.css",
//			"lib/jquery-ui-1.12.1.custom/jquery-ui.min.theme.min.css"
//		];
//		
//		console.log(`css lib count ${css.length}`);
//		for (let i = 0; i < css.length; i++) {
//			console.log("add style css");
//			$body.append(`<style type="text/css" src="moz-extension://893f7924-49a9-47c7-b998-4f2a13433f34/${css[i]}"></script>`);
//		}

		var $dialog = $("<div id='__extension_tabGroups_dialog'><div class='ui-widget'><label for='__extension_tabGroups'> Tags: </label ><input id='__extension_tabGroups'></div></div>");
		$body.append($dialog);

		var availableTags = [
			"ActionScript",
			"AppleScript",
			"Asp",
			"BASIC",
			"C",
			"C++",
			"Clojure",
			"COBOL",
			"ColdFusion",
			"Erlang",
			"Fortran",
			"Groovy",
			"Haskell",
			"Java",
			"JavaScript",
			"Lisp",
			"Perl",
			"PHP",
			"Python",
			"Ruby",
			"Scala",
			"Scheme"
		];
		$("#__extension_tabGroups").autocomplete({
			source: availableTags
		});

		$dialog.dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true
		});
	});

	let unloadHandler = function() {
		$document.off("unload._tabGroupsExtension");
		$document.off("keydown._tabGroupsExtension");
	};
	$document.on("unload._tabGroupsExtension", unloadHandler);
})();