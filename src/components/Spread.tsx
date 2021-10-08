export const Spread = (
  bids: number[][],
  asks: number[][],
  isVerticalScren: boolean
) => {
  const amount = isVerticalScren
    ? asks && bids && (asks[asks.length - 1][0] - bids[0][0]).toFixed(1)
    : asks && bids && (asks[0][0] - bids[0][0]).toFixed(1);
  const precentage = isVerticalScren
    ? asks &&
      bids &&
      (
        ((asks[asks.length - 1][0] - bids[0][0]) * 100) /
        asks[asks.length - 1][0]
      ).toFixed(2)
    : asks &&
      bids &&
      (((asks[0][0] - bids[0][0]) * 100) / asks[0][0]).toFixed(2);

  return <span className="spread">{`Spread: ${amount} (${precentage}%)`}</span>;
};
