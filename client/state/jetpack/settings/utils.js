/**
 * External dependencies
 */
import { forEach, omit } from 'lodash';

/**
 * Normalize settings for use in Redux.
 *
 * @param  {Object}   settings   Raw settings.
 * @return {Object}              Normalized settings.
 */
export const normalizeSettings = ( settings ) => {
	return Object.keys( settings ).reduce( ( memo, key ) => {
		switch ( key ) {
			case 'wp_mobile_excerpt':
			case 'wp_mobile_featured_images':
				memo[ key ] = settings[ key ] === 'enabled';
				break;
			case 'carousel_background_color':
				memo[ key ] = settings [ key ] === '' ? 'black' : settings[ key ];
				break;
			default:
				memo[ key ] = settings[ key ];
		}

		return memo;
	}, {} );
};

/**
 * Sanitize settings for updating in the Jetpack site.
 *
 * @param  {Object}   settings   Settings.
 * @return {Object}              Normalized settings.
 */
export const sanitizeSettings = ( settings ) => {
	return Object.keys( settings ).reduce( ( memo, key ) => {
		switch ( key ) {
			case 'wp_mobile_excerpt':
			case 'wp_mobile_featured_images':
				memo[ key ] = !! settings [ key ] ? 'enabled' : 'disabled';
				break;
			case 'post_by_email_address':
				break;
			default:
				memo[ key ] = settings[ key ];
		}

		return memo;
	}, {} );
};

/**
 * Filter out all settings that belong to inactive modules.
 *
 * @param  {Object}   settings   Settings.
 * @return {Object}              Normalized settings.
 */
export const filterSettingsByActiveModules = ( settings ) => {
	const moduleSettingsList = {
		'infinite-scroll': [
			'infinite_scroll',
			'infinite_scroll_google_analytics',
		],
		minileven: [
			'wp_mobile_excerpt',
			'wp_mobile_featured_images',
			'wp_mobile_app_promos',
		],
		subscriptions: [
			'stb_enabled',
			'stc_enabled',
		],
		likes: [
			'social_notifications_like',
			'social_notifications_reblog',
			'social_notifications_subscribe',
		],
		markdown: [
			'wpcom_publish_comments_with_markdown',
		],
		'after-the-deadline': [
			'onpublish',
			'onupdate',
			'guess_lang',
			'Bias Language',
			'Cliches',
			'Complex Expression',
			'Diacritical Marks',
			'Double Negative',
			'Hidden Verbs',
			'Jargon Language',
			'Passive voice',
			'Phrases to Avoid',
			'Redundant Expression',
			'ignored_phrases',
		],
		'custom-content-types': [
			'jetpack_testimonial',
			'jetpack_portfolio',
		],
		comments: [
			'highlander_comment_form_prompt',
			'jetpack_comment_form_color_scheme'
		],
		carousel: [
			'carousel_background_color',
			'carousel_display_exif'
		]
	};
	let filteredSettings = { ...settings };

	forEach( moduleSettingsList, ( moduleSettings, moduleSlug ) => {
		if ( ! settings[ moduleSlug ] ) {
			filteredSettings = omit( filteredSettings, moduleSettings );
		}
		filteredSettings = omit( filteredSettings, moduleSlug );
	} );

	return filteredSettings;
};
