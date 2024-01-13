import requests
import json
import sys
from elevenlabs import generate, stream

sse_url = "http://localhost:3000/Codsworth/chat"

fullResponse = ''

def handle_sse_message(message):
    global fullResponse
    fullResponse += message
    print(f"{fullResponse}")

    if any(punctuation in fullResponse for punctuation in ['.', '!', '?']):
        audio_stream = generate_speech(fullResponse)
        stream(audio_stream)
        fullResponse = ''

def generate_speech(text):
    audio_stream = generate(text=text, stream=True, api_key='', voice='', model='eleven_multilingual_v2')
    return audio_stream

while 1:
    print("Bitte geben Sie eine Nachricht ein:")
    message_data = {
        "message": sys.stdin.readline().strip()
    }
    
    response = requests.get(sse_url, data=json.dumps(message_data), headers={"Content-Type": "application/json"}, stream=True)

    if response.status_code == 200:
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith("data:"):
                    message = decoded_line[6:]
                    handle_sse_message(message)

response.close()