import type { CSSProperties, ReactNode } from "react";

export interface ICommonProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

export enum Roles {
  user = "user",
  system = "system",
}

export enum DataStatus {
  initial,
  pending,
  done,
  error,
}

export enum MessageTypes {
  text = "text",
  json = "json",
}

export interface Message {
  id: string;
  messageType: MessageTypes;
  role: Roles;
  content?: any;
  timestamp: number;
}
