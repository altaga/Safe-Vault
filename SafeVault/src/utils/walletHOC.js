import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from '@web3modal/ethers5-react-native';
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';

export const walletHOC = Component => {
  return props => {
    const {walletProvider} = useWeb3ModalProvider();
    const {isConnected} = useWeb3ModalAccount();
    const [signer, setSigner] = useState(null);
    const {open} = useWeb3Modal();
    useEffect(() => {
      if (isConnected) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        console.log(provider);
        const signer = provider.getSigner();
        setSigner(signer);
        console.log('Signer Ready on WalletHOC');
      }
    }, [isConnected]);
    return <Component signer={signer} {...props} />;
  };
};
