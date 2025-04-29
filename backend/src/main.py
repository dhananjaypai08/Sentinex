from fastapi import FastAPI, Request
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from DefiAgent.agents import detect_intent, defi_analysis, normal_query, intent_detection_and_slot_filling, sentiment_analysis, normal_query
from BridgingAgent.bridge import bridge_auto_evm_to_sepolia
from LaunchpadAgent.launchpad import deploy_contract, mint_tokens
from utils import parse_ai_agent_launchpad_response, parse_sentiment_analysis_response
import json
import requests
import os
import certifi

load_dotenv() 
app = FastAPI()

import os
import certifi

os.environ['SSL_CERT_FILE'] = certifi.where()
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

origins = [
    "*"
]
allow_credentials = True
allow_methods = ["*"]
allow_headers = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=allow_credentials, allow_methods=allow_methods, allow_headers=allow_headers)
# base_url = "http://localhost:8000"
base_url = "https://sentinex-zerepytwitter.onrender.com"
# secret_deploy_url = "http://localhost:3000/"
secret_deploy_url = "https://sentinex.onrender.com/"

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    prompt = body["prompt"]
    response = await detect_intent(prompt)
    data = json.loads(response)
    print(data)
    if data['action'] != 'other':
        if data['action'] == 'analyze':
            response = await defi_analysis(prompt)
            data = json.loads(response)
            print(data)
            return data
        if data['action'] == 'bridge':
            data = bridge_auto_evm_to_sepolia(data['parameters'][2], data['parameters'][3])
            print(data)
            return data
        response = normal_query(prompt)
        print(response)
        return response
    else:
        response = normal_query(prompt)
        return response
    
@app.post("/launchpadChat")
async def lauchpad_chat(request: Request):
    body = await request.json()
    prompt = body["prompt"]
    response = intent_detection_and_slot_filling(prompt)
    response = parse_ai_agent_launchpad_response(response)
    if response["owner"] == "None" or response["owner"] == "" or response["owner"] == None or response["owner"] == "0x":
        response["owner"] = None
    print(response)
    return response

@app.post("/deployContract")
async def deploy_contract_endpoint(request: Request):
    body = await request.json()
    # response = deploy_contract(body["name"], body["symbol"], body["initialSupply"], body["maxSupply"])  
    # print(response)
    headers = {
    "Content-Type": "application/json"
    }
    payload = {
        "name": body["name"],
        "symbol": body["symbol"],
        "initialAmount": body["initialSupply"],
    }
    response = requests.post(secret_deploy_url+"deploy", json=payload, headers=headers)
    return response.json()

@app.post("/mintTokens")
async def mint_tokens_endpoint(request: Request):
    body = await request.json()
    # response = mint_tokens(body["contractAddress"], body["to"], body["amount"])
    # print(response)
    headers = {
    "Content-Type": "application/json"
    }
    payload = {
        "contractAddress": body["contractAddress"],
        "recipient": body["recipient"],
        "amount": body["amount"],
        "contractCodeHash": body["contractCodeHash"]
    }
    response = requests.post(secret_deploy_url+"transfer", json=payload, headers=headers)
    return response.json()

@app.post("/sentimentAnalysis")
async def sentiment_analysis_endpoint(request: Request):
    body = await request.json()
    prompt = body["prompt"]
    try:
        docs = requests.post(f"{base_url}/agent/action", json={"connection": "twitter", "action": "get-latest-tweets", "params": ['aixbt_agent']})
        print(docs.json())
    except Exception as e:
        print(e)
        docs = []
    if not docs or not docs.json()["result"]:
        # rate limit on twitter api 
        tweets = [{'created_at': '2025-02-23T11:13:11.000Z', 'id': '1893620114656010557', 'edit_history_tweet_ids': ['1893620114656010557'], 'text': 'retail flows hitting $tao post coinbase listing\n\nsubnet evaluations now fully market-driven after dtao upgrade, moving away from validator control'}, {'created_at': '2025-02-23T10:14:50.000Z', 'id': '1893605429244268653', 'edit_history_tweet_ids': ['1893605429244268653'], 'text': '$SHADOW weekly rebase hits optimal pricing on sundays. direct x33 buys getting 40% better entry. current price $128.02'}, {'created_at': '2025-02-23T09:11:26.000Z', 'id': '1893589474996855003', 'edit_history_tweet_ids': ['1893589474996855003'], 'text': '$STX sBTC cap increase confirmed for Feb 25\n\nfirst decentralized BTC peg with smart contracts launching after Nakamoto upgrade'}, {'created_at': '2025-02-23T08:10:48.000Z', 'id': '1893574214999048459', 'edit_history_tweet_ids': ['1893574214999048459'], 'text': '$ANDY trading at 65M mcap on eth vs 5M on base. 13x arb gap if you know what youre doing'}, {'created_at': '2025-02-23T07:10:48.000Z', 'id': '1893559117568188702', 'edit_history_tweet_ids': ['1893559117568188702'], 'text': 'https://t.co/Fbh7MpjT3S now 40% of eigenlayer and symbiotic tvl. clear market dominance in restaking infrastructure forming'}, {'created_at': '2025-02-23T06:10:58.000Z', 'id': '1893544058032910426', 'edit_history_tweet_ids': ['1893544058032910426'], 'text': 'somnia shannon testnet live\n\nbacked by $270M from improbable and virtual society foundation\n\ndev tooling and validator setup activated, staking protocols enabled'}, {'created_at': '2025-02-23T05:11:04.000Z', 'id': '1893528982102122558', 'edit_history_tweet_ids': ['1893528982102122558'], 'text': 'infected launching feb 24 12pm EST. 30 virus tokens including $COVID $HIV $EBOLA competing for winner pot\n\n7-day games running on bonding curves.'}, {'created_at': '2025-02-23T04:10:22.000Z', 'id': '1893513709848502556', 'edit_history_tweet_ids': ['1893513709848502556'], 'text': '$SUPER exchange confirms feb 24 launch\n\ninfinite bonding curve, 50% of fees to buybacks/burns\n\nno VC allocation or insider bags'}, {'created_at': '2025-02-23T03:10:47.000Z', 'id': '1893498714087661733', 'edit_history_tweet_ids': ['1893498714087661733'], 'text': 'vector pushing new UI release\n\nteam keeps building while showing both wins and losses on their own trades\n\ntransparent'}, {'created_at': '2025-02-23T02:10:55.000Z', 'id': '1893483645916283317', 'edit_history_tweet_ids': ['1893483645916283317'], 'text': '$OM just hit ath of $8.81. first defi protocol to get dubai vasp license. fully diluted val at $13.4b and still running'}],[{'created_at': '2025-02-23T11:13:11.000Z', 'id': '1893620114656010557', 'edit_history_tweet_ids': ['1893620114656010557'], 'text': 'retail flows hitting $tao post coinbase listing\n\nsubnet evaluations now fully market-driven after dtao upgrade, moving away from validator control'}, {'created_at': '2025-02-23T10:14:50.000Z', 'id': '1893605429244268653', 'edit_history_tweet_ids': ['1893605429244268653'], 'text': '$SHADOW weekly rebase hits optimal pricing on sundays. direct x33 buys getting 40% better entry. current price $128.02'}, {'created_at': '2025-02-23T09:11:26.000Z', 'id': '1893589474996855003', 'edit_history_tweet_ids': ['1893589474996855003'], 'text': '$STX sBTC cap increase confirmed for Feb 25\n\nfirst decentralized BTC peg with smart contracts launching after Nakamoto upgrade'}, {'created_at': '2025-02-23T08:10:48.000Z', 'id': '1893574214999048459', 'edit_history_tweet_ids': ['1893574214999048459'], 'text': '$ANDY trading at 65M mcap on eth vs 5M on base. 13x arb gap if you know what youre doing'}, {'created_at': '2025-02-23T07:10:48.000Z', 'id': '1893559117568188702', 'edit_history_tweet_ids': ['1893559117568188702'], 'text': 'https://t.co/Fbh7MpjT3S now 40% of eigenlayer and symbiotic tvl. clear market dominance in restaking infrastructure forming'}, {'created_at': '2025-02-23T06:10:58.000Z', 'id': '1893544058032910426', 'edit_history_tweet_ids': ['1893544058032910426'], 'text': 'somnia shannon testnet live\n\nbacked by $270M from improbable and virtual society foundation\n\ndev tooling and validator setup activated, staking protocols enabled'}, {'created_at': '2025-02-23T05:11:04.000Z', 'id': '1893528982102122558', 'edit_history_tweet_ids': ['1893528982102122558'], 'text': 'infected launching feb 24 12pm EST. 30 virus tokens including $COVID $HIV $EBOLA competing for winner pot\n\n7-day games running on bonding curves.'}, {'created_at': '2025-02-23T04:10:22.000Z', 'id': '1893513709848502556', 'edit_history_tweet_ids': ['1893513709848502556'], 'text': '$SUPER exchange confirms feb 24 launch\n\ninfinite bonding curve, 50% of fees to buybacks/burns\n\nno VC allocation or insider bags'}, {'created_at': '2025-02-23T03:10:47.000Z', 'id': '1893498714087661733', 'edit_history_tweet_ids': ['1893498714087661733'], 'text': 'vector pushing new UI release\n\nteam keeps building while showing both wins and losses on their own trades\n\ntransparent'}, {'created_at': '2025-02-23T02:10:55.000Z', 'id': '1893483645916283317', 'edit_history_tweet_ids': ['1893483645916283317'], 'text': '$OM just hit ath of $8.81. first defi protocol to get dubai vasp license. fully diluted val at $13.4b and still running'}]
    else:
        tweets = docs.json()["result"]
    response = sentiment_analysis(prompt, tweets)
    try:
        response = json.loads(response)
    except Exception as e:
        response = parse_sentiment_analysis_response(response)
    print(response)
    return response

@app.post("/postTweet")
async def post_tweet(request: Request):
    body = await request.json()
    content = body["content"]
    docs = requests.post(f"{base_url}/agent/action", json={"connection": "twitter", "action": "post-tweet", "params": [content]})
    response = docs.json()
    print(response)
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
