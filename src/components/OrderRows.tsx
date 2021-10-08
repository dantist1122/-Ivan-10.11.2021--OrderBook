import React from "react";
import { numberWithCommas } from "../common/Utils";
import GreenBackground from '../green.png';
import RedBackground from '../red.png';

export const OrderRows = (
  bids: number[][],
  asks: number[][],
  bidsOrAsks: boolean,
  isVerticalScren: boolean
) => {
  const bidsHighestTotal = bids?.map((el) => el[1]).reduce((a, b) => a + b);
  const asksHighestTotal = asks?.map((el) => el[1]).reduce((a, b) => a + b);
  const highestTotal = Math.max(bidsHighestTotal, asksHighestTotal);

  let total: number;
  if (bidsOrAsks && bids) {
    return bids.map((item: number[], index: number) => {
      total = index === 0 ? item[1] : (total += item[1]);
      const deep = (total * 100) / highestTotal;
      const deepDirection = isVerticalScren ? "left" : "right";
      return (
        <tr
          key={index}
          style={{
            backgroundImage: `url(${GreenBackground})`,
            backgroundSize: `${deep}% 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${deepDirection}`,
            // background: `-webkit-gradient(linear,  ${deepDirection1}, ${deepDirection}, color-stop(${deep}%, #123534), color-stop(${deep}%, #131723))`,
          }}
        >
          {!isVerticalScren ? (
            <td>{numberWithCommas(total)}</td>
          ) : (
            <td style={{ color: "#11825c" }}>
              {" "}
              {numberWithCommas(item[0].toFixed(2))}{" "}
            </td>
          )}
          <td> {numberWithCommas(item[1])} </td>
          {!isVerticalScren ? (
            <td style={{ color: "#11825c" }}>
              {" "}
              {numberWithCommas(item[0].toFixed(2))}{" "}
            </td>
          ) : (
            <td>{numberWithCommas(total)}</td>
          )}
        </tr>
      );
    });
  } else if (!bidsOrAsks && asks) {
    let currentTotal: number;
    return asks.map((item, index) => {
      if (isVerticalScren) {
        if (index === 0) {
          total = asksHighestTotal;
          currentTotal = item[1];
        } else {
          total = total -= currentTotal;
          currentTotal = item[1];
        }
      } else {
        total = index === 0 ? item[1] : (total += item[1]);
      }
      const deep = (total * 100) / highestTotal;
      return (
        <tr
          key={index}
          style={{
            backgroundImage: `url(${RedBackground})`,
            backgroundSize: `${deep}% 100%`,
            backgroundRepeat: 'no-repeat',
            // background: `-webkit-gradient(linear, left top, right top, color-stop(${deep}%, #3d1e28), color-stop(${deep}%, #131723))`,
          }}
        >
          <td style={{ color: "#9f2e32" }}>
            {" "}
            {numberWithCommas(item[0].toFixed(2))}{" "}
          </td>
          <td> {numberWithCommas(item[1])} </td>
          <td>{numberWithCommas(total)}</td>
        </tr>
      );
    });
  }
};
