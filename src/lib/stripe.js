import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TiqgEL7yFdaGLeXGFZR6vNf',
    'seeker_premium': 'price_1TiqZGL7yFdaGLeXW5FlTQO1',
    "recruiter_growth": 'price_1TiqcbL7yFdaGLeXvEZ8Fu7g',
    'recruiter_enterprise': 'price_1TiqidL7yFdaGLeXCEdmblv8',
}