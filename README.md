# flipassist

[![Twitter](https://img.shields.io/badge/flipassist-black?logo=x&style=flat-square)](https://twitter.com/flipassist)
[![Discord](https://img.shields.io/badge/flipassist.app-7289DA?logo=discord&style=flat-square)](https://discord.gg/ewTSMprYdg)

flipassist is a full-stack web application tailored for resellers, streamlining inventory management and maximizing profitability. It provides a comprehensive dashboard, inventory management system, advanced calculators, reseller tools, and real-time monitors for Twitter pages. With flipassist, resellers can gain real-time insights into their business performance, optimize pricing strategies, and enhance profitability.


https://github.com/user-attachments/assets/4a73ebc9-6ad3-4aa8-bb05-0b1ed3bd61ab


View the site live at [flipassist.app](https://www.flipassist.app/).

## Features

- **Dashboard:** The dashboard presents a summary of inventory, product count, inventory value, sales, and profits. It also displays recent activity, showing recently added items, and a line chart depicting the selling history for business growth analysis.

- **Inventory Management:** The inventory tab comes with search, filtering, and CRUD functionalities. Users can filter items by product type, listing status (listed, sold, or unlisted), and manage their inventory with ease.

- **Calculators:** flipassist includes advanced calculators tailored for popular platforms like GOAT, StockX, Grailed, and eBay. These calculators enable resellers to perform precise profit calculations and account for expected fees, assisting in optimizing pricing strategies and enhancing profitability.

- **Reseller Tools:** The tools tab provides reseller tools such as Address Jigger, Gmail Dot trick, and proxy delay calculator. These tools empower users to optimize their workflow and maximize efficiency in their reselling operations.

- **Real-Time Monitors:** The monitors tab offers real-time monitors for reseller Twitter pages. Users receive instant notifications on new product releases, giving them a competitive edge in securing high-demand items.

## Tech Stack

- **Frontend:** flipassist is built with Next.js, a React framework for server-side rendering and static site generation. TypeScript is used for type safety and a better development experience. Tailwind CSS is employed for styling the user interface.

- **Backend:** flipassist utilizes Firebase for backend operations, providing secure, scalable cloud-based solutions for database management, authentication, and storage. Stripe is integrated for handling transactions, subscriptions, and secure online payments.


## Installation and Usage

To run flipassist locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/sa6ds/flipassist.git
   ```

2. Navigate to the project directory:

   ```shell
   cd flipassist
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the required environment variables. Refer to the configuration section below.

5. Start the development server:

   ```shell
   npm run dev
   ```

6. Access flipassist in your browser at `http://localhost:3000`.


## Configuration

To configure flipassist, you need to set up the following environment variables:

#### Firebase Configuration

These variables should be obtained from your Firebase project settings:

- `NEXT_PUBLIC_FIREBASE_API_KEY`: API Key of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Authentication domain of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Project ID of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Storage Bucket URL of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Messaging Sender ID of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_APP_ID`: App ID of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: Measurement ID of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL`: Admin Client Email of your Firebase project.
- `NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY`: Admin Private Key of your Firebase project.

#### TinyURL Configuration

- `NEXT_PUBLIC_TINY_URL_API_KEY`: API Key for the TinyURL service.

#### Stripe Configuration

These variables should be obtained from your Stripe account:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Publishable Key for your Stripe account.
- `NEXT_PUBLIC_STRIPE_SECRET_KEY`: Secret Key for your Stripe account.
- `NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET`: Webhook Secret for Stripe events.
- `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID`: Price ID for the monthly subscription in Stripe.
- `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID`: Price ID for the yearly subscription in Stripe.

#### Application Configuration

- `NEXT_PUBLIC_BASE_URL`: Base URL of your application.

Make sure to obtain the necessary values for these variables and set them in your environment configuration before running flipassist.


## License

The code for flipassist is available under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code as per the terms of the license.

## Contact

For any questions or inquiries, please contact me [here](saad.sadouk7@gmail.com).

Thank you for using flipassist! I hope it simplifies your reselling operations and enhances your profitability. Happy flipping!
