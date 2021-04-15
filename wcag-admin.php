<?php settings_errors();?>
<form method="post" action="options.php">
    <?php settings_fields('wcag-settings-group'); ?>
    <?php do_settings_sections('wcag_codemakers');?>
    <?php submit_button();?>
</form>
