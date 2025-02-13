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
    const { token } = await req.json();
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const userSnapshot = await adminDB.collection("users").doc(userId).get();
    const userData = userSnapshot.data();

    if (!userData?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    try {
      // First verify the customer exists
      const customer = await stripe.customers.retrieve(
        userData.stripeCustomerId
      );

      if (customer.deleted) {
        return NextResponse.json(
          { error: "Customer no longer exists" },
          { status: 404 }
        );
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: userData.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
      });

      return NextResponse.json({ url: session.url });
    } catch (stripeError) {
      // Only clear data if customer doesn't exist in Stripe
      if (stripeError instanceof Error) {
        if ((stripeError as any).code === "resource_missing") {
          await adminDB.collection("users").doc(userId).update({
            stripeCustomerId: null,
            isPro: false,
            subscriptionId: null,
            subscriptionStatus: "canceled",
          });
        }

        return NextResponse.json(
          { error: stripeError.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
