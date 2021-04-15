<?php
function wcag_options_page_html() {
    
    ?>
    <div class="wrap">
    <?php 
    require_once(__DIR__.'\wcag-admin.php'); ?>
    </div>
    <?php
}
?>
<?php
add_action( 'admin_menu', 'wcag_options_page' );
function wcag_options_page() {
    add_menu_page(
        'WCAG Codemakers Options',
        'WCAG Options',
        'manage_options',
        'wcag_codemakers',
        'wcag_options_page_html',
        plugin_dir_url(__FILE__) . 'images/settings-images.svg',
        25
    );
}

add_action('admin_init', 'wcag_settings_init');
function wcag_settings_init() {

    add_settings_section(
        'wcag-settings-section1-options',
        'WCAG Accessiblity console options', '',
        'wcag_codemakers'
    );

    add_settings_section(
        'wcag-settings-section2-options',
        'WCAG Accessibility console functionalities options', '',
        'wcag_codemakers'
    );

    add_settings_section(
        'wcag-settings-section3-options',
        'WCAG Other options', '',
        'wcag_codemakers'
    );

    register_setting( 'wcag-settings-group', 'wcag_option_1');
    add_settings_field(
        'option1', 
        'Enable Accessibility Console', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section1-options',
        '1'
    );

    register_setting( 'wcag-settings-group', 'wcag_option_2');
    add_settings_field(
        'option2', 
        'Enable font size control', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '2'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_3');
    add_settings_field(
        'option3', 
        'Enable button size control', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '3'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_4');
    add_settings_field(
        'option4', 
        'Enable colorblind filter control', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '4'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_5');
    add_settings_field(
        'option5', 
        'Enable turning off animations option', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '5'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_6');
    add_settings_field(
        'option6', 
        'Enable word explanations button', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '6'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_7');
    add_settings_field(
        'option7', 
        'Enable word reader button', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section2-options',
        '7'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_8');
    add_settings_field(
        'option8', 
        'Enable guessing of images alts', 'option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section3-options',
        '8'
    );
    register_setting( 'wcag-settings-group', 'wcag_option_9');
    add_settings_field(
        'option9', 
        'Placement of WCAG Console', 'dropdown_option_callback', 
        'wcag_codemakers', 
        'wcag-settings-section1-options',
        '9'
    );
}
function wcag_settings_section_callback() {
        echo '<p>Other options</p>';
}
function option_callback($arg){
    $arg = 'wcag_option_'.$arg;
    if(get_option($arg)=='on'){
        echo '<input type="checkbox" id="'.$arg.'" name="'.$arg.'" checked="checked">';
    }
    else {
        echo '<input type="checkbox" id="'.$arg.'" name="'.$arg.'">';
    }

}

function dropdown_option_callback($arg){
    $arg = 'wcag_option_'.$arg;
    if(get_option($arg)=='top'){
        echo '<select name="'.$arg.'" id="'.$arg.'">
                <option value="top" selected>Top</option>
                <option value="bottom">Bottom</option>
              </select>';
    }
    else {
        echo '<select name="'.$arg.'" id="'.$arg.'">
                <option value="top">Top</option>
                <option value="bottom"selected>Bottom</option>
              </select>';
    }

}

?>