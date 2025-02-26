import os 
from dotenv import load_dotenv
from eth_account import Account
from web3 import Web3
import json

base_url = "http://localhost:8000"

load_dotenv()

private_key = os.getenv("PRIVATE_KEY")

SEPOLIA_RPC_URL = os.getenv("SEPOLIA_RPC_URL")
BASE_SEPOLIA_RPC_URL = os.getenv("BASE_SEPOLIA_RPC_URL")

sepolia_web3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))
base_sepolia_web3 = Web3(Web3.HTTPProvider(BASE_SEPOLIA_RPC_URL))

def bridge_sepolia_to_base_sepolia(amount: int):
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

def bridge_base_sepolia_to_sepolia(amount: int):
    account = Account.from_key(private_key)
    tx = {
        'nonce': base_sepolia_web3.eth.get_transaction_count(account.address),
        'to': account.address,
        'value': Web3.to_wei(amount, 'ether'),
        'gas': 21000,
        'gasPrice': base_sepolia_web3.eth.gas_price,
        'chainId': 84532,
    }   
    signed_tx = base_sepolia_web3.eth.account.sign_transaction(tx, private_key)
    tx_hash = base_sepolia_web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()
    