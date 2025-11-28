# E-commerce Frontend (React + Vite + Tailwind + React Query + Zustand)

## What's included
- React + Vite scaffold
- Tailwind CSS with dark mode
- React Query for server state
- Zustand for client state (auth + UI dark mode)
- API layer (axios)
- Admin area with product CRUD and simple image upload (base64)
- Small UI component library (Button/Input)

## Quick start
1. Copy project and install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and set `VITE_API_URL` to your backend.
3. Start dev server:
   ```bash
   npm run dev
   ```

## Notes
- Admin CRUD assumes backend routes `/api/products` with admin auth.
- Image upload uses base64 and stores images as strings to the backend; replace with S3/Cloudinary for production.
- This project is a scaffold—improve validation, error handling, and accessibility as needed.
