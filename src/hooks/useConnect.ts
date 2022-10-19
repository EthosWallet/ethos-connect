import { useCallback, useEffect, useRef, useState } from 'react'
import store from 'store2'
import log from '../lib/log'
import useSuiWallet from './useSuiWallet' 
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import { JsonRpcProvider } from '@mysten/sui.js';
import { suiFullNode } from '../lib/constants'
import { Signer } from 'types/Signer'
import getEthosSigner from '../lib/getEthosSigner'

const useConnect = () => {
  const signerFound = useRef<boolean>(false)
  const methodsChecked = useRef<any>({
    'ethos': false,
    // 'mobile': false,
    'extension': false
  })

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner>({
    provider: null,
    signer: null
  })
  const { 
    wallets,
    selectWallet,
    noConnection: noSuiConnection,
    signer: suiSigner, 
    setSigner: setSuiSigner 
  } = useSuiWallet();
  console.log("USE CONNECT", noSuiConnection, suiSigner)
  
  const [logoutCount, setLogoutCount] = useState(0);
  const logout = useCallback(() => {
    const suiStore = store.namespace('sui')
    suiStore('disconnected', true);

    signerFound.current = false;
    setProviderAndSigner({
      provider: null,
      signer: null
    });
    setSuiSigner(null);
    for (const key of Object.keys(methodsChecked.current)) {
      methodsChecked.current[key] = false;
    }
    setLogoutCount(prev => prev + 1);
  }, [])

  const checkSigner = useCallback((signer: Signer | null, type?: string) => {
    log("useConnect", "trying to set providerAndSigner", type, providerAndSigner, signerFound.current, methodsChecked.current)
    if (signerFound.current) return;
    
    if (type) {
      methodsChecked.current[type] = true;
    }
    
    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false)
    if (!signer && !allMethodsChecked) return;
    
    signerFound.current = true;
    
    const provider = new JsonRpcProvider(suiFullNode);
    
    log("useConnect", "final setting providerAndSigner", providerAndSigner)
    setProviderAndSigner({ provider, signer })
  }, [logoutCount]);

  useEffect(() => {
    log("mobile", "listening to mobile connection from EthosWrapper")
    listenForMobileConnection(
      (mobileSigner: any) => {
        log('useConnect', 'Setting providerAndSigner mobile', mobileSigner)
        log("mobile", "Setting provider and signer", mobileSigner)
        checkSigner(mobileSigner, 'mobile')
      }
    )
  }, [checkSigner])

  useEffect(() => {
    if (!noSuiConnection && !suiSigner) return

    log('useConnect', 'Setting providerAndSigner extension', suiSigner)
    console.log("CHECK SUI SIGNER", noSuiConnection, suiSigner)
    checkSigner(suiSigner, 'extension')
  }, [noSuiConnection, suiSigner, checkSigner])

  useEffect(() => { 
    const fetchEthosSigner = async () => {
      const signer = await getEthosSigner()
      log('useConnect', 'Setting providerAndSigner ethos', signer)
      checkSigner(signer, 'ethos');
    }
    
    fetchEthosSigner()
  }, [checkSigner])

  return { wallets, selectWallet, providerAndSigner, logout };
}

export default useConnect;