/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSelect from 'components/forms/form-select';

export const StartOfWeekOption = ( {
	isRequestingSettings,
	moment,
	onChange,
	startOfWeek,
	translate,
} ) =>
<FormFieldset>
	<FormLabel>
		{ translate( 'Week starts on' ) }
	</FormLabel>
	<FormSelect
		disabled={ isRequestingSettings }
		name="start_of_week"
		onChange={ onChange }
		value={ startOfWeek || 0 }
	>
		{ moment.weekdays().map( ( day, index ) =>
			<option key={ index } value={ index }>
				{ day }
			</option>
		) }
	</FormSelect>
</FormFieldset>;

export default localize( StartOfWeekOption );
