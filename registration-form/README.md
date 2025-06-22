# Multi-Step Registration Form

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd registration-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install axios (if not already included)**
   ```bash
   npm install axios
   ```

4. **Create environment file**
   Create a `.env` file in the project root:
   ```env
   REACT_APP_API_BASE_UR=https://your-api-base.com
   ```
   Replace `https://your-api-base.com` with your actual API base URL.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## How to Run

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Assumptions and Decisions

### Technical Decisions

1. **Vite over Create React App**
   - Chose Vite for faster development experience and modern build tooling

3. **Axios for API Calls**
   - Chose Axios over fetch for better error handling and request/response interceptors
   - Centralized API configuration in `axiosInstance.js`


### Security Considerations

1. **Client-side Validation**
   - Provides immediate user feedback
   - Note: Server-side validation is still required for security

2. **Password Confirmation**
   - Ensures users enter their intended password
   - Real-time matching validation

3. **Environment Variables**
   - API base URL configurable via environment variables
   - No hardcoded sensitive information

## Dependencies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
