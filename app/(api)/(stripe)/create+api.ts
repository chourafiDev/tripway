import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { name, email, amount } = await request.json();

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: "Please provide all fields valid", status: 400 })
    );
  }

  let customer;

  const customerExsits = await stripe.customers.list({ email });

  if (customerExsits.data.length > 0) {
    customer = customerExsits.data[0];
  } else {
    const newCustomer = await stripe.customers.create({ name, email });
    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2019-11-05" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    })
  );
}
