# Safe Vault
 Safe Vault: Batch transactions, smart savings, and easy card payments.

<img src="https://i.ibb.co/YZ4RVPL/New-Project-2.png">

## Fast Links:

WALLET CODE: [CODE](./SafeVault/)

APK APP: [LINK](./SafeVault%20APK/app-release.apk)

PLAYSTORE LINK: [LINK](https://play.google.com/store/apps/details?id=com.altaga.safevault)

VIDEODEMO: [VIDEO](https://youtu.be/pBJ31oYsnFE)

# System Diagrams:

Our project has 3 fundamental components and their diagrams are as follows.

## Email Onboarding:

Our Email onboarding is powered by Wallet Connect's AppKit, with this service is possible to create, retrieve and configure the Safe Vault Wallet completely through email witout the need for the seed phrase.

<img src="https://i.ibb.co/tYwKkLM/email-onboarding-drawio-1.png">

This service allows users less accustomed to crypto wallets to use our services. The entire implementation of the provider for the wallet is in the following links.

- [Wallet HOC CODE](./SafeVault/src/utils/walletHOC.js)
- [Web3 Modal CODE](./SafeVault/src/App.js)

Hack to integrate the Base network with an Email Provider in React Native.

On this node_modules file @web3modal/email-react-native/src/W3mFrameProvider.ts

Change this lines or use the patch in the [patches folder](./Patches/@web3modal+email-react-native+2.0.1.patch):

- Line 313:

        const chainId = 8453;

- Line 349:

        return 8453

- Line 438:

        this.setLastUsedChainId(8453);

## Safe Account:

Being able to use the card to pay with crypto is only possible thanks to [Safe](https://safe.global/wallet) and its Smart Contract Wallets creation service, in addition to being able to integrate all its functions into the wallet through [ Safe Protocol SDK](https://docs.safe.global/sdk/protocol-kit) for Javascript. The entire implementation of the creation of the wallet and the card transactions is in the following links.

- [Safe Creation CODE](./SafeVault/src/utils/transactionsModal.js)
- [Safe Account Card CODE](./SafeVault/src/screens/main/tabs/tab3.js)
- [Safe Account Cloud Transaction CODE](./Cloud%20Function/cardTransaction/index.js)

<img src="https://i.ibb.co/mT24HFz/safe-wallet-drawio.png">

All transactions shown in the demos are from this wallet.

[Wallet Safe URL](https://app.safe.global/transactions/history?safe=base:0x25a990f1d53bA262d277c31d22f187384dD336E3)

# Screens:

SafeVault is a comprehensive payment, savings and card solution. Integrated the Safe and WalletConnect SDKs in a single application.

## Wallet:

As a basis for using all Wallet Connect with AppKit and Safe services and resources, we created a simple wallet.

- [CODE](./SafeVault/src/screens/main/tabs/tab1.js)

<img src="https://i.ibb.co/09YCRC8/vlcsnap-2024-08-15-22h50m56s289.png" width="32%">

In turn, this tab integrates the contract of [Batch Balances](./SafeVault/src/contracts/batchTokenBalances.js), which allows us to obtain all the balances of all the ERC20 Tokens in the Base ecosystem from a single RPC Call this improve the RPC calls and UI for the users.

    const tokenBalances = new ethers.Contract(
        BatchTokenBalancesAddress,
        abiBatchTokenBalances,
        this.provider,
    );
    const [balanceTemp, tempBalances, tempDecimals] = await Promise.all([
        this.provider.getBalance(publicKey),
        tokenBalances.batchBalanceOf(publicKey, tokensArray),
        tokenBalances.batchDecimals(tokensArray),
    ]);

## Send:

With the send function, we can send native tokens or ERC20 tokens. Like any wallet, we will first see a review of the transaction we are going to make and finally we will execute it if everything is correct.

- [CODE](./SafeVault/src/screens/sendWallet/sendWallet.js)

<img src="https://i.ibb.co/CKccXtd/vlcsnap-2024-08-15-22h54m44s819.png" width="32%"> <img src="https://i.ibb.co/7ysBzwH/vlcsnap-2024-08-15-22h54m48s332.png" width="32%"> <img src="https://i.ibb.co/27hyxFX/vlcsnap-2024-08-15-22h55m27s600.png" width="32%">

All transactions are executed in the following component.

- [CODE](./SafeVault/src/utils/transactionsModal.js)

## Receive:

With this screen, you can easily show your Wallet to receive funds, whether native tokens or ERC20. 

- [CODE](./SafeVault/src/screens/depositWallet/depositWallet.js) 

<img src="https://i.ibb.co/gPz7wqC/vlcsnap-2024-08-15-22h58m40s194.png" width="32%">

## Payment: 

In this tab we intend to make it the same as using a traditional POS, this allows us to enter the amount to be charged in American dollars and to be able to make the payment with one of our virtual cards. 

- [CODE](./SafeVault/src/screens/paymentWallet/paymentWallet.js)

<img src="https://i.ibb.co/qMh6hDC/Screenshot-20240816-000140.png" width="32%"> <img src="https://i.ibb.co/7zxW2Nm/Screenshot-20240816-000201.png" width="32%"> <img src="https://i.ibb.co/x5MSBTv/Screenshot-20240816-000150.png" width="32%">

As you can see, since it is an Safe Account Card, we can review the amount of money it has in all the available tokens to be able to make the payment with any of them, whether it is a native token or ERC20.

<img src="https://i.ibb.co/X4dnmdL/Screenshot-20240816-000219.png" width="32%"> <img src="https://i.ibb.co/yy4P70W/Screenshot-20240816-000232.png" width="32%"> <img src="https://i.ibb.co/xCh8kQN/Screenshot-20240816-000239.png" width="32%">

Finally, if our device has the option to print the purchase receipt, it can be printed immediately.

## Savings:

In the savings section, we can create our savings account, this account is linked to our main wallet account, meaning that our wallet will be the owner of it. 

- [CODE](./SafeVault/src/screens/main/tabs/tab2.js)

<img src="https://i.ibb.co/S3w3b3f/vlcsnap-2024-08-15-23h05m12s788.png" width="32%"> <img src="https://i.ibb.co/dKZpYB0/vlcsnap-2024-08-15-23h05m01s157.png" width="32%"> <img src="https://i.ibb.co/55jLcds/vlcsnap-2024-08-15-23h05m04s545.png" width="32%">

### Savings Protocol:

- Balanced Protocol, this protocol performs a weighted rounding according to the amount to be paid in the transaction, so that the larger the transaction, the greater the savings, in order not to affect the user. 

- [CODE](./SafeVault/src/utils/utils.js)

        export function balancedSavingToken(number, usd1, usd2) {
            const balance = number * usd1;
            let amount = 0;
            if (balance <= 1) {
                amount = 1;
            } else if (balance > 1 && balance <= 10) {
                amount = Math.ceil(balance);
            } else if (balance > 10 && balance <= 100) {
                const intBalance = parseInt(balance, 10);
                const value = parseInt(Math.round(intBalance).toString().slice(-2), 10);
                let unit = parseInt(Math.round(intBalance).toString().slice(-1), 10);
                let decimal = parseInt(Math.round(intBalance).toString().slice(-2, -1), 10);
                if (unit < 5) {
                unit = '5';
                decimal = decimal.toString();
                } else {
                unit = '0';
                decimal = (decimal + 1).toString();
                }
                amount = intBalance - value + parseInt(decimal + unit, 10);
            } else if (balance > 100) {
                const intBalance = parseInt(Math.floor(balance / 10), 10);
                amount = (intBalance + 1) * 10;
            }
            return new Decimal(amount).sub(new Decimal(balance)).div(usd2).toNumber();
        }

- Percentage protocol, unlike the previous protocol, this one aims to always save a percentage selected in the UI. 

- [CODE](./SafeVault/src/utils/utils.js)

        export function percentageSaving(number, percentage) {
            return number * (percentage / 100);
        }

## Cards:

Finally, in the cards section, we can create a virtual card, which will help us make payments without the need for our wallet directly with a physical card in any POS terminal with SafeVault. 

- [CODE](./SafeVault/src/utils/transactionsModal.js)

<img src="https://i.ibb.co/Wp9GzFq/Screenshot-20240815-230619.png" width="32%"> <img src="https://i.ibb.co/yXzwVt1/Screenshot-20240815-230622.png" width="32%"> <img src="https://i.ibb.co/GxB9QzL/Screenshot-20240815-230633.png" width="32%">

With a multi-owner smart contract account, the user maintains full ownership and control of their assets, the only way to make payments from this card without the user wallet, is through the physical card. And all transactions are encrypted using SHA256. 

- [CODE](./Cloud%20Function/cardTransaction/index.js)
