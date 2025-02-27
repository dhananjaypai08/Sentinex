import os 
from dotenv import load_dotenv
from eth_account import Account
from web3 import Web3
import json

base_url = "http://localhost:8000"

load_dotenv()

private_key = os.getenv("PRIVATE_KEY")

SEPOLIA_RPC_URL = os.getenv("SEPOLIA_RPC_URL")
AUTO_EVM_RPC_URL = os.getenv("AUTO_EVM_RPC_URL")

sepolia_web3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))
auto_evm_web3 = Web3(Web3.HTTPProvider(AUTO_EVM_RPC_URL))

def bridge_sepolia_to_auto_evm(amount: int, address: str):
    account = Account.from_key(private_key)
    tx = {
        'nonce': sepolia_web3.eth.get_transaction_count(account.address),
        'to': account.address,
        'value': Web3.to_wei(amount, 'ether'),
        'gas': 21000,
        'gasPrice': sepolia_web3.eth.gas_price,
        'chainId': 11155111,
    }   
    signed_tx = sepolia_web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = sepolia_web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()

def bridge_auto_evm_to_sepolia(amount: int, address: str):
    tx_hash = bridge_sepolia_to_auto_evm(amount, address)
    print(f"Transaction sent on Sepolia: {tx_hash}")
    txh_url = f"https://sepolia.etherscan.io/tx/0x{tx_hash}"

    account = Account.from_key(private_key)
    tx = {
        'nonce': auto_evm_web3.eth.get_transaction_count(account.address),
        'from': account.address,
        'to': address,
        'value': Web3.to_wei(amount, 'ether'),
        'gas': 21000,
        'gasPrice': auto_evm_web3.eth.gas_price,
        'chainId': 490000,
    }   
    signed_tx = auto_evm_web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = auto_evm_web3.eth.send_raw_transaction(signed_tx.raw_transaction).hex()
    print(f"Transaction sent on AutoEVM: {tx_hash}")
    txn_url = f"https://blockscout.taurus.autonomys.xyz/tx/0x{tx_hash}"
    return {"AutoEVMURL": txn_url , "SepoliaURL": txh_url}
    
    