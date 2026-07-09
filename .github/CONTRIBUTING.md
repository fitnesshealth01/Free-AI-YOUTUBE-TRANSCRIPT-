# Contributing to TranscriptG

Thank you for your interest in contributing to **TranscriptG**! We welcome contributions from developers, creators, and enthusiasts to make this tool even better for everyone.

By contributing, you help us maintain a high-quality, 100% free YouTube transcript generator, AI summarizer, and content repurposing suite.

---

## 🚀 How to Contribute

### 1. Find or Report an Issue
Before writing any code, check the [Issues](../../issues) tab on GitHub to see if someone is already working on what you want to build, or open a new issue to propose a feature or report a bug.

### 2. Set Up Your Local Environment
To set up TranscriptG locally, follow these steps:

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/akashsinghsolanki66/transcriptg.git
   cd transcriptg
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be running locally at `http://localhost:3000`.

### 3. Test Your Changes
Before submitting a pull request, we strongly encourage you to compare and test your changes against the official production version to ensure feature parity and stable behavior:
👉 **Production Environment:** [TranscriptG Live Tool](https://transcriptg.com/)

---

## 🛠️ Pull Request Checklist

When you are ready to submit a Pull Request (PR):
- Ensure your code passes TypeScript validation (`npm run lint` or `tsc --noEmit`).
- Verify your local build completes successfully (`npm run build`).
- Keep your commits organized with clear, descriptive messages.
- Provide a brief description in your PR of what changes you made and why.

Thank you again for making TranscriptG better!
