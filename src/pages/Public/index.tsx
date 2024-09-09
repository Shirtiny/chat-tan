import Chat from "@/components/Chat";
import { useState, useCallback } from "react";
import "./index.scss";

const Component = () => {
  return (
    <div className="page page-public">
      <Chat className="public-chat" dbName="public" />
    </div>
  );
};

export { Component };
