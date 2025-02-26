import re
import json

def parse_ai_agent_launchpad_response(response):
    """
    Parse JSON data from AI agent responses, handling various text formatting
    and edge cases.
    
    Args:
        response (str): The raw response from the AI agent
        
    Returns:
        dict: The extracted JSON data as a Python dictionary
        
    Raises:
        ValueError: If no valid JSON could be extracted from the response
    """
    # First, try to extract content between ```json and ``` markers
    json_pattern = r'```json\s*([\s\S]*?)\s*```'
    matches = re.findall(json_pattern, response)
    
    if matches:
        try:
            return json.loads(matches[0])
        except json.JSONDecodeError:
            # Continue with other methods if this fails
            pass
    
    # Try alternate pattern (just triple backticks)
    json_pattern = r'```\s*([\s\S]*?)\s*```'
    matches = re.findall(json_pattern, response)
    
    for match in matches:
        try:
            # Check if the content looks like JSON (starts with { or [)
            if match.strip().startswith('{') or match.strip().startswith('['):
                return json.loads(match)
        except json.JSONDecodeError:
            continue
    
    # Try to find JSON directly in the text (looking for curly braces)
    json_pattern = r'(\{[\s\S]*?\})'
    matches = re.findall(json_pattern, response)
    
    for match in matches:
        try:
            # Add some validation to make sure we're getting complete JSON objects
            if match.count('{') == match.count('}') and '"' in match:
                result = json.loads(match)
                # Additional check: make sure it's more than just an empty object
                if result and isinstance(result, dict) and len(result) > 0:
                    return result
        except json.JSONDecodeError:
            continue
    
    # More aggressive approach - try to find the most promising JSON-like structure
    # Look for sequences with multiple key-value pairs
    if '"name":' in response and '"symbol":' in response:
        # Find the largest chunk of text that contains both keys
        start_pos = response.find('{', max(0, response.find('"name":')-10))
        end_pos = response.find('}', max(response.find('"symbol":'), response.find('"owner":'))) + 1
        
        if start_pos >= 0 and end_pos > start_pos:
            json_text = response[start_pos:end_pos]
            try:
                return json.loads(json_text)
            except json.JSONDecodeError:
                # Try to fix common JSON issues
                fixed_json = json_text.replace("'", '"')  # Replace single quotes with double quotes
                try:
                    return json.loads(fixed_json)
                except json.JSONDecodeError:
                    pass
    
    # If we've made it here, we couldn't extract valid JSON
    raise ValueError("No valid JSON data could be extracted from the response")