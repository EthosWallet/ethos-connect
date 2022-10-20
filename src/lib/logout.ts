import store from 'store2'
import { Signer, SignerType } from '../types/Signer'
import getConfiguration from './getConfiguration'
import log from './log'
import postIFrameMessage from './postIFrameMessage'

const logout = async (signer: Signer, wallet: boolean = false) => {
  log('logout', `-- Is Extension: ${signer?.type} --`, `-- Disconnect: ${!!signer?.disconnect} --`, "signer", signer)
    
  if (signer?.type === SignerType.EXTENSION) {
    if (signer.disconnect) {
      await signer.disconnect();
    } else {
      console.log("Signer does not support the ability to disconnect from the client interface.")
    }

    return;
  }

  const { walletAppUrl } = getConfiguration()

  store.namespace('auth')('access_token', null)

  return new Promise((resolve) => {
    const listener = (message: any) => {
      log('logout', 'Message origin: ', message.origin, walletAppUrl, message)
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        log('logout', 'message2', action, data)
        if (action === 'user') {
          resolve(data?.user)
        }
      }
    }

    window.removeEventListener("message", listener)
    window.addEventListener('message', listener)

    postIFrameMessage({
      action: 'logout',
      data: { wallet },
    })
  })
}

export default logout
