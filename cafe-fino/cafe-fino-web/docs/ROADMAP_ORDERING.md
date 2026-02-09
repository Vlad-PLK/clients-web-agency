# Online Ordering Roadmap

Goal: turn Click and Collect into a real order flow without rewriting UI.

## Phase 0: Current State

- Cart and UI are local-only in [src/store/useCartStore.js](../src/store/useCartStore.js).
- Checkout form does not submit.

## Phase 1: API Contract

Define API endpoints for:

- Menu retrieval
- Order creation
- Pickup time slots
- Location availability

Create a client module for API calls and wire it into ClickCollect.

## Phase 2: Server Integration

- Replace local menu read with API fetch.
- Submit order data and show confirmation state.

## Phase 3: Payments

- Add payment provider flow.
- Store payment status and order id.

## Phase 4: Operations

- Admin view of incoming orders.
- Time slot and capacity management.
- Email and SMS confirmations.
