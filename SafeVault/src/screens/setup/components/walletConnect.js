import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalEvents
} from '@web3modal/ethers5-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import GlobalStyles from '../../../styles/styles';

export default function ConnectView(props) {
  const [loading, setLoading] = useState(false);
  const {open} = useWeb3Modal();
  const {address} = useWeb3ModalAccount();
  const event = useWeb3ModalEvents();

  useEffect(() => {
    if (event.data.event === 'CONNECT_SUCCESS') {
      props.setupAddress(address);
    }
  }, [event]);

  return (
    <Pressable
      disabled={loading}
      style={[GlobalStyles.buttonStyle, loading ? {opacity: 0.5} : {}]}
      onPress={() => {
        setLoading(true);
        open();
      }}>
      <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
        Recover Wallet (Email)
      </Text>
    </Pressable>
  );
}
