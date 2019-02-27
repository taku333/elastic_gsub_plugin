import React from 'react';
import { isEmpty } from 'lodash';
import {
  EuiButton,
  EuiForm,
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader
} from '@elastic/eui';
import { SampleInput } from '../sample_input';
import { StructuredOutput } from '../structured_output';
import { ReplacementInput } from '../replacement_input';
import { PatternInput } from '../pattern_input';
import { GsubdebuggerRequest } from '../../models/gsubdebugger_request';
import { GsubdebuggerResponse } from '../../models/gsubdebugger_response';
import { toastNotifications } from 'ui/notify';
import { FormattedMessage } from '@kbn/i18n/react';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: '',
      pattern: '',
      replacement: '',
      structuredEvent: {}
    };
    this.request = new GsubdebuggerRequest();
  }

  onSampleChange = (sample)  => {
    this.setState({ sample });
    this.request.sample = sample;
  }

  onPatternChange = (pattern) =>{
    this.setState({ pattern });
    this.request.pattern = pattern;
  }

  onReplacementChange = (replacement) =>{
    this.setState({ replacement });
    this.request.replacement = replacement;
  }

  simulateGsub = async () => {
    try {
      const { httpClient } = this.props;
      const simulateResponse = await httpClient.post('../api/gsubdebugger/simulate', this.request.upstreamJSON)
        .then((resp) => {
          return GsubdebuggerResponse.fromUpstreamJSON(resp.data);
        });
      
      if (!isEmpty(simulateResponse.error)) {
        toastNotifications.addDanger(simulateResponse.error);
      }

      if (isEmpty(simulateResponse.structuredEvent)){
        toastNotifications.addDanger("sample data empty");
      }
      
      this.setState({
        structuredEvent: simulateResponse.structuredEvent
      });
      
    } catch (e){
      if(isEmpty(e)){
        toastNotifications.addDanger("unexpected error");
      }else {
        toastNotifications.addDanger(e);
      }
    }
  }

  onSimulateClick = () =>{
    this.setState({
      structuredEvent : {}
    }, this.simulateGsub);
  }
  
  isSimulateDisabled = () =>{
    return this.state.sample.trim() === '' 
      || this.state.replacement.trim() === ''
      || this.state.pattern.trim() === '';
  }

  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle>
              <h3>Gsub Debugger</h3>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <h3>Input</h3>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiForm
                className="gsubdebugger-container"
                data-test-subj="gsubDebugger"
              />
              <SampleInput
                    value={this.state.sample}
                    onChange={this.onSampleChange}
                  />
              <PatternInput
                    value={this.state.pattern}
                    onChange={this.onPatternChange}
                  />
              <ReplacementInput
                    value={this.state.replacement}
                    onChange={this.onReplacementChange}
                  />
              <EuiButton
                fill
                onClick={this.onSimulateClick}
                isDisabled={this.isSimulateDisabled()}
                data-test-subj="btnSimulate"
              >
                <FormattedMessage
                  id="gsubDebugger.simulateButtonLabel"
                  defaultMessage="Simulate"
                />
              </EuiButton>
            </EuiPageContentBody>
          </EuiPageContent>
          <EuiPageContent>
            <EuiPageContentHeader>
                <h3>Output</h3>
            </EuiPageContentHeader>
            <StructuredOutput
              value={this.state.structuredEvent} 
            />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
