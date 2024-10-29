import type { CSSProperties, ReactNode, RefObject } from "react";

export interface ICommonProps {
  ref?: RefObject<any>;
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
