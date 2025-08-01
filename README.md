# SafaaiBuddy

**SafaaiBuddy** is a smart and responsive static website offering instant, AI-powered deep cleaning estimates. It allows users to submit home details and images, which are processed and stored using vector databases and automation tools.

---
## Demo



https://github.com/user-attachments/assets/ce697932-08d3-40ec-975a-4e07d985a6d7

---


## 🌟 Features

- 📋 Collects user details (Name, Address, Rooms, Area, etc.)
- 🖼️ Accepts house image uploads
- 📉 Compresses and encodes images to base64 before sending
- 🔁 Submits all form data to an automation webhook
- 🧠 Integrates with **Pinecone** to match cleaning services with market-relevant pricing and trends based on Indian data
- 📱 Fully responsive and mobile-friendly

---

## 🔧 Technologies Used

- **HTML/CSS/JavaScript**
- **Base64 Image Encoding**
- **n8n Webhook Integration**
- **Pinecone Vector Database**
- **Responsive Web Design**

---

## 🧠 Pinecone Integration

The uploaded data is indexed into a **Pinecone vector database** for semantic search. This enables:

- 🔍 AI-powered query resolution for service recommendations
- 🇮🇳 Matching pricing based on Indian city/tier-wise trends
- 📊 Fetching relevant historical data and suggestions for cleaning packages

---


## 📄 License

Licensed under the MIT License.

