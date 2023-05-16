type Product = {
  name: string;
  size?: string | number | null;
  sku?: string;
  status: "In Transit" | "Unlisted" | "Listed" | "Unsold" | "Sold" | "Personal";
  purchasePrice: number;
  salePrice: number | null;
  platform?:
    | "StockX"
    | "Goat"
    | "Depop"
    | "eBay"
    | "OfferUp"
    | "Mercari"
    | "Grailed"
    | null;
  category?: "Sneaker" | "Clothing" | "Collectible";
  purchaseDate: string;
  saleDate: string | null;
  dateAdded: string;
  notes?: string;
};

export const listofproducts: Product[] = [
  {
    name: "Nike Air Jordan 1 Retro High OG",
    size: "9.5",
    sku: "SKU-123",
    status: "Sold",
    purchasePrice: 150,
    salePrice: 450,
    platform: "Goat",
    category: "Sneaker",
    purchaseDate: "07/05/2021",
    saleDate: "12/20/2021",
    dateAdded: "07/08/2021",
    notes:
      "Worn twice, excellent condition. Includes original box and laces. Limited edition colorway. Fits true to size.",
  },
  {
    name: "Adidas Yeezy Boost 350 V2",
    size: "10",
    sku: "SKU-456",
    status: "Listed",
    purchasePrice: 220,
    salePrice: null,
    platform: "StockX",
    category: "Sneaker",
    purchaseDate: "01/28/2023",
    saleDate: null,
    dateAdded: "02/04/2023",
    notes:
      "Brand new, never worn. Popular 'Cloud White' colorway. Comes with original box and tags. Fits true to size.",
  },
  {
    name: "Nike Dunk Low Off-White",
    size: "8",
    sku: "SKU-789",
    status: "Sold",
    purchasePrice: 200,
    salePrice: 1200,
    platform: "eBay",
    category: "Sneaker",
    purchaseDate: "11/01/2022",
    saleDate: "03/10/2023",
    dateAdded: "11/07/2022",
    notes:
      "Worn once, like new condition. Includes original box and extra laces. Highly sought-after collaboration with Off-White. Fits true to size.",
  },
  {
    name: "Nike Air Jordan 6 Retro",
    size: "11",
    sku: "SKU-321",
    status: "Listed",
    purchasePrice: 250,
    salePrice: null,
    platform: "Depop",
    category: "Sneaker",
    purchaseDate: "04/15/2023",
    saleDate: null,
    dateAdded: "04/22/2023",
    notes:
      "Brand new, never worn. 'Carmine' colorway. Comes with original box and hang tag. Fits true to size.",
  },
  {
    name: "Nike Air Max 90",
    size: "9",
    sku: "SKU-789",
    status: "Sold",
    purchasePrice: 120,
    salePrice: 160,
    platform: "eBay",
    category: "Sneaker",
    purchaseDate: "03/26/2022",
    saleDate: "04/01/2022",
    dateAdded: "03/28/2022",
    notes:
      "Worn a few times, but in great condition. No scuffs or scratches. Will ship with original box. Fits true to size.",
  },
  {
    name: "Supreme Box Logo Hoodie",
    size: "M",
    sku: "SU1234",
    status: "Listed",
    purchasePrice: 450,
    salePrice: null,
    platform: "StockX",
    category: "Clothing",
    purchaseDate: "05/07/2023",
    saleDate: null,
    dateAdded: "05/16/2023",
    notes: "Limited edition colorway",
  },
  {
    name: "Bape Shark Hoodie",
    size: "XL",
    sku: "BA4567",
    status: "Sold",
    
    purchasePrice: 550,
    salePrice: 1100,
    platform: "Goat",
    category: "Clothing",
    purchaseDate: "04/25/2023",
    saleDate: "05/09/2023",
    dateAdded: "04/29/2023",
    notes: "Rare collaboration with street artist",
  },
  {
    name: "OFF-WHITE Air Force 1",
    size: "11",
    sku: "OW8910",
    status: "Listed",
    purchasePrice: 350,
    salePrice: null,
    platform: "StockX",
    category: "Sneaker",
    purchaseDate: "05/01/2023",
    saleDate: null,
    dateAdded: "05/09/2023",
    notes: "Virgil Abloh's iconic design",
  },
  {
    name: "Palace Tri-ferg Tee",
    size: "L",
    sku: "PA2345",
    status: "Sold",
    purchasePrice: 120,
    salePrice: 320,
    platform: "eBay",
    category: "Clothing",
    purchaseDate: "04/15/2023",
    saleDate: "05/02/2023",
    dateAdded: "04/23/2023",
    notes: "Limited edition collaboration with famous photographer",
  },
  {
    name: "KAWS Companion Resting Place",
    size: "16 inches",
    sku: "KAWS101",
    status: "Sold",
    purchasePrice: 350,
    salePrice: 2000,
    platform: "eBay",
    category: "Collectible",
    purchaseDate: "01/02/2022",
    saleDate: "02/25/2022",
    dateAdded: "12/15/2021",
    notes: "Limited edition of 2000 pieces worldwide",
  },

  {
    name: "Takashi Murakami Flower Cushion",
    size: "18 inches",
    sku: "TM5001",
    status: "Listed",
    purchasePrice: 200,
    salePrice: null,
    platform: "Grailed",
    category: "Collectible",
    purchaseDate: "04/20/2022",
    saleDate: null,
    dateAdded: "04/22/2022",
    notes: "Brand new in original packaging",
  },

  {
    name: "Supreme Oreo Cookies",
    size: null,
    sku: "SUPREMEO",
    status: "Sold",
    purchasePrice: 10,
    salePrice: 50,
    platform: "StockX",
    category: "Collectible",
    purchaseDate: "05/02/2022",
    saleDate: "05/09/2022",
    dateAdded: "04/28/2022",
    notes:
      "Limited edition collaboration with Oreo, sealed in original packaging",
  },
];
