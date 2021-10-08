import React from "react";

export const OrderHeader = (isVerticalScren: boolean, bids: boolean) => (
    <thead>
      {bids && !isVerticalScren ? (
        <tr>
          <th>TOTAL</th>
          <th>SIZE</th>
          <th>PRICE</th>
        </tr>
      ) : bids && isVerticalScren ? null : (
        <tr>
          <th>PRICE</th>
          <th>SIZE</th>
          <th>TOTAL</th>
        </tr>
      )}
    </thead>
  );