import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDB } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = headers().get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No stripe signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.metadata?.userId) {
          return NextResponse.json(
            { error: "No userId provided" },
            { status: 400 }
          );
        }

        try {
          const userRef = adminDB
            .collection("users")
            .doc(session.metadata.userId);

          const userDoc = await userRef.get();
          const updateData = {
            isPro: true,
            subscriptionId: session.subscription as string,
            subscriptionStatus: "active",
            stripeCustomerId: session.customer as string,
          };

          if (!userDoc.exists) {
            await userRef.set(updateData);
          } else {
            await userRef.update(updateData);
          }
          return NextResponse.json({ success: true });
        } catch (error) {
          return NextResponse.json(
            { error: "Error updating user" },
            { status: 500 }
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Get the Firebase UID from customer metadata
        const customer = (await stripe.customers.retrieve(
          subscription.customer as string
        )) as Stripe.Customer;
        const firebaseUID = customer.metadata.firebaseUID;

        if (!firebaseUID) {
          return NextResponse.json(
            { error: "No firebaseUID found" },
            { status: 400 }
          );
        }

        try {
          const userRef = adminDB.collection("users").doc(firebaseUID);

          await userRef.update({
            isPro: false,
            subscriptionId: null,
            subscriptionStatus: "canceled",
          });
          return NextResponse.json({ success: true });
        } catch (error) {
          return NextResponse.json(
            { error: "Error updating user" },
            { status: 500 }
          );
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
