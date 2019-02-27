import { get } from 'lodash';

export class  GsubdebuggerRequest {
    constructor (props){
        this.sample = get(props, 'sample', "");
        this.replacement = get(props, 'replacement', "");
        this.pattern = get(props, 'pattern', "");
    }

get upstreamJSON() {
    return {
        pipeline: {
            description : 'parse multiple patterns',
            processors: [
              {
                gsub: {
                  field: 'sample',
                  pattern: this.pattern.toString(),
                  replacement : this.replacement.toString()
                }
              }
            ]
          },
          docs:[
              {
                _index: 'gsubdebugger',
                _type: 'gsubdebugger',
                _id: 'gsubdebugger',
                _source: {
                  sample: this.sample.toString()
              }
            }
        ]
    };
}

  static fromDownstreamJSON(downstreamGsubdebuggerRequest) {
    const opts = {
        sample: downstreamGsubdebuggerRequest.sample,
        replacement: downstreamGsubdebuggerRequest.replacement,
        pattern: downstreamGsubdebuggerRequest.pattern
    };

    return new GsubdebuggerRequest(opts);
  }
}