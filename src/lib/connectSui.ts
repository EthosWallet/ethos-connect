import store from 'store2'
import log from './log'

const connectSui = async (walletIdentifier: string) => {
  if (typeof window === 'undefined') return

  const suiWallet = (window as any)[walletIdentifier]
  const suiStore = store.namespace('sui')
  
  if (!suiWallet) {
    return false
  }

  try {
    let confirmed = await suiWallet.hasPermissions()
    if (!confirmed) {
      confirmed = await suiWallet.requestPermissions()
    }
  
    if (confirmed) {
      suiStore('disconnected', null);

      const accounts = await suiWallet.getAccounts()
  
      if (!accounts || accounts.length === 0) return false
  
      const storeResult = suiStore('account', accounts[0])
      const success = window.dispatchEvent(new Event('ethos-storage-changed'))
      log('connectSui', 'Dispatch event-storage-changed', storeResult, success)
    }
  } catch (e) {
    console.log("Error connecting to Sui Wallet", e)
    return false;
  }
  

  return true
}

export default connectSui
