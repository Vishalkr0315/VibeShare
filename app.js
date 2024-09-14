const apiKey = 'CpqNwJk8ktKmd7NjM28HMhN8IikuQzkF'; // Replace with your actual API key
// const externalUserId = 'testkey';

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: ['plugin-1712327325'], // Ensure this plugin ID is valid
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    console.log('Chat session created:', response.data); // Log the full response for debugging
    return response.data.data.id; // Check if the session ID is being returned correctly
  } catch (error) {
    console.error('Error creating chat session:', error.response ? error.response.data : error.message);
    return null; // Return null if the session creation fails
  }
}

// Function to submit a query and get the bot's response
async function submitQuery(sessionId, userInput) {
  try {
    const response = await axios.post(
      https//api.on-demand.io/chat/v1/sessions/${sessionId}/query,
      {
        endpointId: 'predefined-openai-gpt4o', // Ensure this endpoint ID is valid
        query: userInput,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726270563'], // Check these plugin IDs
        responseMode: 'sync' // Ensure the API supports this mode
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    console.log('Bot response received:', response); // Log the full bot response
    return response.data.response; // Make sure this field contains the bot's reply
  } catch (error) {
    console.error('Error submitting query:', error.response ? error.response.data : error.message);
    return "Sorry, something went wrong!";
  }
}

// Function to display messages in the chatbox
function displayMessage(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender); // Adds 'user' or 'bot' classes
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Main chatbot logic
async function main() {
  // Create chat session
  const sessionId = await createChatSession();
  if (!sessionId) {
    alert('Failed to create a chat session! Check console for details.');
    return;
  }

  // Add event listener to handle user input
  const sendBtn = document.getElementById('send-btn');
  const userInputField = document.getElementById('user-input');

  sendBtn.addEventListener('click', async () => {
    const userInput = userInputField.value.trim();
    if (userInput === '') return; // Ignore empty input

    // Display user message in the chatbox
    displayMessage(userInput, 'user');
    userInputField.value = ''; // Clear input field

    // Fetch bot response and display
    const botResponse = await submitQuery(sessionId, userInput);
    displayMessage(botResponse, 'bot');
  });

  // Allow pressing "Enter" to send the message
  userInputField.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      sendBtn.click(); // Trigger the send button
    }
  });
}

// Initialize the chatbot interface
main();