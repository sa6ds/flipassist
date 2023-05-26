import { listofproducts } from "./dummyData";

export const generateChartData = () => {
  const salesMap = new Map<string, number>();
  const profitMap = new Map<string, number>();

  listofproducts.forEach((product) => {
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
        borderColor: "purple",
      },
      {
        label: "Profits",
        data: profitData,
        borderColor: "black",
      },
    ],
  };
};

// export const generateChartData = () => {
//   const filteredProducts = listofproducts.filter(
//     (product) => !product.salePrice
//   );

//   const inventoryMap = filteredProducts.reduce((map, product) => {
//     const formattedDate = new Date(product.purchaseDate).toLocaleDateString();

//     const currentValue = map.get(formattedDate) || 0;
//     map.set(formattedDate, currentValue + product.purchasePrice);

//     return map;
//   }, new Map<string, number>());

//   const sortedInventory = Array.from(inventoryMap).sort(
//     (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
//   );

//   let accumulatedValue = 0;
//   const chartLabels: string[] = [];
//   const chartData: number[] = [];
//   const salesData: number[] = [];

//   sortedInventory.forEach((entry) => {
//     const [date, value] = entry;
//     accumulatedValue += value;
//   });

//   sortedInventory.forEach((entry) => {
//     const [date, value] = entry;
//     chartLabels.push(date);
//     accumulatedValue += value;
//     chartData.push(accumulatedValue);
//   });

//   return {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Inventory Value",
//         data: chartData,
//         borderColor: "red",
//         borderWidth: 1,
//         fill: false,
//       },
//     ],
//   };
// };
