async function getTabInfo(tabId) {
	return await browser.tabs.get(tabId);
}

async function saveTabStructureMap(map) {
	await browser.storage.local.set({ structure: map });
}

async function getTabStructureMap() {
	let structure = await browser.storage.local.get("structure");
	if (structure) {
		if (structure.structure)
			return structure.structure;
		return structure;
	}
	return new {};
}

async function addTabToStructure(tab) {
	let structure = await getTabStructureMap();
	let dest = structure[tab.windowId] || [];
	dest.push(tab.id);
	console.log(`Tab ${tab.id} pushed to window ${tab.windowId}.`);

	structure[tab.windowId] = dest;

	await saveTabStructureMap(structure);
}

async function removeTabFromStructure(tabId) {
	console.log("removeTabFromStructure called.");

	let structure = await getTabStructureMap();
	console.log(structure);

	for (let windowId in structure) {
		let tabs = structure[windowId] || [];

		let index = tabs.indexOf(tabId);
		if (index >= 0) {
			tabs.splice(index, 1);
			console.log(`${tabId} removed.`);
		}

		structure[windowId] = tabs;
	}

	await saveTabStructureMap(structure);
}

async function addTab(tab) {

	await removeTabFromStructure(tab.id);
	await addTabToStructure(tab);
	let structure = await getTabStructureMap();

	console.log("end of addTab");
	console.log(structure);
}

async function removeTab(tab) {
	await browser.storage.local.clear();
}

async function attachTab(tab) {
}

async function detachTab(tab) {
}

browser.tabs.onRemoved.addListener((tab) => {
	removeTab(tab);
});
browser.tabs.onCreated.addListener((tab) => {
	addTab(tab);
});
browser.tabs.onDetached.addListener((tab) => {
	attachTab(tab);
});
browser.tabs.onAttached.addListener((tab) => {
	detachTab(tab);
});


//omnibox.setDefaultSuggestion()
//Defines the first suggestion that appears in the drop- down when the user enters the keyword for your extension, followed by a space.
//
//	Events
//Edit
//
//omnibox.onInputStarted
//Fired when a the user focuses the address bar and types your extension's omnibox keyword, followed by a space.
//omnibox.onInputChanged
//Fired whenever the user's input changes, after they have focused the address bar and typed your extension's omnibox keyword, followed by a space.
//	omnibox.onInputEntered
//Fired when the user accepts one of your extension's suggestions.
//omnibox.onInputCancelled
//Fired when the user dismisses the address bar drop- down, after they have focused the address bar and typed your extension's omnibox keyword. 