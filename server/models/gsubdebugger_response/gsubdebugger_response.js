import { get, isEmpty } from 'lodash';

export class GsubdebuggerResponse {
  constructor(props) {
    this.structuredEvent = get(props, 'structuredEvent', {});
    this.error = get(props, 'error', {});
  }

  static fromUpstreamJSON(upstreamGsubdebuggerResponse) {
    const docs = get(upstreamGsubdebuggerResponse, 'docs');
    const error = docs[0].error;
    if (!isEmpty(error)) {
      const opts = { 'error': 'Provided Gsub patterns do not match data in the input' };
      return new GsubdebuggerResponse(opts);
    }
    const structuredEvent = get(docs, '0.doc._source');
    const opts = { structuredEvent };
    return new GsubdebuggerResponse(opts);
  }
}