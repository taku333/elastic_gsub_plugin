import { get, pick } from 'lodash';

export class GsubdebuggerRequest {
    constructor(proops = {}){
        this.sample = get(proops, 'sample', '');
        this.replacement = get(proops, 'replacement', '');
        this.pattern = get(proops, 'pattern', '');
    }

    get upstreamJSON() { 
        return pick (this, [ 'sample' , 'replacement', 'pattern']);
    }
}

