import { useState, useCallback } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);
  const toggle = useCallback(() => setShowPassword((prev) => !prev), []);
  return { showPassword, toggle } as const;
}
