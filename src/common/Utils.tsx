import { OrderType } from "./types";

export const handleBidsDelta = (orders: OrderType, order: number[]) => {
  const index = orders.bids?.findIndex(
    (el: number[]) => el[0] === order[0]
  );
  if (order[1] === 0) {
    if (index > -1) {
      orders.bids.splice(index, 1);
    }
  } else if (index > -1) {
    orders.bids[index] = order;
  } else {
    const indexToInsert = orders.bids?.findIndex(
      (el: number[]) => el[0] > order[0]
    );
    orders.bids.splice(indexToInsert, 0, order);
  }
};

export const handleAsksDelta = (orders: OrderType, order: number[]) => {
  const index = orders.asks?.findIndex(
    (el: number[]) => el[0] === order[0]
  );
  if (order[1] === 0) {
    if (index > -1) {
      orders.asks.splice(index, 1);
    }
  } else if (index > -1) {
    orders.asks[index] = order;
  } else {
    const indexToInsert = orders.asks?.findIndex(
      (el: number[]) => el[0] > order[0]
    );
    orders.asks.splice(indexToInsert, 0, order);
  }
};

export const descendingSort = (orders: number[][]) => {
  orders.sort(function (a: number[], b: number[]) {
    return b[0] - a[0];
  });
};

export const ascendingSort = (orders: number[][]) => {
  orders.sort(function (a: number[], b: number[]) {
    return a[0] - b[0];
  });
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateNumberOfRows = (isVericalScreen: boolean) => {
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const rowHeight = isVericalScreen ? 80 : 40;
  return Math.floor((windowHeight - 120) / rowHeight);
};

export const isScrenVertical = () => {
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return windowHeight > windowWidth;
};
