# Doc Dynamo Frontend

A modern React-based frontend for Doc Dynamo, featuring document upload, AI-powered Q&A, concept extraction, and related YouTube video recommendations.

## Features

- Upload and process PDF documents
- Ask questions and get AI-generated answers
- Extract key concepts and generate quiz questions
- View related YouTube videos with thumbnails
- Responsive sidebar and fixed layout
- Dark/light theme toggle

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/doc-dynamo-frontend.git
   cd doc-dynamo-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file and set your backend API URL:
   ```
   VITE_URL=http://yourbackendurl
   ```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  components/    # React components (Sidebar, MainPanel, Footer, etc.)
  assets/        # Static assets (SVGs, images)
  App.jsx        # Main app layout
  index.js       # Entry point
```

