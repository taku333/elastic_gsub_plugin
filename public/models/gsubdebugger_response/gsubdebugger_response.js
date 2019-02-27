import { get } from 'lodash';

export class GsubdebuggerResponse {
  constructor(props) {
    this.structuredEvent = get(props, 'structuredEvent', {});
    this.error = get(props, 'error', {});
  }

  static fromUpstreamJSON(gsubdebuggerResponse) {
    return new GsubdebuggerResponse(gsubdebuggerResponse);
  }
}