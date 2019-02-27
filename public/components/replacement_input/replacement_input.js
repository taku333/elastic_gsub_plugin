import React from 'react';
import {
  EuiFormRow,
  EuiPanel,
  EuiCodeEditor
} from '@elastic/eui';
import { EDITOR } from '../../../common/constants';
import { FormattedMessage } from '@kbn/i18n/react';

export function ReplacementInput({ value, onChange }) {
  return (
    <EuiFormRow
      label={(
        <FormattedMessage
          id="gsubDebugger.replacementLabel"
          defaultMessage="Replacement"
        />
      )}
      fullWidth
      data-test-subj="aceReplacementInput"
    >
      <EuiPanel paddingSize="s">
        <EuiCodeEditor
          width="100%"
          value={value}
          onChange={onChange}
          setOptions={{
            highlightActiveLine: false,
            highlightGutterLine: false,
            minLines: EDITOR.SAMPLE_DATA_MIN_LINES,
            maxLines: EDITOR.SAMPLE_DATA_MAX_LINES
          }}
        />
      </EuiPanel>
    </EuiFormRow>
  );
}