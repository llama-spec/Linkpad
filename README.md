
## Introduction  
**Text-Editor** is a real-time collaborative web application that allows users to share and edit documents. With features like live cursors, real-time text updates, and threaded comments, it’s an tool for teams, writers, and developers looking to collaborate efficiently.  

## Features  
- **Real-Time Collaboration**: Edit documents with others in real time. Changes are synced for all participants.  
- **Live Cursor**: See the cursors of other collaborators as they edit the document.  
- **Threaded Comments**: Leave comments and create threads for discussions directly in the document.  
- **Modern UI**: Built with **Tailwind CSS** for a sleek and responsive design.  
- **Secure Authentication**: User accounts are managed using **Clerk**, ensuring secure access.
## Tech Stack  
- **Frontend and Backend**: [Next.js](https://nextjs.org/) and [React](https://react.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Authentication**: [Clerk](https://clerk.dev/)  
- **Real-Time Collaboration**: [Liveblocks](https://liveblocks.io/)  
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)  

## Installation  

### Prerequisites  
Make sure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)  

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/text-editor.git
   cd text-editor
   ```  
2. Install dependencies:  
   ```bash
   yarn install
   ```  
   or  
   ```bash
   npm install
   ```  

3. Create a `.env.local` file in the root directory and add the necessary environment variables:  
   ```plaintext
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   
   LIVEBLOCKS_SECRET_KEY=your-liveblocks-secret-key
   ```  

4. Run the development server:  
   ```bash
   yarn dev
   ```  
   or  
   ```bash
   npm run dev
   ```  

5. Open the app in your browser:  
   ```plaintext
   http://localhost:3000
   ```  

## Usage  
- **Create a new document**: Start a new document and share it by using the email of collaborator.  
- **Collaborate**: See live updates from collaborators and interact via comments and threads.  
- **Customize**: Use the modern, responsive UI to focus on your workflow.  
