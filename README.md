# Immfly Test App

React Native implementation of the Immfly technical exercise. The app guides a crew member through browsing the onboard catalogue, managing a cart, and completing a split payment flow that mirrors the interaction described in the brief.

## Core Functionality

- **Catalogue Screen** (`CatalogPage`)

  - Fetches product data from the REST endpoint defined in `.env` (`API_URL`).
  - Groups products by category and renders them inside an accordion (`CategoryAccordionList`).
  - Each product card shows the price converted to the currently selected currency and adapts to the active sale type (Retail, Crew, etc.).
  - Adds items to the global cart, incrementing/decrementing quantities without leaving the screen.

- **Cart Summary Bar** (`CartList`)

  - Lives at the bottom of the catalogue screen whenever the cart has content.
  - Displays the running total with currency conversion, quick sale-type selector, and alternative currency equivalents.
  - "Pay" button routes to the ticket detail screen while preserving the cart state.

- **Ticket Screen** (`TicketPage`)

  - Lists cart line items with swipe-to-delete support and quantity adjustments via a modal.
  - Seat selector lets the crew assign row and seat to the order.
  - Cash and Card actions open the payment split modal to choose between all-cash, all-card, or 50/50 scenarios.
  - On confirmation the app sends a payment request to `POST /pay`, clears the cart, displays feedback via Toast, and returns to the catalogue.

- **Payment Split Modal** (`PaymentSplitModal`)

  - Presents the common split presets and passes the chosen breakdown back to the ticket page.
  - Designed to be reusable if new split strategies are needed.

- **State Management (Redux Toolkit)**

  - `catalog.slice` keeps products, exchange rates, sale type, and currency. It exposes the `loadProducts`/`loadRates` async thunks and currency conversion helper.
  - `cart.slice` stores cart lines with quantity management helpers (`addItem`, `increment`, `decrement`, `removeItem`, `clear`).
  - Selectors (`selectCartArray`, `selectCartTotal`, etc.) are shared between screens to keep derived data consistent.

- **API Layer** (`src/api/catalog.api.ts`)
  - Wraps fetch calls to products, exchange rates, and payment submission.
  - Automatically swaps `localhost` for the Android emulator host `10.0.2.2`.

## Project Structure Highlights

```
src/
  api/                // Network calls and typings
  components/         // Reusable UI pieces (ProductCard, CartList, PaymentSplitModal, etc.)
  navigation/         // Stack navigator setup
  pages/              // Feature screens (Catalog, Ticket)
  store/              // Redux store, slices, typed hooks
```

Styles are colocated via `<Component>.styles.ts` files to keep JSX clean while staying inside the React Native `StyleSheet` model.

## Environment

Create a `.env` file (already included in the repo) that points to the backend or mock server that implements `/products`, `/rates`, and `/pay` routes.

```
API_URL=http://localhost:4000
```

Metro needs to be restarted when the `.env` changes because the app uses `react-native-dotenv` via the Babel plugin (`@env` imports).

## Running the App

```bash
npm install

npm start

npm run android
```

### Split Payment API Mocking

If you use `json-server` or a similar stub, make sure the `POST /pay` endpoint responds with at least:

```json
{ "ok": true, "message": "Payment accepted" }
```

The Ticket screen relies on this response to show the success toast and reset navigation.

## Testing

The project includes page-level Jest tests in `__tests__/pages` to exercise catalogue loading states and the full ticket payment flow.

```bash
npm test
```

React Native mocks for `NativeAnimatedHelper`, toast notifications, navigation, and custom components keep tests focused on our business logic.

## Notable Design Choices

- Redux Toolkit allows deterministic state transitions and shared logic between screens.
- Currency conversion and sale-type pricing are calculated centrally to avoid duplication.
- Payment split modal keeps the door open for additional split options or custom amounts.
- Toast feedback keeps the crew flow fast without leaving the ticket screen.
