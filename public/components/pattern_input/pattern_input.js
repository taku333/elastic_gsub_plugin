import React from 'react';
import {
  EuiFormRow,
  EuiPanel,
  EuiCodeEditor
} from '@elastic/eui';
import { EDITOR } from '../../../common/constants';
import { FormattedMessage } from '@kbn/i18n/react';

export function PatternInput({ value, onChange }) {
  return (
    <EuiFormRow
      label={(
        <FormattedMessage
          id="gsubDebugger.patternLabel"
          defaultMessage="Pattern"
        />
      )}
      fullWidth
      data-test-subj="acePatternInput"
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