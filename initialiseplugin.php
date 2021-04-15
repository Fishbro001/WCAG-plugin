<?php

    function remake_theme1() {
        $theme = wp_get_theme();
        $textDomain = $theme->get( 'TextDomain' ); // twentyfifteen
        if(strpos($theme->get( 'Name' ), '-WCAG')){
            return;
        }
        $root = get_theme_root( $theme );  
        $root_of_original = $root.'/'.$textDomain;
        $root_new = $root_of_original.'-WCAG';
        if(!is_dir ($root_new)){
            mkdir($root_new); // make a dir
            remake_theme2($root_of_original, $root_new);
            $newname = $theme->get( 'TextDomain' ).'-WCAG';
            switch_theme($newname);
        }
        $newname = $theme->get( 'TextDomain' ).'-WCAG';
        switch_theme($newname);
     }
     function remake_theme2($dir, $root_new){
        $scanned_directory_arr = array_diff(scandir($dir), array('..', '.')); //scanning directory
        foreach($scanned_directory_arr as $file){
            if(is_dir ($dir.'/'.$file)) {
                mkdir($root_new.'/'.$file);
                remake_theme2($dir.'/'.$file, $root_new.'/'.$file);
            }
            else {
                $read = file_get_contents($dir.'/'.$file);
                if($file == 'header.php'){
                    $read = substr_replace(
                    $read, 
                    "<?php dynamic_sidebar( 'wcag-widget-area-top' ); ?>", 
                    strpos($read, '<?php body_class(); ?>>')+23,
                    0);  
                }
                if($file == 'footer.php'){
                    $read = substr_replace(
                    $read, 
                    "<?php dynamic_sidebar( 'wcag-widget-area-bottom' ); ?>", 
                    strpos($read, '<footer id=')    ,
                    0);  
                }
                $handle = fopen($root_new.'/'.$file, 'w');
                fwrite($handle, $read);
                fclose($handle);
            }
    
        }
    }
    remake_theme1();
    

     insert_widget_in_sidebar( 'wcag_panel_widget', '', 'wcag-widget-area-top');
     update_option('wcag_option_1', 'on');
     update_option('wcag_option_2', 'on');
     update_option('wcag_option_3', 'on');
     update_option('wcag_option_4', 'on');
     update_option('wcag_option_5', 'on');
     update_option('wcag_option_6', 'on');
     update_option('wcag_option_7', 'on');
     update_option('wcag_option_8', 'on');
     update_option('wcag_option_9', 'top');



function insert_widget_in_sidebar( $widget_id, $widget_data, $sidebar ) {
	// Retrieve sidebars, widgets and their instances
	$sidebars_widgets = get_option( 'sidebars_widgets', array() );
	$widget_instances = get_option( 'widget_' . $widget_id, array() );
 
   
	// Retrieve the key of the next widget instance
	$numeric_keys = array_filter( array_keys( $widget_instances ), 'is_int' );
	$next_key = $numeric_keys ? max( $numeric_keys ) + 1 : 2;

	// Add this widget to the sidebar
	if ( ! isset( $sidebars_widgets[ $sidebar ] ) ) {
		$sidebars_widgets[ $sidebar ] = array();
	}
    $sidebars_widgets[ $sidebar ][] = $widget_id . '-' . $next_key;


	// Add the new widget instance
	$widget_instances[ $next_key ] = $widget_data;

	// Store updated sidebars, widgets and their instances
	update_option( 'sidebars_widgets', $sidebars_widgets );
	update_option( 'widget_' . $widget_id, $widget_instances );
}
?>