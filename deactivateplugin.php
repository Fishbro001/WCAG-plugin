<?php


function destroy_widget_in_sidebar( $sidebar ) {
	// Retrieve sidebars, widgets and their instances
	$sidebars_widgets = get_option( 'sidebars_widgets', array() );

	$sidebars_widgets[$sidebar]=[];

	// Store updated sidebars, widgets and their instances
	update_option( 'sidebars_widgets', $sidebars_widgets );
}

destroy_widget_in_sidebar( 'wcag-widget-area-top');

?>