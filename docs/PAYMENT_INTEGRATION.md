# Payment Integration & Swipe Limits

## Overview

We have introduced a tiered subscription system to limit daily job applications (right swipes) for candidates.

- **Free Tier**: 10 swipes/day (Default)
- **Premium**: 50 swipes/day (20 INR)
- **Pro**: 100 swipes/day (50 INR)

## Backend Implementation

The backend has been updated to support this:

1.  **Database**: Added `SubscriptionTier` enum and `subscription_tier` field to `User`. Added `Payment` model.
2.  **API**:
    - `POST /payments/create-order`: Creates a Razorpay order.
    - `POST /payments/verify`: Verifies payment and upgrades user tier.
3.  **Logic**: `job.controller.ts` now checks the user's tier and enforces limits (10/50/100) before allowing a right swipe.
    - Returns `429 Too Many Requests` with code `SWIPE_LIMIT_REACHED` if limit is exceeded.

## Frontend Implementation

### 1. Install Razorpay SDK

Add the Razorpay checkout script to `index.html`.

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### 2. Handle Swipe Limit Reached

In `Jobs.tsx` (Swipe Card component):

- Catch `429` errors and check for `SWIPE_LIMIT_REACHED` code.
- Trigger the **Upgrade Modal**.

### 3. Upgrade Modal Component

A modal displaying the plans:

- **Premium** (20 INR) - 50 Applications/Day
- **Pro** (50 INR) - 100 Applications/Day

**Button Action**:

1. Call `POST /payments/create-order` with `{ plan: 'premium' | 'pro' }`.
2. Initialize Razorpay with the returned `order_id` and `key_id`.
3. On success, call `POST /payments/verify` with the payment signature.

### 4. API Endpoints

#### Create Order

- **URL**: `/api/payments/create-order`
- **Method**: `POST`
- **Body**: `{ "plan": "premium" | "pro" }`

#### Verify Payment

- **URL**: `/api/payments/verify`
- **Method**: `POST`
- **Body**: `{ "razorpay_order_id": "...", "razorpay_payment_id": "...", "razorpay_signature": "...", "plan": "..." }`
