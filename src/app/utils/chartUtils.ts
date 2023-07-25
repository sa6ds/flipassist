interface Product {
  id: string;
  name: string;
  size?: string;
  sku?: string;
  status?: "Unlisted" | "Listed" | "Sold";
  platform?: string | null;
  category?: "Sneaker" | "Clothing" | "Collectible" | null;
  purchasePrice: number;
  salePrice?: number | null;
  purchaseDate: string;
  saleDate?: string | null;
  dateAdded: string;
  notes?: string | null;
}

export const generateChartData = (products: Product[]) => {
  const salesMap = new Map<string, number>();
  const profitMap = new Map<string, number>();

  products.forEach((product) => {
    const { saleDate, salePrice, purchasePrice } = product;
    if (saleDate && salePrice) {
      const formattedDate = new Date(saleDate).toLocaleDateString();
      const accumulatedSales = salesMap.get(formattedDate) || 0;
      const profit = salePrice - purchasePrice;
      salesMap.set(formattedDate, accumulatedSales + salePrice);
      profitMap.set(
        formattedDate,
        (profitMap.get(formattedDate) || 0) + profit
      );
    }
  });

  const sortedSales = Array.from(salesMap).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  const sortedProfit = Array.from(profitMap).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  const chartLabels: string[] = [];
  const salesData: number[] = [];
  const profitData: number[] = [];

  let accumulatedSales = 0;
  let accumulatedProfit = 0;

  sortedSales.forEach((entry) => {
    const [date, value] = entry;
    chartLabels.push(date);
    accumulatedSales += value;
    salesData.push(accumulatedSales);
  });

  sortedProfit.forEach(([_, value]) => {
    accumulatedProfit += value;
    profitData.push(accumulatedProfit);
  });

  return {
    labels: chartLabels,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        borderColor: "#9333ea",
      },
      {
        label: "Profits",
        data: profitData,
        borderColor: "#111827",
      },
    ],
  };
};
