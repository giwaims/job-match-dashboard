# AI-Powered Job Match Dashboard

A mini job recommendation dashboard built with Next.js, React, TypeScript, and Tailwind CSS for a Frontend Developer interview assignment.

## How to Run
1. Clone the repo: `git clone https://github.com/giwaims/job-match-dashboard.git`
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`
4. Open `http://localhost:3000` in your browser.

## Features
- Job list with AI-generated match scores fetched dynamically via `fetch` API
- Visual progress bars (green for 80%+, yellow for 50-79%, red for <50%)
- Modal with job details and required skills
- "Apply Now" button with skill-check feedback
- Fully responsive design using Tailwind CSS
- TypeScript for type safety
- State management with React Context API

## Tech Stack
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Data Fetching**: Fetch API (mock data from `public/jobs.json`)

## Notes
- Job data is mocked in `public/jobs.json` and fetched at runtime.

## Project Structure