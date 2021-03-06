/**
 * Internal dependencies
 */
import {
	lostPassword,
	forgotUsername,
	resetPassword,
	resetPasswordByTransactionId,
	redirectLoggedIn
} from './controller';
import config from 'config';

export default function( router ) {
	// Main route for account recovery is the lost password page
	if ( config.isEnabled( 'account-recovery' ) ) {
		router( '/account-recovery', redirectLoggedIn, lostPassword );
		router( '/account-recovery/forgot-username', redirectLoggedIn, forgotUsername );
		router( '/account-recovery/reset-password', redirectLoggedIn, resetPassword );
		router( '/account-recovery/reset-password/transaction-id', redirectLoggedIn, resetPasswordByTransactionId );
	}
}
