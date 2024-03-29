import getConfiguration from './getConfiguration'

const connectWallet = (apiKey: string) => {
  return new Promise((resolve) => {
    const { walletAppUrl } = getConfiguration()
    window.addEventListener('message', (message) => {
      if (message.origin === walletAppUrl) {
        const { action, data } = message.data
        if (action === 'user') {
          resolve(data.user)
        }
      }
    })

    const returnTo = encodeURIComponent(window.location.href)
    window.open(
      `${walletAppUrl}/connect?apiKey=${apiKey}&returnTo=${returnTo}`,
      '_blank',
      `popup,top=100,left=${window.screen.width - 500},width=390,height=420`
    )
  })
}

export default connectWallet
