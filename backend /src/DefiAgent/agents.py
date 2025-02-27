from secret_ai_sdk.secret_ai import ChatSecret
from secret_ai_sdk.secret import Secret

import cohere
from dotenv import load_dotenv
import os 

load_dotenv()

secret_client = Secret(chain_id='pulsar-3', node_url="https://pulsar.lcd.secretnodes.com")
models = secret_client.get_models()
urls = secret_client.get_urls(model=models[0])
secret_ai_llm = ChatSecret(base_url=urls[0], model=models[0], temperature=1.)

api_key = os.environ.get("COHERE_API_KEY")

co = cohere.ClientV2(api_key=api_key)

def intent_detection_and_slot_filling(prompt: str):
    try:
        messages =  [
            (
                "system",
                """Context: You are an expert in detecting the intent of the user and slot filling the JSON structure accordingly.
                    Instructions: 
                    - Analyze the user's query and find the slot filling the JSON structure accordingly
                    - Slot fill the JSON structure accordingly
                    - If you can't detect token name, that is the `name` field then create a random name for the token
                    - If you can't detect token symbol, that is the `symbol` field then create a random symbol for the token. For example for token Name : "Agentonic" the symbol can be "AGT"
                    - If you can't detect token initial supply, that is the `initialSupply` field then the default value for initial supply is 1000000
                    - If you can't detect token max supply, that is the `maxSupply` field then the default value for max supply is 10000000
                    Required JSON Structure:
                    {
                        "name": "string", # name of the token
                        "symbol": "string", # symbol of the token
                        "initialSupply": "integer", # initial supply of the token
                        "maxSupply": "integer", # max supply of the token,
                        "owner": "string" # owner of the token
                    }

                    response_format={"type": "json_object",
                             "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {"type": "string"},
                                    "symbol": {"type": "string"},
                                    "initialSupply": {"type": "integer"},
                                    "maxSupply": {"type": "integer"},
                                    "owner": {"type": "string"} # owner of the token   
                                },
                                "required": ["name", "symbol", "initialSupply", "maxSupply", "owner"]
                             }
                        }
                    """
            ),
            (
                "human",
                prompt
            )
        ]
        response = secret_ai_llm.invoke(messages, stream=False)
        print(response.content)
        return response.content
    except Exception as e:
        return f"Error generating response: {str(e)}"

DefiAnalysisSystemPrompt = """Context: You are an expert DeFi Optimizer. 
                    Instructions: 
                    - You are an expert DeFi Optimizer. You have all the Defi related knowledge and you are able to analyze the user's query about DeFi protocols and provide a comprehensive, step-by-step response. You are more statistical and you are able to give the best possible analysis for the user's query 
                    - You are heavy on statistics and on risk analysis for each protocol that you come up with
                    - Generate a JSON response for a user query about DeFi protocols and strictly adhere to the below given points without None values
                    - Analyze the user's query about DeFi protocols
                    - Provide a comprehensive, step-by-step response
                    - Include protocol recommendations, potential benefits, and risks
                    - Format response as a clean, informative JSON object
                    - For every single response, Include the 'total slippage', 'net gains', 'safe and recommended protocols', 'estimate time for swap', 'potential fees' as statistics
                    - Don't give 'None' or 'N/A' as a response for anything, if you don't have the data, just search the internet and give the latest data for it and don't ever give `None` as a response for any field
                    - Give statistics for the best defi protocol inlcuding the 'total slippage', 'net gains', 'safe and recommended protocols', 'estimate time for swap', 'potential fees'
                    - Give proper links for the protocols
                    
                    Required JSON Structure:
                    {
                        "protocol_name": "string",
                        "protocol_description": "string",
                        "protocol_steps": [
                            {
                                "step_number": 1,
                                "description": "string",
                                "estimated_time": "string",
                                "potential_fees": "string"
                            }
                        ],
                        "protocol_link": "string",
                        "estimated_slippage": "string",
                        "slippage insights": "string",
                        "overall_benefit": "string",
                        "risks": ["string"],
                        "alternative_protocols": ["string"]
                    }
                """
async def defi_analysis(prompt: str):
    try:
        res = co.chat(
            model="command-r-plus-08-2024",
            messages=[
                {
                    "role": "system",
                    "content": DefiAnalysisSystemPrompt 
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],  
            response_format={"type": "json_object"}
        )
        return res.message.content[0].text
    except Exception as e:
        return f"Error generating response: {str(e)}"
    
def sentiment_analysis(prompt: str, tweets: list):
    try:
        messages = [
            (
                "system",
                f"""Context: You are an expert in sentiment analysis.
                    Instructions: 
                    - Analyze the user's query and find the sentiment of the user
                    - Analyze the tweets and find the sentiment of the user
                    - Return false if the sentiment is very negative and for all other cases return true
                    The tweets are : {list(tweets)}
                    
                    """+
                    """JSON message format(response) : 
                    {
                        "sentiment": "boolean"
                    }
                    """
            ),
            (
                "human",
                prompt
            )
        ]
        response = secret_ai_llm.invoke(messages, stream=False)
        print(response.content)
        return response.content
    except Exception as e:
        return f"Error generating response: {str(e)}"
    
async def detect_intent(prompt: str):
    actions = ['transfer', 'bridge', 'analyze', 'other']
    try:
        res = co.chat(
            model="command-r-plus-08-2024",
            messages=[
                {
                    "role": "system",
                    "content": f"""Context: You are an expert in finding the right action to perform based on the user's query along with all the parameters and values for the action. 
                    Instructions: 
                    - Analyze the user's query and find the right action to perform from this list of actions : {list(actions)}
                    - Provide a comprehensive, step-by-step response
                    - Include protocol recommendations, potential benefits, and risks
                    - Don't give 'None' or 'N/A' as a response for anything, if you don't have the data, just search the internet and give the latest data for it and don't ever give `None` as a response for any field.
                    - The `parameters` attribute in the json response should be like this example : ["0x1234567890123456789012345678901234567890", "1"] (address and amount to transfer) or   ["ethereum", "taurus", "0.1", "0x1234567890123456789012345678901234567890"] (source network, destination network, input amount to bridge and address), for other actions, the parameters should be like this example : [], for analyze-defi, the parameters should be like this example : []
                    - For action : transfer, the parameters should be like this example : ["0x1234567890123456789012345678901234567890", "1"]
                    - For action : bridge, the parameters should be like this example : ["sonic", "ethereum", "1", "0x1234567890123456789012345678901234567890"]
                    - For action : analyze, the parameters should be like this example : []
                    - For action : other, the parameters should be like this example : [] # This means that the action is not listed in the actions list and is just a normal query
                    """
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object",
                             "schema": {
                                "type": "object",
                                "properties": {
                                    "action": {"type": "string"},
                                    "parameters": {"type": "array"}, # ["0x1234567890123456789012345678901234567890", 1] (address and amount to transfer) or ["ethereum", "taurus", 0.1, "0x1234567890123456789012345678901234567890"] (source network, destination network, amount to bridge and address) and for analyze, the parameters should be like this example : []
                                },
                                "required": ["action", "parameters"]
                             }
                             }
        )
        return res.message.content[0].text
    except Exception as e:
        return f"Error generating response: {str(e)}"
    
def normal_query(prompt: str):
    try:
        messages = [
            (
                "system",
                """Context: You are an expert DeFi Optimizer. You have all the Defi related knowledge and you are able to analyze the user's query about DeFi protocols and provide a comprehensive, step-by-step response. You are more statistical and you are able to give the best possible analysis for the user's query 
                """
            ),
            (
                "human",
                prompt
            )
        ]
        response = secret_ai_llm.invoke(messages, stream=False)
        print(response.content)
        return response.content
    except Exception as e:
        return f"Error generating response: {str(e)}"