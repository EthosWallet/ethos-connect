import EthosWrapper from './components/EthosWrapper'

import SignInButton from './components/styled/SignInButton'

import initialize from './lib/initialize'
import login from './lib/login'
import logout from './lib/logout'
import sign from './lib/sign'
import transact from './lib/transact'
import transfer from './lib/transfer'

import getWalletBalance from './lib/getWalletBalance'
import getWalletNfts from './lib/getWalletNfts'
import getWalletContents from './lib/getWalletContents'

import activeUser from './lib/activeUser'
import tokenTransfers from './lib/tokenTransfers'
import query from './lib/query'

import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'
import getProvider from './lib/getProvider'

import dripSui from './lib/dripSui'

import useProviderAndSigner from './hooks/useProviderAndSigner'
import useContents from './hooks/useContents'

import sui from './lib/sui';

const ethos = {
  initialize,
  login,
  logout,
  sign,
  transact,
  transfer,
  getWalletBalance,
  getWalletNfts,
  getWalletContents,
  activeUser,
  tokenTransfers,
  query,
  showWallet,
  hideWallet,
  getProvider,
  dripSui,
  useProviderAndSigner,
  useContents,
  sui
}

export { EthosWrapper, SignInButton, ethos }
