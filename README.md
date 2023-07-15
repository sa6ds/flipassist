# flipassist

flipassist is a full-stack web application tailored for resellers, streamlining inventory management and maximizing profitability. It provides a comprehensive dashboard, inventory management system, advanced calculators, reseller tools, and real-time monitors for Twitter pages. With flipassist, resellers can gain real-time insights into their business performance, optimize pricing strategies, and enhance profitability.

View the live demo at [flipassist.app](https://www.flipassist.app/).

## Features

- **Dashboard:** The dashboard presents a summary of inventory, product count, inventory value, sales, and profits. It also displays recent activity, showing recently added items, and a line chart depicting the selling history for business growth analysis.

- **Inventory Management:** The inventory tab comes with search, filtering, and CRUD functionalities. Users can filter items by product type, listing status (listed, sold, or unlisted), and manage their inventory with ease.

- **Calculators:** flipassist includes advanced calculators tailored for popular platforms like GOAT, StockX, Grailed, and eBay. These calculators enable resellers to perform precise profit calculations and account for expected fees, assisting in optimizing pricing strategies and enhancing profitability.

- **Reseller Tools:** The tools tab provides reseller tools such as Address Jigger, Gmail Dot trick, and proxy delay calculator. These tools empower users to optimize their workflow and maximize efficiency in their reselling operations.

- **Real-Time Monitors:** The monitors tab offers real-time monitors for reseller Twitter pages. Users receive instant notifications on new product releases, giving them a competitive edge in securing high-demand items.

## Tech Stack

- **Frontend:** flipassist is built with Next.js, a React framework for server-side rendering and static site generation. TypeScript is used for type safety and a better development experience. Tailwind CSS is employed for styling the user interface.

- **Backend:** The backend utilizes tRPC for API handling and Prisma for database access. NextAuth provides authentication functionality to ensure secure access to the application.

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

- `DATABASE_URL`: Set this variable to the URL of your database. This is required for the connection to your database.

- `NEXTAUTH_SECRET`: Set this variable to a secure secret key for NextAuth. You can generate a new secret using a command-line tool like `openssl rand -base64 32`. This secret is used to sign and encrypt session tokens.

- `NEXTAUTH_URL`: Set this variable to the URL of your flipassist application. In this case, it should be set to `http://localhost:3000` for local development.

- `GOOGLE_CLIENT_ID`: Set this variable to the client ID of your Google OAuth application. This is required for authentication with Google.

- `GOOGLE_CLIENT_SECRET`: Set this variable to the client secret of your Google OAuth application. This is also required for authentication with Google.

Make sure to obtain the necessary values for these variables and set them in your environment configuration before running flipassist.

## License

The code for flipassist is available under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code as per the terms of the license.

## Contact

For any questions or inquiries, please contact me [here](saad.sadouk7@gmail.com).

Thank you for using flipassist! I hope it simplifies your reselling operations and enhances your profitability. Happy flipping!
