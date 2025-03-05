# 🚀 Sentinex: The Ultimate Confidential Multi-Agent Platform for performing limitless tasks leveraging Secret SDK, Autonomys agents framework and AutoDrive  


*Powering limitless tasks with Secret SDK, Autonomys agents, and AutoDrive.*  

### 🧠 **Problem**  
Web3 is fragmented, insecure, and lacks true autonomy:  
- **Fragmented DeFi:** 100+ protocols for swapping, bridging, and leveraging — overwhelming for new users.  
- **Rugpull Token Launches:** 1000s of tokens launched without real community engagement.  
- **Privacy Risks:** Front-running, data leaks, and surveillance.  
- **Limited Autonomy:** Hard to automate event-driven tasks.  
- **Complex Workflows:** Managing state, memory, and long-term decisions.  

---

### 🛠️ **Features**  
1. **Social Token Launch Agents:**  
   - Detect trends on Twitter via @aixbt_agent.  
   - Launch tokens with Secret SDK.  
   - Mint 50% supply and auto-tweet the token contract.  

2. **Secure & Fast Bridging + Smart Faucet:**  
   - **Agent 1:** Transfers ETH to a gateway and sends Merkle proof.  
   - **Agent 2:** Verifies proof and sends equivalent tAi3 tokens to the destination.  

3. **Confidential DeFi Analytics:**  
   - Analyze token movements, slippage, and order ranges with **Secret SDK** — privately.  

4. **Autonomous Security Audits:**  
   - AI-powered smart contract audits on Secret Network with detailed fix suggestions.  

5. **Personalized Trading Strategies:**  
   - Design AI-driven strategies on **Autonomys Taurus testnet**.  
   - Analyze protocol risk, liquidity, and token volumes with **Secret SDK**.  

6. **Persistent Verifiable Memory:**  
   - Use **AutoDrive** to store and retrieve past interactions and tweets from @aixbt_agent.  

---

### Installation and Setup
1. Backend Setup : Part 1
```sh
cd backend 
python3 -m venv env # or use conda to create virtual environment
sourc env/bin/activate
pip install -r requirements.txt
cp .env.example .env
python3 src/main.py
```
Note : Make sure to create and fill the .env in `backend/.env` using the `backend/.env.example`

Troubleshoot: For troubleshooting `certificate verification error`: Use conda as virtual environment

2. Backend Setup : Part 2
```sh
cd Zerepy
python3 -m venv env # or use conda to create virtual environment
sourc env/bin/activate
pip install -r requirements.txt # or poetry run pip install -r requirements.txt
cp .env.example .env
poetry run python main.py --server
```
Note : Make sure to create and fill the .env in `Zerepy/.env` using the `Zerepy/.env.example`

3. Autonomys Agent setup 
```sh
cd autonomys-agent
cp autonomys-agent/characters/djcharacter/config/.env.example autonomys-agent/characters/djcharacter/config/.env 
yarn install
yarn dev djcharacter
```
Note : Make sure to create and fill the .env in `autonomys-agent/characters/djcharacter/config/.env` using the `.env.example` in the same folder

4. Frontend setup 
```sh
cd frontend 
npm install 
npm run tauri dev
```

Now you're project is running on localhost!

---
### ⚡ **Architecture & Agent Usage**  
1. **Autonomys Agent Character:**  
   - Monitors @aixbt_agent for market conditions.  
   - Tweets new token launches and engages in crypto discussions.  

2. **Secret SDK:**  
   - Intent detection and slot filling.  
   - Token bridging, DeFi protocol analysis, and arbitrage optimization.  
   - Confidential security audits.  

3. **AutoDrive:**  
   - The long-term memory of the agent.  
   - Stores historical interactions and uploaded DSN data.  

4. **Cohere Agent:**  
   - Ensures structured and accurate outputs.  

5. **AI Agent Overall work:**  
   - Drives token launch logic, security audits, and sentiment analysis via Secret SDK and Autonomys Agent.  

---

### 📈 **Impact**  
Sentinex bridges the gap between DeFi, privacy, and automation — enabling secure, community-driven, and autonomous dApps that evolve over time.  
