/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	ACCOUNT_RECOVERY_RESET_REQUEST,
	ACCOUNT_RECOVERY_RESET_REQUEST_SUCCESS,
	ACCOUNT_RECOVERY_RESET_REQUEST_ERROR,
	ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA,
} from 'state/action-types';

const TARGET_RESET_OPTIONS = 'resetOptions';

export const fetchResetOptionsSuccess = ( items ) => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_SUCCESS,
	target: TARGET_RESET_OPTIONS,
	items,
} );

export const fetchResetOptionsError = ( error ) => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_ERROR,
	target: TARGET_RESET_OPTIONS,
	error,
} );

const fromApi = ( data ) => ( [
	{
		email: data.primary_email,
		sms: data.primary_sms,
	},
	{
		email: data.secondary_email,
		sms: data.secondary_sms,
	},
] );

export const fetchResetOptions = ( userData ) => ( dispatch ) => {
	dispatch( {
		type: ACCOUNT_RECOVERY_RESET_REQUEST,
		target: TARGET_RESET_OPTIONS,
	} );

	return wpcom.req.get( {
		body: userData,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/lookup',
	} ).then( data => dispatch( fetchResetOptionsSuccess( fromApi( data ) ) ) )
	.catch( error => dispatch( fetchResetOptionsError( error ) ) );
};

export const fetchResetOptionsByLogin = ( user ) => fetchResetOptions( { user } );

export const fetchResetOptionsByNameAndUrl = ( firstname, lastname, url ) => fetchResetOptions( { firstname, lastname, url } );

export const updatePasswordResetUserData = ( userData ) => ( {
	type: ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA,
	userData,
} );

const TARGET_RESET_REQUEST = 'resetRequest';

export const requestPasswordResetSuccess = () => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_SUCCESS,
	target: TARGET_RESET_REQUEST,
} );

export const requestPasswordResetError = ( error ) => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_ERROR,
	target: TARGET_RESET_REQUEST,
	error,
} );

export const requestPasswordReset = ( request ) => ( dispatch ) => {
	dispatch( {
		type: ACCOUNT_RECOVERY_RESET_REQUEST,
		target: TARGET_RESET_REQUEST,
	} );

	return wpcom.req.post( {
		body: request,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/request-reset',
	} ).then( () => dispatch( requestPasswordResetSuccess() ) )
	.catch( ( error ) => dispatch( requestPasswordResetError( error ) ) );
};
