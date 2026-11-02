import React from "react";

export function containsKhmerText(children: React.ReactNode): boolean {
  if (typeof children === 'string') {
    return /[\u1780-\u17FF]/.test(children);
  }

  if (Array.isArray(children)) {
    return children.some(containsKhmerText);
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return containsKhmerText(children.props.children);
  }

  return false;
}