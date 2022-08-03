import getConfiguration from './getConfiguration'

const listenForMobileConnection = async (): Promise<any> => {
  const { walletAppUrl } = getConfiguration()

  return new Promise((resolve, _reject) => {
    const connectionEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action) console.log("MESSAGE", action, data)
        if (action !== 'connect') return
        if (!data.address) return;
        window.removeEventListener('message', connectionEventListener)

        const signer = {
          getAddress: () => data.address
        }

        const provider = {
          getSigner: signer,
        }

        console.log({ provider, signer })
        resolve({ provider, signer })
      }
    }

    window.addEventListener('message', connectionEventListener)
  })
}

export default listenForMobileConnection