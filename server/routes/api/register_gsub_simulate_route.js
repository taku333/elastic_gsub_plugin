// import Boom from 'boom';
import { callWithRequestFactory } from '../../lib/call_with_request_factory';
import { GsubdebuggerRequest } from '../../models/gsubdebugger_request';
import { GsubdebuggerResponse } from '../../models/gsubdebugger_response';

function simulateGsub(callWithRequest, jsonBody){
  return callWithRequest('ingest.simulate', {
    body: jsonBody
  });
}

export default function (server) {

  server.route({
    path: '/api/gsubdebugger/simulate',
    method: 'POST',
    handler: (request) => {
      const callWithRequest = callWithRequestFactory(server, request);
      const gsubdebuggerRequest = GsubdebuggerRequest.fromDownstreamJSON(request.payload);
      
      return simulateGsub(callWithRequest, gsubdebuggerRequest.upstreamJSON)
        .then((responseFromES) => {
          const gsubdebuggerResponse = GsubdebuggerResponse.fromUpstreamJSON(responseFromES);
          return gsubdebuggerResponse;
        }).catch(e => {
          throw e.data.message;
        });

    }
  });
}
