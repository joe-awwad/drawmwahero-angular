import * as jQuery from 'jquery';

export function initDeclarativeToggle() {
    if (jQuery('[data-toggle-target]').length) {
        jQuery('[data-toggle-target]').each((_, toggleBtn) => {
            targetToggle(toggleBtn);
        });
    }
}

// primary toggle function
function targetToggle(toggleBtn) {

    const originalText = jQuery(toggleBtn).text();
    const toggleTarget = jQuery(toggleBtn).attr('data-toggle-target');

    jQuery(toggleBtn).addClass('toggle-btn-visible');
    jQuery(toggleTarget).addClass('toggle-target-hidden');

    // click event
    jQuery(toggleBtn).click(() => {

        // Toggle the button text (for example: Hide instead of Show)
        if (jQuery(toggleBtn).text() === jQuery(toggleBtn).attr('data-toggle-text')) {
            jQuery(toggleBtn).text(originalText);
        } else {
            jQuery(toggleBtn).text(jQuery(toggleBtn).attr('data-toggle-text'));
        }

        // Slide Toggle and then add class and remove inline style
        jQuery(toggleTarget).slideToggle(400, () => {
            jQuery(toggleTarget).toggleClass('toggle-target-expanded').css('display', '');
        });
    });

} // end targetToggle function
