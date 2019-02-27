import React from 'react';
import {
  EuiFormRow,
  EuiPanel,
  EuiCodeEditor
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

export function StructuredOutput({ value }) {
  return (
    <EuiFormRow
      label={(
        <FormattedMessage
          id="gsubDebugger.structuredDataLabel"
          defaultMessage="Structured Data"
        />
      )}
      fullWidth
      data-test-subj="aceStructuredOutput"
    >
      <EuiPanel paddingSize="s">
        <EuiCodeEditor
          mode="json"
          isReadOnly
          width="100%"
          height="340px"
          value={JSON.stringify(value, null, 2)}
          setOptions={{
            highlightActiveLine: false,
            highlightGutterLine: false,
          }}
        />
      </EuiPanel>
    </EuiFormRow>
  );
}