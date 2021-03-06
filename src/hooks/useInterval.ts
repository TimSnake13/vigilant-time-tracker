import React, { useState, useEffect, useRef } from "react";

export default function useInterval(callback, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id;
    if (delay !== null) {
      id = setInterval(tick, delay);
    }
    return () => clearInterval(id);
  }, [delay]);
}
