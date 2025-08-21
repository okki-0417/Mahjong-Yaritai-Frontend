# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "麻雀ヤリタイ" (Mahjong Yaritai) - a Japanese mahjong community platform built with Next.js 15 + React 18 + TypeScript. The app focuses on mahjong problem-solving, voting, commenting, and learning features.

## Development Commands

### Core Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format

# Generate API client from OpenAPI spec
npm run gen-client
```

### Environment Setup

```bash
# Set up environment variables
cp .env.local .env

# Set up Git hooks (auto-runs ESLint & Prettier on commit)
git config core.hooksPath .githooks
chmod +x .githooks/*
```

## Architecture Overview

### Application Structure

- **Next.js App Router**: Uses Next.js 15 with App Router pattern
- **Feature-Based Architecture**: Each feature is self-contained in `src/features/`
- **Context-Based State Management**: Uses React Context API with feature-specific providers
- **Type-Safe API Integration**: Auto-generated Zodios client from OpenAPI spec

### Key Directories

- `src/app/` - Next.js App Router pages and global providers
- `src/features/` - Feature-specific components, contexts, and types
- `src/components/` - Shared UI components
- `src/zodios/` - Auto-generated API client
- `src/lib/api/` - API client wrappers for SSR/CSR
- `src/context-providers/` - Global context providers

### State Management Pattern

The app uses a hierarchical Context provider pattern:

1. **Global Auth Context** (`AuthStateContextProvider`) - Wraps entire app
2. **Feature-Specific Contexts** - Each feature has its own context providers
3. **Server-Side Data Fetching** - Uses async server components for initial data

### API Integration

- **Generated Client**: `src/zodios/api.ts` - Auto-generated from `../api/swagger/v1/swagger.yaml`
- **Server-Side API**: `src/lib/api/server.ts` - For SSR with cookie handling
- **Client-Side API**: `src/lib/api/client.ts` - For CSR with credentials
- **Type Safety**: Full TypeScript coverage with Zod schema validation

### Component Architecture

- **Hybrid Rendering**: Server components for data fetching, client components for interactivity
- **UI Framework**: Chakra UI 2.x + Tailwind CSS 4.x
- **Japanese Language**: All UI text and metadata in Japanese

### Main Features

1. **what-to-discard-problems** - Core feature with voting, commenting, and problem-solving (currently using schema-based validation)
2. **Auth System** - Login/logout with session management via Google OAuth
3. **User Profiles** - User management and profile editing
4. **Learning Module** - Educational content

## Development Patterns

### API Client Usage

```typescript
// Server-side (in server components)
import createApiPageClient from "@/src/lib/api/server";
const apiPageClient = await createApiPageClient();

// Client-side (in client components)
import { apiClient } from "@/src/lib/api/client";
```

### Context Provider Pattern

Each feature follows this pattern:

- `contexts/` - Context definitions
- `providers/` - Provider components
- Providers are composed in feature pages or globally

### File Organization

- Server components: No 'use client' directive
- Client components: Start with 'use client'
- Types: Feature-specific types in `features/[feature]/types/`
- Shared types: Auto-generated in `src/zodios/api.ts`

## Important Technical Details

### Sentry Integration

- Error monitoring configured in `next.config.mjs`
- Automatic error tracking for both client and server
- Source maps uploaded in CI environment

### TypeScript Configuration

- Strict mode disabled but comprehensive type checking
- Path aliases: `@/*` maps to repository root
- Modern ESNext target with lib configuration

### Styling System

- Chakra UI with custom theme
- Tailwind CSS 4.x with modern features
- Global styles in `src/styles/globals.css`
- Package imports optimized in Next.js config

### API Generation

When backend API changes, regenerate the client:

```bash
npm run gen-client
```

This updates `src/zodios/api.ts` from the OpenAPI spec at `../api/swagger/v1/swagger.yaml`.

### Testing

Currently, no test framework is configured. Consider implementing tests with Jest or Vitest for critical components.

### Development Workflow

1. The pre-commit hook automatically runs ESLint and Prettier on staged files
2. Use `npm run typecheck` to verify TypeScript types before committing
3. The backend API must be running on `http://localhost:3001` (configured in `.env`)

### Current Architecture Notes

- The `what-to-discard-problems` feature uses custom Zod schema validation for complex form validation
- Multiple context providers are being consolidated into a cleaner architecture
- Auth flow uses Google OAuth with server-side callback handling
