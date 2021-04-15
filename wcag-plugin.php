<?php
   /*
   Plugin Name: WCAG Plugin
   Plugin URI: 
   description: A plugin to help people with disabilities to browse the web.
   Version: 1.1
   Author: Edgaras Puško
   Author URI: 
   License: GPL2
   */

  // IMPORTANT: Do not forget to add ACF Field
  // You can find at the bottom of the file, commented out.
  



  function add_theme_scripts() {
    wp_enqueue_style( 'style', plugin_dir_url( __FILE__ ).'style.css' );
    
    wp_enqueue_script( 'userpanel_and_attributes', plugin_dir_url( __FILE__ ). 'userpanel_and_attributes.js', array ( 'jquery' ));
	wp_enqueue_script( 'custom', plugin_dir_url( __FILE__ ). 'custom.js', array ( 'jquery' ));
	
	//wp_enqueue_script('jquery-cdm', 'https://code.jquery.com/jquery-3.2.1.min.js');
	wp_enqueue_script('jquery-aws', 'https://sdk.amazonaws.com/js/aws-sdk-2.735.0.min.js');
  
	wp_localize_script( 'custom', 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

    $script_params = array(
        'Option_1' => get_option('wcag_option_1'),
        'Option_2' => get_option('wcag_option_2'),
        'Option_3' => get_option('wcag_option_3'),
        'Option_4' => get_option('wcag_option_4'),
        'Option_5' => get_option('wcag_option_5'),
        'Option_6' => get_option('wcag_option_6'),
        'Option_7' => get_option('wcag_option_7'),
        'Option_8' => get_option('wcag_option_8'),
    );
    wp_localize_script( 'userpanel_and_attributes', 'scriptParams', $script_params );
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

//require_once(__DIR__.'\polly_ajax.php');
// Dictionary/Explanation functionalities down here.
add_action( 'init', 'create_exp_post_type' );

  function create_exp_post_type() {
 										
	register_post_type( 'explanation',
		array(
			'labels' => array(
				'name' => __( 'Explanations' ),
                'singular_name' => __( 'Explanation' ),
                'add_new' => __( 'Add Explanation entry'),
                'add_new_item' => __( 'New Explanation entry'),
                'edit_item' => __( 'Edit Explanation entry'),
                'view_item' => __( 'View Explanation entry'),
                'view_items' => __( 'View Explanation entries'),
                'search_items' => __( 'Search Explanations'),
                'not_found' => __( 'Explanation library is empty.'),
                'not_found_in_trash' => __( 'No Explanation entries found in trash.'),
                'all_items' => __( 'All Explanation entries'),
                'archives' => __( 'Explanation Archives'),
                'attributes' => __( 'Explanation Attributes'),
                'filter_items_list' => __( 'Filter Explanations'),
                'items_list_navigation' => __( 'Explanations navigation'),
                'items_list' => __( 'Explanations list'),
                'item_published' => __( 'Explanation published.'),
                'item_published_privately' => __( 'Explanation published privately.'),
                'item_reverted_to_draft' => __( 'Explanation entry reverted to draft.'),
                'item_scheduled' => __( 'Explanation entry scheduled.'),
                'item_updated' => __( 'Explanation entry updated.'),
			),
			'public' => true,
			'has_archive' => false,
			'rewrite' => array('slug' => 'explanations'),
            'show_in_rest' => false,
            'publicly_queryable'  => false
		)
	);
}

add_action( 'admin_init', 'explanations_json_setting' );

function explanations_json_setting() 
{
    register_setting( 
        'general', 
        'json_string'
    );
    
    add_settings_field( 
        'json_string', 
        'JSON', 
        'json_print_text', 
        'general'   
    );
}  
// Remove after testing.
function json_print_text() 
{
		$the_guides = html_entity_decode( get_option( 'json_string' ) );
		echo wp_editor( 
			$the_guides, 
			'json-explanations', 
			array( 'textarea_name' => 'json_string' ) 
		);
}
  
  //This function is not needed anymore but keeping it just in case.
function check_word($arr, $word){
    foreach ($arr as $entry){
        if(preg_grep("/".$word."\s./", $entry['title'])){
            return true;
        }
    }
    return false;
}



add_action('save_post_explanation', 'on_save_exp_post',10,3);

function on_save_exp_post() {

	$final_arr=[];	
	$post_arr=get_posts(array('post_type' => 'explanation','numberposts'=>-1));
	foreach($post_arr as $key){   
        if(!($key->post_title)){
            continue;
        }
        $title = strip_tags(html_entity_decode($key->post_title));	
        $content = strip_tags(html_entity_decode($key->post_content));  
        $title = mb_strtolower($title, 'UTF-8');
       		
         
        $titles_arr=[$title];
        if(is_plugin_active('\advanced-custom-fields-pro\acf.php')){
            if (is_array($synonyms)){
                $synonyms = get_field('synonyms', $key->ID);
                foreach ($synonyms as $inner_array){ 	
                    foreach($inner_array as $synonym_name){
                        if(!$synonym_name){
                        continue;
                        }
                        $synonym_name = strip_tags(html_entity_decode($synonym_name));
                        $synonym_name = mb_strtolower($synonym_name, 'UTF-8');
                        array_push($titles_arr, $synonym_name);
                    }
                }
            }
        }
        $combined_arr = Array ( 'title' => $titles_arr, 'content' => $content);
        array_push($final_arr, $combined_arr);
    }	
    foreach($final_arr as $key=>$entry){
         usort($entry['title'], function($a, $b) {
            return strlen($b) <=> strlen($a);
        });
        $final_arr[$key]['title'] = $entry['title'];
    }
    usort($final_arr, function($a, $b){
        return strlen($b['title'][0]) <=> strlen($a['title'][0]);
    });
    $json_string = json_encode($final_arr);			
    update_option('json_string', $json_string);	
 }

add_filter( 'the_content', 'enable_explanations', 1 );


function enable_explanations($html){
	if ( is_singular() ) {
		$html_t = strip_tags(html_entity_decode($html)); // Drawback: Different sections text is equalized.
       // $html_t = preg_replace('/(?![åøæ])\W+/i', " ", $html_t); //Problem - Negative lookahed in regex doesn't seem to catch danish letters.
                                                                 //Therefore, if a word starts with danish letter let's say æbler its gonna cut it to bler
                                                                 //I need it to use \W here because of ??? I don't remember 
        $html_t = preg_replace('/\s/i', " ", $html_t);
        $html_arr_last_arr = preg_split('/ /', $html_t, -1 ,PREG_SPLIT_NO_EMPTY);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr_three_0);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr_two_0);

        $html_t = preg_replace("/".$html_arr_last_arr[0]."\s/", "", $html_t);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_four_1);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr_three_1);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr_two_1);

        $html_t = preg_replace("/".$html_arr_last_arr[1]."\s/", "", $html_t);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_four_2);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_arr_three_2);

        $html_t = preg_replace("/".$html_arr_last_arr[2]."\s/", "", $html_t);
        preg_match_all('/[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+\s+[\wæøå]+/i', $html_t, $html_four_3);

        $html_arr = array_merge($html_arr[0], $html_four_1[0], $html_four_2[0], $html_four_3[0], $html_arr_three_0[0], $html_arr_three_1[0], $html_arr_three_2[0], $html_arr_two_0[0], $html_arr_two_1[0], $html_arr_last_arr);
        $json_arr = get_option('json_string');
		$json_arr = json_decode($json_arr, true, 512,  JSON_UNESCAPED_UNICODE); 		
		$result_arr=[];
        $context_arr=[];
        $html_arr = array_unique($html_arr); 
        foreach($html_arr as $key => $value ){
            $html_arr[$key] = mb_strtolower($value, 'UTF-8');
        };
       
		foreach($json_arr as $entry){   
			if( $found = (array_intersect($entry['title'], $html_arr)) ){
				$count = count($found);
				$found_context = array_fill(0, $count, $entry['content']);
				$context_arr = array_merge($context_arr, $found_context);
				$result_arr = array_merge($result_arr, $found);
			}
        }	
        //unsetting single/double/tripple records if they are a part of longer record
        foreach($result_arr as $key => $value){
           if(preg_grep("/.".$value."/", $result_arr)||preg_grep("/".$value."./", $result_arr)){
                unset($result_arr[$key]);
            }
        }
		foreach($result_arr as $key){ 
        
			$word_lenght = strlen($key); 																
			$offset=0;		
            //$regex = "/\b".$key."\W/i"; //this version cannot find words that start with danish letters
            $regex = "/".$key."\W/i";   //this regex will potentially cause conflict if theres a 1word2word 
			//remake with preg_match_all
			while(preg_match($regex, $html, $found, PREG_OFFSET_CAPTURE,  $offset)){	
                $position = $found[0][1];
				$html = substr_replace($html, "<span class='found-in-explanation'><span class='found-in-explanation--inner'>", $position, 0); 			
				$html = substr_replace($html, "</span></span>", $position+$word_lenght+77, 0);
				$offset = $position+$word_lenght+91;
            }
        }
        $json_out_array = array_combine($result_arr, $context_arr);	
        $json_string = json_encode($json_out_array);

        $html.='<script>var explanation_words = '.$json_string.'</script>';
		return $html;
	}
}







//add_action('save_post_page', 'on_webpost_save2',10,3);
add_filter( 'wp_insert_post_data' , 'on_webpost_save2' , '99', 3 );

function on_webpost_save2( $post, $update) {
    
   if($post['post_type']=='page'){
      
       //'wp-block-search__button\"' => 'wp-block-search__button\" role=\"submit search query\"',
  
    $keywords = array(
        'wp-block-button__link\"' => 'wp-block-button__link\" role=\"button\"',
        'download=\"\"' => 'download=\"\" role=\"button\"',
        'wp-block-archives-list\"' => 'wp-block-archives-list\" aria-label=\"List of Links to archives\"'
    );

     $cont = $post['post_content'];
     foreach($keywords as $key => $word){
         $cont = str_replace($key, $word, $cont);
     }
     $post['post_content'] = $cont;
     
    }
    return $post;
}

function wpb_widgets_init() {
 
    register_sidebar( array(
        'name'          => 'wcag-widget-area-top',
        'id'            => 'wcag-widget-area-top',
        'before_widget' => '<div class="chw-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="chw-title">',
        'after_title'   => '</h2>',
    ) );
    register_sidebar( array(
        'name'          => 'wcag-widget-area-bottom',
        'id'            => 'wcag-widget-area-bottom',
        'before_widget' => '<div class="chw-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="chw-title">',
        'after_title'   => '</h2>',
    ) );
 
}
add_action( 'widgets_init', 'wpb_widgets_init' );


class Wcag_panel_widget extends WP_Widget {

    public function __construct(){
        $widget_ops = array( 
            'classname' => 'wcag_panel_widget',
            'description' => 'WCAG Panel for Enabling Accessibility on the Page',
        );
        parent::__construct( 'wcag_panel_widget', 'WCAG Panel', $widget_ops );
    }
    public function widget( $args, $instance ) {
        if(get_option('wcag_option_1')=='on'){
        echo 
            "<button class='enable-wcag' tabindex='1' style='z-index: 40;position: absolute;'>Enable Accessibility
            </button>";
            if(get_option('wcag_option_2')=='on'){
            echo
                "<div class='WCAG-panel disabled' tabindex='1'>
                    <div class='text-scaler option'> 
                        <span class='text-scaler-name option-name' tabindex='1'>Change size of font.
                        </span>
                        <div class='text-scaler-block option-block'>
                            <span class='text-scaler-minus option-minus' tabindex='1'>-
                            </span>
                            <span class='text-scaler-size option-size' data-size='100' tabindex='1'>100%
                            </span>
                            <span class='text-scaler-plus option-plus' tabindex='1'>+
                            </span>
                            <div class='text-scaler-style' style='display:none;'>
                                <style>main {--text-scaler: 1;}
                                </style>
                            </div>
                        </div>
                    </div>";
            }
            if(get_option('wcag_option_3')=='on'){
            echo
                "<div class='btn-scaler option'> 
                    <span class='btn-scaler-name option-name' tabindex='1'>Change size of buttons.
                    </span>
                    <div class='btn-scaler-block option-block'>
                        <span class='btn-scaler-minus option-minus' tabindex='1' >-
                        </span>
                        <span class='btn-scaler-size option-size' data-size='100' tabindex='1' >100%
                        </span>
                        <span class='btn-scaler-plus option-plus' tabindex='1' >+
                        </span>
                        <div class='btn-scaler-style' style='display:none;'>
                            <style>main {--btn-scaler: 1;}
                            </style>
                        </div>
                    </div>
                </div>";
            }
            if(get_option('wcag_option_4')=='on'){
            echo
                "<div class='colorblind option'> 
                    <span class='option-name' tabindex='1' >Colorblind options
                    </span>
                    <div class='option-block'>
                        <button class='colorblind-mode-1' tabindex='1' >Turn on grayscale mode
                        </button>
                        <button class='colorblind-mode-2' tabindex='1' >Turn on high contrast mode
                        </button>
                    </div>
                </div>";
            }
            if(get_option('wcag_option_5')=='on'){
            echo
                "<div class='animations option'> 
                    <span class='option-name' tabindex='1'>Turn off animations
                    </span>
                    <div class='option-block'>
                        <button class='animations-off' tabindex='1'>Turn off animations
                        </button>
                    </div>
                </div>";
            }
            if(get_option('wcag_option_6')=='on'){
            echo
                "<div class='explanation option'> 
                    <span class='option-name' tabindex='1'>Enable Word explanations
                    </span>
                    <div class='option-block'>
                        <button class='highlight-btn' tabindex='1'>Enable word explanations
                        </button>
                    </div>
                </div>";
            }
            if(get_option('wcag_option_7')=='on'){
            echo
                "<div class='reader option'> 
                    <span class='option-name' tabindex='1'>Enable Reader
                    </span>
                    <div class='option-block'>
                        <button class='speech-btn' tabindex='1'>Enable word reader
                        </button>
                    </div>
                </div>";
            }
        echo 
        "</div>";
        }
    }   

}
add_action('widgets_init', create_function('', 'return register_widget("wcag_panel_widget");'));

add_action('update_option_wcag_option_9', function($old_value, $value, $option){
    if( $old_value !== $value ){
        destroy_widget_in_sidebar( 'wcag-widget-area-'.$old_value);
        insert_widget_in_sidebar( 'wcag_panel_widget', '', 'wcag-widget-area-'.$value);
    }

}, 10, 3 );


require_once( dirname( __FILE__ ) . '/settings.php' );

register_activation_hook( __FILE__, 'my_plugin_activate' );
function my_plugin_activate(){
    require_once( dirname( __FILE__ ) . '/initialiseplugin.php' );
}


register_deactivation_hook( __FILE__, 'my_plugin_deactivate' );
function my_plugin_deactivate(){
    require_once( dirname( __FILE__ ) . '/deactivateplugin.php' );
}


// function insert_widget_in_sidebar( $widget_id, $widget_data, $sidebar ) {
// 	// Retrieve sidebars, widgets and their instances
// 	$sidebars_widgets = get_option( 'sidebars_widgets', array() );
// 	$widget_instances = get_option( 'widget_' . $widget_id, array() );
 
   
// 	// Retrieve the key of the next widget instance
// 	$numeric_keys = array_filter( array_keys( $widget_instances ), 'is_int' );
// 	$next_key = $numeric_keys ? max( $numeric_keys ) + 1 : 2;

// 	// Add this widget to the sidebar
// 	if ( ! isset( $sidebars_widgets[ $sidebar ] ) ) {
// 		$sidebars_widgets[ $sidebar ] = array();
// 	}
//     $sidebars_widgets[ $sidebar ][] = $widget_id . '-' . $next_key;


// 	// Add the new widget instance
// 	$widget_instances[ $next_key ] = $widget_data;

// 	// Store updated sidebars, widgets and their instances
// 	update_option( 'sidebars_widgets', $sidebars_widgets );
// 	update_option( 'widget_' . $widget_id, $widget_instances );
// }

// function destroy_widget_in_sidebar( $sidebar ) {
// 	// Retrieve sidebars, widgets and their instances
// 	$sidebars_widgets = get_option( 'sidebars_widgets', array() );

// 	$sidebars_widgets[$sidebar]=[];

// 	// Store updated sidebars, widgets and their instances
// 	update_option( 'sidebars_widgets', $sidebars_widgets );
// }

?>