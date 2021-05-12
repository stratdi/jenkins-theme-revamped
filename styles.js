var navButton = `
<div id="nav-button">
    <div id="nav-button-img" />
</div>
`;

jQuery( document ).ready(function() {
	initTheme();
	darkThemeSwitch();
	navToggler();
	pipelineSpanFix();
	iconSizeCalc();
	hideTrendProject();
});

function navToggler() {
	jQuery('#header').prepend(navButton);
	jQuery('#nav-button').click(function() {
		if (jQuery('#side-panel').attr('style') == null) {
			navHide();
			localStorage.setItem('side-panel', 'hidden');
		} else {
			jQuery('#side-panel').removeAttr('style');
			jQuery('#tasks').removeAttr('style');
			jQuery('.breadcrumbs__wrapper').removeAttr('style');
			localStorage.removeItem('side-panel');
		}
	});
	const sidePanel = localStorage.getItem('side-panel') ? true : false;
	if (sidePanel) {
		jQuery("#nav-button").click();
	}
}

function navHide() {
	jQuery('#side-panel').attr('style', 'width: 80px !important; overflow:hidden; padding-right: 6px');
	jQuery('#tasks').attr('style', 'height: 100vh !important');
	jQuery('.breadcrumbs__wrapper').attr('style', 'margin-left: -160px !important');
	jQuery("#side-panel").animate({ scrollTop: 0 }, "fast");
}

/* toggle */
var themeSwitch = `
<div id="switch" class="switch">
    <span id="switch-img" />
</div>
`;

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function initTheme() {
	if (localStorage.getItem('theme') === 'dark') {
		setTheme('dark');
	}
}

function toggleTheme() {
	if (localStorage.getItem('theme') === 'dark') {
		setTheme('light');
		//document.getElementById('slider').checked = false;
	} else {
		setTheme('dark');
		//document.getElementById('slider').checked = true;
	}
}

function darkThemeSwitch() {
	jQuery(".login.page-header__hyperlinks").prepend(themeSwitch);
	jQuery("#switch").on('click', function(){
		toggleTheme();
		return false;
	});
	if (localStorage.getItem('theme') === 'dark') {
		setTheme('dark');
        //document.getElementById('slider').checked = true;
    } else {
		setTheme('light');
        //document.getElementById('slider').checked = false;
	}
}

function pipelineSpanFix() {
	jQuery("span:contains('Pipeline')").addClass("task-link-text");
}

/* icon size */
const iconSize = { 'S':'16', 'M':'24', 'L':'32'};
const sizes = ['S', 'M', 'L'];

function iconSizeCalc() {
	let currentNot = jQuery("a[href*='/iconSize']").text().toArray();
	let current = sizes.filter(x => !currentNot.includes(x));
	let size = iconSize[current];

	jQuery(".dashboard img").addClass("icon-"+current);

	// Fix build dashboard
	jQuery(".dashboard .icon-clock").attr("style","");
}

/* trend button */
function hideTrendProject() {
	if (jQuery(".test-trend-caption").length > 0) {
		jQuery("#main-panel div[style='float:right'] *").hide();
	}
}