document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const quickReplies = document.getElementById('quickReplies');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Sample order data (in a real app, this would come from a database)
    const orderData = {
        orderNumber: 'ORD-12345',
        status: 'Shipped',
        estimatedDelivery: '2023-12-15',
        items: [
            { name: 'Wireless Headphones', quantity: 1 },
            { name: 'Phone Case', quantity: 2 }
        ],
        trackingNumber: 'TRK BD-987654'
    };
    
    // Return policy information
    const returnPolicy = {
        window: '30 days',
        condition: 'Items must be unused and in original packaging',
        process: 'Initiate return through your account page or contact support',
        refundTime: '5-10 business days after we receive the item'
    };
    
    // Focus input field on load
    userInput.focus();
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            
            // Show typing indicator
            typingIndicator.style.display = 'flex';
            
            // Process message after a short delay to simulate thinking
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                processMessage(message);
            }, 1500);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        messageElement.textContent = text;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Process user message and generate response
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Intent recognition
        if (lowerMessage.includes('order') && lowerMessage.includes('status')) {
            handleOrderStatus();
        } 
        else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
            handleReturnPolicy();
        } 
        else if (lowerMessage.includes('track') && lowerMessage.includes('order')) {
            handleTrackOrder();
        } 
        else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('human')) {
            handleContactSupport();
        }
        else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            addMessage("Hello! How can I assist you with your order today?", 'bot');
        }
        else if (lowerMessage.includes('thank')) {
            addMessage("You're welcome! Is there anything else I can help you with?", 'bot');
        }
        else {
            addMessage("I'm not sure I understand. You can ask me about order status, return policy, or how to track your order.", 'bot');
        }
    }
    
    // Handle order status inquiries
    function handleOrderStatus() {
        addMessage(`Your order ${orderData.orderNumber} is currently ${orderData.status}. ` +
                  `It's estimated to arrive by ${orderData.estimatedDelivery}. ` +
                  `Would you like tracking information?`, 'bot');
    }
    
    // Handle return policy inquiries
    function handleReturnPolicy() {
        addMessage(`Our return policy allows returns within ${returnPolicy.window} of delivery. ` +
                  `${returnPolicy.condition}. ${returnPolicy.process}. ` +
                  `Refunds are processed within ${returnPolicy.refundTime}.`, 'bot');
    }
    
    // Handle track order inquiries
    function handleTrackOrder() {
        addMessage(`To track your order, use tracking number ${orderData.trackingNumber} on our website. ` +
                  `Your order is currently ${orderData.status} and estimated to arrive by ${orderData.estimatedDelivery}.`, 'bot');
    }
    
    // Handle contact support inquiries
    function handleContactSupport() {
        addMessage("You can contact our support team by phone at +8801998843035 (9AM-5PM EST) or " +
                  "by email at sikhderimran@gmail.com. Our team will be happy to help you!", 'bot');
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick replies functionality
    const quickReplyButtons = quickReplies.querySelectorAll('.quick-reply');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            userInput.value = message;
            sendMessage();
        });
    });
    
    // Initial bot message after short delay
    setTimeout(() => {
        addMessage("You can ask me about your order status, our return policy, or how to track your package. How can I help you?", 'bot');
    }, 1000);
});