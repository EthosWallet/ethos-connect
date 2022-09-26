import type { ObjectId } from '@mysten/sui.js';
import getConfiguration from './getConfiguration';
import getIframe from './getIframe';
import postIFrameMessage from './postIFrameMessage';

export interface Preapproval {
  module: string,
  function: string,
  objectId: ObjectId,
  description: string,
  totalGasLimit: number;
  perTransactionGasLimit: number;
  maxTransactionCount: number;
}

export type PreapprovalArgs = {
  signer: any,
  preapproval: Preapproval
}

const requestPreapproval = async ({ signer, preapproval }: PreapprovalArgs) => {
  if (signer.extension) {
    if (!signer.requestPreapproval) {
      throw("Signer does not support `requestPreapproval`")
    }

    return signer.requestPreapproval(preapproval)
  } else {
    return new Promise((resolve) => {
      const { walletAppUrl } = getConfiguration()
  
      const permissionEventListener = (message: any) => {
        if (message.origin === walletAppUrl) {
          const { action, data } = message.data
          if (action !== 'request-preapproval') return
          
          const { state, response } = data
  
          if (state !== "responded") return;

          resolve(response);
        }
      }
  
      window.addEventListener('message', permissionEventListener)
  
      postIFrameMessage({
        action: 'request-preapproval',
        data: { preapproval },
      })
  
      getIframe(true)
    })
  }

  
}

export default requestPreapproval;