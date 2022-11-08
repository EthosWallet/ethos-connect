import EthosConnectProvider from './components/EthosConnectProvider'

import SignInButton from './components/styled/SignInButton'
import { showSignInModal, hideSignInModal } from './components/styled/SignInModal';

import login from './lib/login'
import logout from './lib/logout'
import sign from './lib/sign'
import transact from './lib/transact'
import preapprove from './lib/preapprove'
import getWalletContents from './lib/getWalletContents'

import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'

import dripSui from './lib/dripSui'
import lookup from './lib/lookup'

import useProviderAndSigner from './hooks/useProviderAndSigner'
import useAddress from './hooks/useAddress'
import useContents from './hooks/useContents'
import useWallet from './hooks/useWallet'

// Enums (must be exported as objects, NOT types)
import { EthosConnectStatus } from './types/EthosConnectStatus';

// Types, interfaces, and enums
import { Wallet } from './types/Wallet';
import { WalletContents } from './types/WalletContents';

const ethos = {
  login,
  logout,
  sign,
  transact,
  preapprove,
  getWalletContents,
  showWallet,
  hideWallet,
  dripSui,
  useProviderAndSigner,
  useAddress,
  useContents,
  useWallet,
  showSignInModal,
  hideSignInModal,
  lookup
}

export {
  EthosConnectProvider,
  SignInButton,
  ethos,
  EthosConnectStatus
}

export type {
  Wallet,
  WalletContents
}
