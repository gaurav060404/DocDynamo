# Doc Dynamo Frontend

A modern React-based frontend for Doc Dynamo, featuring document upload, AI-powered Q&A, concept extraction, YouTube video recommendations, and user authentication with AI-generated profile pictures.

## Features

- **Document Processing**: Upload and process PDF documents with drag-and-drop support
- **AI-Powered Q&A**: Ask questions and get intelligent AI-generated answers based on your documents
- **Concept Extraction**: Automatically extract key concepts from uploaded documents
- **Question Generation**: Generate quiz questions based on document content
- **YouTube Integration**: View related YouTube videos with thumbnails and direct links
- **User Authentication**: 
  - Google OAuth login
  - Email/password authentication
  - Guest login option
  - Password reset functionality
- **Profile Management**: 
  - AI-generated profile pictures using DiceBear API
  - Profile dropdown with user information
  - First name display for cleaner UI
- **Role Selection**: Choose from multiple personas (Student, Researcher, Professional, etc.) for tailored responses
- **Responsive Design**: 
  - Fixed sidebar layout with responsive behavior
  - Mobile-friendly interface
  - Custom scrollbars for dropdown menus
- **Theme Support**: Dark/light theme toggle with persistent settings
- **Modern UI**: Beautiful gradients, animations, and interactive elements

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

3. Create a `.env` file and set your environment variables:
   ```
   VITE_URL=http://yourbackendurl
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
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
  components/          # React components
    ├── MainPanel.jsx     # Main content area with AI features
    ├── Sidebar.jsx       # Document upload and file management
    ├── Login.jsx         # Authentication component
    ├── RoleSelector.jsx  # Persona selection dropdown
    ├── Footer.jsx        # App footer
    ├── UploadBox.jsx     # File upload interface
    ├── WebSearchBox.jsx  # Web search functionality
    └── ProccesedFileList.jsx # Processed files display
  assets/              # Static assets (SVGs, icons)
    ├── brain.svg        # App logo
    ├── questions.svg    # Question generation icon
    ├── concepts.svg     # Concept extraction icon
    ├── mindmap.svg      # Mindmap visualization icon
    ├── videos.svg       # YouTube videos icon
    └── ...             # Other UI icons
  firebase.js          # Firebase configuration
  App.jsx             # Main app layout and routing
  main.jsx            # Entry point
  index.css           # Global styles and theme variables
```

## Key Technologies

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS with custom themes
- **Authentication**: Firebase Auth (Google OAuth, Email/Password)
- **HTTP Client**: Axios for API communication
- **Icons**: React Icons, custom SVG assets
- **Profile Pictures**: DiceBear API for AI-generated avatars
- **Build Tool**: Vite for fast development and building

## Authentication Features

- **Google OAuth**: One-click login with Google accounts
- **Email/Password**: Traditional authentication with validation
- **Guest Mode**: Use the app without creating an account
- **Password Reset**: Secure password recovery via email
- **Persistent Sessions**: 7-day login persistence
- **Profile Management**: AI-generated avatars and user info display

## UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Themes**: Toggle between themes with persistent preference
- **Custom Scrollbars**: Styled scrollbars for dropdown menus
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Interactive Tooltips**: Helpful tooltips for all action buttons
- **Error Handling**: User-friendly error messages and validation
- **Loading States**: Clear loading indicators for all async operations

## API Integration

The frontend integrates with the Doc Dynamo backend API for:

- **Document Upload**: `POST /api/query` - Upload documents and ask questions
- **Concept Extraction**: `POST /generate_concepts` - Extract key concepts
- **Question Generation**: `POST /generate_questions` - Generate quiz questions
- **YouTube Recommendations**: Included in query responses for related videos

## Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure Google provider
3. Get your Firebase configuration values
4. Add them to your `.env` file

### Backend Configuration

Ensure your backend API is running and accessible at the URL specified in `VITE_URL`.

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```




