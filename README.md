# Igniting Minds Website

The official website for Igniting Minds (IM), built with Next.js and featuring modern web technologies for an engaging user experience.

## Features

- **Responsive Design**: Built with Material-UI for consistent, mobile-first design
- **Interactive Maps**: Google Maps and Mapbox integration for location-based features
- **Data Visualization**: Charts and data grids using MUI X components
- **Smooth Animations**: AOS (Animate On Scroll) and Typed.js for dynamic content
- **Form Handling**: Robust form management with Formik
- **Image Processing**: Optimized image handling with Sharp
- **Social Sharing**: React Share integration for content distribution

## Tech Stack

- **Framework**: Next.js 14.0.4
- **UI Library**: Material-UI (MUI) v5.15.2
- **Maps**: React Google Maps API, Mapbox GL
- **Charts**: MUI X Charts & Data Grid
- **Forms**: Formik with validation
- **Animations**: AOS, Typed.js
- **Icons**: React Icons, MUI Icons

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local` and configure API keys
   - Add Google Maps API key
   - Add Mapbox access token

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production version
- `npm run start` - Start production server on port 3000
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
├── src/              # Source code
├── public/           # Static assets
├── server.js         # Custom server configuration
├── next.config.js    # Next.js configuration
└── package.json      # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Submit a pull request

## License

This project is private and proprietary to Igniting Minds.
