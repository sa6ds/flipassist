import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps } from "firebase-admin/app";
import { cert } from "firebase-admin/app";
import Stripe from "stripe";
import { adminDB } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export async function POST(req: Request) {
  try {
    const { price_id, token } = await req.json();
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Create or get Stripe customer
    const userSnapshot = await adminDB.collection("users").doc(userId).get();
    const userData = userSnapshot.data();

    let customerId = userData?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUID: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to Firebase
      await adminDB.collection("users").doc(userId).update({
        stripeCustomerId: customerId,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/upgrade?canceled=true`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
