import Chat from "@/components/Chat";
import { useState, useCallback } from "react";
import { publicDbName } from "@/database";
import MessageStore from "@/hooks/useMessageStore/MessageStore";
import { MessageTypes, Roles } from "@/types";
import "./index.scss";
import PromptTypes from "@/components/_Prompts/types";

const Component = () => {
  const handleChatInit = useCallback((messageStore: MessageStore) => {
    messageStore.prompt(PromptTypes.signIn);
  }, []);

  return (
    <div className="page page-public">
      <Chat
        className="public-chat"
        dbName={publicDbName}
        onInit={handleChatInit}
      />
    </div>
  );
};

export { Component };
