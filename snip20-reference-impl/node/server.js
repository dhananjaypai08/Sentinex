import express from "express";
import { SecretNetworkClient, Wallet } from "secretjs";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK"); 
});

app.post("/deploy", async (req, res) => {
  try {
    const { name, symbol, initialAmount } = req.body;
    const mnemonic = process.env.MNEMONIC;
    const chainUrl = "https://pulsar.lcd.secretnodes.com";
    const chainId = "pulsar-3";
    const wasmPath = process.env.WASM_PATH || "../optimized-wasm/snip20_reference_impl.wasm.gz";

    if (!mnemonic || !chainUrl || !chainId) {
      return res.status(500).send("Missing MNEMONIC, CHAIN_URL, or CHAIN_ID in .env");
    }

    const wallet = new Wallet(mnemonic);
    const contract_wasm = fs.readFileSync(wasmPath);

    const secretjs = new SecretNetworkClient({
      chainId: chainId,
      url: chainUrl,
      wallet: wallet,
      walletAddress: wallet.address,
    });

    console.log("Starting deployment…");
    const uploadTx = await secretjs.tx.compute.storeCode(
      {
        sender: wallet.address,
        wasm_byte_code: contract_wasm,
        source: "",
        builder: "",
      },
      {
        gasLimit: 4_000_000,
      }
    );

    const codeId = Number(
      uploadTx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")?.value
    );

    if (!codeId) throw new Error("Failed to find codeId");

    console.log("codeId: ", codeId);

    const contractCodeHash = (
      await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
    ).code_hash;

    console.log(`Contract hash: ${contractCodeHash}`);

    console.log("Instantiating contract…");

    const init = {
      name: name,
      symbol: symbol,
      decimals: 3,
      prng_seed: Buffer.from("Something really random").toString("base64"),
      admin: wallet.address,
      initial_balances: [
        {
          address: wallet.address,
          amount: initialAmount.toString(),
        },
      ],
    };

    const config = {
      enable_deposit: true,
      enable_redeem: true,
      enable_mint: true,
      enable_burn: true,
      can_modify_denoms: true,
    };

    const instantiateTx = await secretjs.tx.compute.instantiateContract(
      {
        code_id: codeId,
        sender: wallet.address,
        code_hash: contractCodeHash,
        init_msg: init,
        label: name+ " "+ symbol + Math.ceil(Math.random() * 10000),
        config: config,
        admin: wallet.address,
      },
      {
        gasLimit: 400_000,
      }
    );

    const contractAddress = instantiateTx.arrayLog.find(
      (log) => log.type === "message" && log.key === "contract_address"
    )?.value;

    console.log("contract address: ", contractAddress);

    if (!contractAddress) throw new Error("Failed to find contract address");

    res.json({
      codeId,
      contractCodeHash,
      contractAddress,
    });
  } catch (error) {
    console.error("Error during deployment:", error);
    res.status(500).send(error.toString());
  }
});

app.post("/transfer", async (req, res) => {
  try {
    const { recipient, contractAddress, contractCodeHash, amount } = req.body;
    const mnemonic = process.env.MNEMONIC;
    const chainUrl = "https://pulsar.lcd.secretnodes.com";
    const chainId = "pulsar-3";

    if (!mnemonic || !chainUrl || !chainId) {
      return res.status(500).send("Missing MNEMONIC, CHAIN_URL, or CHAIN_ID in .env");
    }
    console.log("Starting transfer…");
    const wallet = new Wallet(mnemonic);
    const secretjs = new SecretNetworkClient({
      chainId: chainId,
      url: chainUrl,
      wallet: wallet,
      walletAddress: wallet.address,
    });
    let executeMsg = {
        transfer: {
          owner: wallet.address,
          amount: amount.toString(),
          recipient: recipient,
        },
    };
    console.log("executing transfer…");
    let tx = await secretjs.tx.compute.executeContract(
    {
        sender: wallet.address,
        contract_address: contractAddress,
        code_hash: contractCodeHash,
        msg: executeMsg,
    },
    {
        gasLimit: 100_000,
    }
    );
    console.log(tx);
    res.json({
      status: "Transfer successful",
      transactionHash: tx.transactionHash,
    });
  } catch (error) {
    console.error("Error during transfer:", error);
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
