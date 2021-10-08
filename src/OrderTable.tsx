import React, { useState, useEffect } from "react";
import {
  handleBidsDelta,
  handleAsksDelta,
  descendingSort,
  calculateNumberOfRows,
  isScrenVertical,
} from "./common/Utils";
import { OrderType, DeltaType } from "./common/types";
import { OrderRows } from "./components/OrderRows";
import { OrderHeader } from "./components/OrderHeader";
import { Disconect } from "./components/Disconect";
import { Spread } from "./components/Spread";

const OrderTable = () => {
  const initOrders = {
    feed: "",
    product_id: "",
    bids: [[0, 0]],
    asks: [[0, 0]],
    numLevels: 0,
  };
  const initDelta = {
    feed: "",
    product_id: "",
    bids: [[0, 0]],
    asks: [[0, 0]],
  };

  const [orders, setOrders] = useState<OrderType>(initOrders);
  const [delta, setDelta] = useState<DeltaType>(initDelta);
  const [isWindowActive, setIsWindowActive] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [productId, setProductId] = useState(["PI_XBTUSD"]);

  useEffect(() => {
    const webSocket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: productId,
        })
      );
    };
    webSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.feed?.includes("snapshot")) {
        setOrders(data);
        setIsDataLoaded(true);
      } else {
        setDelta(data);
      }
    };
    webSocket.onclose = () => {
      webSocket.close();
    };
    if (!isWindowActive) {
      webSocket.close();
    }

    return () => {
      webSocket.send(
        JSON.stringify({
          event: "unsubscribe",
          feed: "book_ui_1",
          product_ids: productId,
        })
      );
    };
  }, [productId, isWindowActive]);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      setIsWindowActive(false);
      document.title = "Order Book inactive";
    } else {
      document.title = "Order Book";
    }
  });

  delta.bids?.map((order) => {
    return handleBidsDelta(orders, order);
  });

  delta.asks?.map((order) => {
    return handleAsksDelta(orders, order);
  });

  if (orders.bids) {
    descendingSort(orders.bids);
  }
  const isVerticalScren = isScrenVertical();

  if (orders.asks && isVerticalScren) {
    descendingSort(orders.asks);
  }

  const { bids, asks } = orders;

  const handleFeedChange = () => {
    if (productId[0] === "PI_XBTUSD") {
      setProductId(["PI_ETHUSD"]);
      setIsDataLoaded(false);
    } else {
      setProductId(["PI_XBTUSD"]);
      setIsDataLoaded(false);
    }
  };
  const handleInactivestate = () => {
    setIsWindowActive(true);
    setIsDataLoaded(false);
  };

  if (!isWindowActive) {
    return Disconect(() => handleInactivestate());
  }

  if (!isDataLoaded) {
    return <div className="spinner"></div>;
  }
  const numberOfrows = calculateNumberOfRows(isVerticalScren);
  const cutBids = bids?.slice(0, numberOfrows);
  const cutAsks = isVerticalScren
    ? asks?.slice(asks.length - numberOfrows, asks.length)
    : asks?.slice(0, numberOfrows);

  return (
    <>
      <div
        className={`spread-wraper ${isVerticalScren ? "verital-spread" : ""}`}
      >
        {Spread(bids, asks, isVerticalScren)}
      </div>
      <table className={`bids ${isVerticalScren ? "verital-bids" : ""}`}>
        {OrderHeader(isVerticalScren, true)}
        <tbody>{OrderRows(cutBids, cutAsks, true, isVerticalScren)}</tbody>
      </table>

      <table className={`asks ${isVerticalScren ? "verital-asks" : ""}`}>
        {OrderHeader(isVerticalScren, false)}
        <tbody>{OrderRows(cutBids, cutAsks, false, isVerticalScren)}</tbody>
      </table>
      <button
        className={`toggle-feed ${
          isVerticalScren ? "verital-toggle-feed" : ""
        }`}
        onClick={() => handleFeedChange()}
      >
        Toggle Feed
      </button>
    </>
  );
};

export default OrderTable;
