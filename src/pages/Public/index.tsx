import Chat from "@/components/Chat";
import { useState, useCallback } from "react";
import { publicDbName } from "@/database";
import "./index.scss";

const Component = () => {
  return (
    <div className="page page-public">
      <Chat className="public-chat" dbName={publicDbName} />
    </div>
  );
};

export { Component };
