import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";
import AddIcon from "@mui/icons-material/Add";

import type { GetServerSideProps, NextPage } from "next";
import Footer from "~/Components/Footer";
import PageHead from "~/utils/PageTitle";

const today = new Date();
const currentDate = today.toLocaleDateString("en-US"); // outputs "5/12/2023" in US English locale format

const Inventory: NextPage = () => {
  return (
    <div className="min-h-[100vh]">
      <PageHead title="flipassist | Inventory" />
      <Sidebar />
      <div className="ml-0 truncate font-light md:ml-[300px]">
        <Header pageTitle="Inventory" />
        <div className="mx-8 my-10 ">
          {/* UPPER PART */}

          <div className="lg:flex">
            <input
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-5 py-1.5 lg:w-4/12"
              placeholder="Search"
            />

            <div className="ml-auto mt-4 flex flex-wrap gap-3 lg:mt-0">
              <div className="gap-5">
                <button className="duration-1500w-14 w-12 rounded-md border border-black bg-gray-200 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  <AddIcon />
                </button>
              </div>
              <div>
                <button className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  Status
                </button>
              </div>
              <div>
                <button className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  Platform
                </button>
              </div>
              <div>
                <button className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  Other
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full overflow-x-auto truncate">
              <thead className="border-b-2">
                <tr className="text-left font-extrabold tracking-wide">
                  <th className="p-4">Name</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Purchase Price</th>
                  <th className="p-4">Sale Price</th>
                  <th className="p-4">Profit</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Purchase Date</th>
                  <th className="p-4">Sale Date</th>
                  <th className="p-4">Date Added</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="h-10 hover:bg-gray-100">
                  <td className="p-4 text-blue-400 hover:underline">
                    Jordan 4 Fire Red
                  </td>
                  <td className="p-4">10.5</td>
                  <td className="p-4">SKU-001</td>
                  <td className="p-4">Listed</td>
                  <td className="p-4">$220.00</td>
                  <td className="p-4">$450.00</td>
                  <td className="p-4">$230.00</td>
                  <td className="p-4">GOAT</td>
                  <td className="p-4">3/14/2022</td>
                  <td className="p-4">3/14/2022</td>
                  <td className="p-4">{currentDate}</td>
                  <td className="max-w-[400px] truncate p-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod voluptatum quaerat non officia cum, voluptates
                    voluptatibus velit assumenda saepe doloribus debitis
                    dolorum, veniam, quidem at exercitationem! Aliquid
                    consectetur vitae quibusdam!
                  </td>
                </tr>
                {/*  */}
                <tr className="h-10 hover:bg-gray-100">
                  <td className="p-4 text-blue-400 hover:underline">
                    Jordan 5 Off White
                  </td>
                  <td className="p-4">11</td>
                  <td className="p-4">SKU-562</td>
                  <td className="p-4">Sold</td>
                  <td className="p-4">$245.00</td>
                  <td className="p-4">$520.00</td>
                  <td className="p-4">$275.00</td>
                  <td className="p-4">StockX</td>
                  <td className="p-4">1/05/2021</td>
                  <td className="p-4">6/25/2022</td>
                  <td className="p-4">{currentDate}</td>
                  <td className="max-w-[400px] truncate p-4">Testing Notes</td>
                </tr>
                {/*  */}
                <tr className="h-10 hover:bg-gray-100">
                  <td className="p-4 text-blue-400 hover:underline">
                    Jordan 4 Bred
                  </td>
                  <td className="p-4">8.5</td>
                  <td className="p-4">SKU-612</td>
                  <td className="p-4">Sold</td>
                  <td className="p-4">$145.00</td>
                  <td className="p-4">$220.00</td>
                  <td className="p-4">$75.00</td>
                  <td className="p-4">GOAT</td>
                  <td className="p-4">2/11/2022</td>
                  <td className="p-4">4/17/2023</td>
                  <td className="p-4">{currentDate}</td>
                  <td className="max-w-[400px] truncate p-4">
                    Super cool test here
                  </td>
                </tr>
                {/*  */}
                <tr className="h-10 hover:bg-gray-100">
                  <td className="p-4 text-blue-400 hover:underline">
                    Jordan 4 Bred
                  </td>
                  <td className="p-4">8.5</td>
                  <td className="p-4">SKU-612</td>
                  <td className="p-4">Sold</td>
                  <td className="p-4">$145.00</td>
                  <td className="p-4">$220.00</td>
                  <td className="p-4">$75.00</td>
                  <td className="p-4">GOAT</td>
                  <td className="p-4">2/11/2022</td>
                  <td className="p-4">4/17/2023</td>
                  <td className="p-4">{currentDate}</td>
                  <td className="max-w-[400px] truncate p-4">
                    Super cool test here
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[288px]">
        <Footer />
      </div>
    </div>
  );
};

export default Inventory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await requireAuthentication(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentSession: session,
    },
  };
};

// TODO:
// - Add table column click sorting functionality

// - More pleasing mobile UI

// - Dropdown button to filter table (show only what includes selected variable)

// - Add Item Modal

// - Edit Item Modal
