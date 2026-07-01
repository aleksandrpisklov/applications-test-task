import { useState } from "react";
import type { Application } from "../types/application";

export function useCreate({
  onCreate,
}: {
  onCreate: (application: Application) => void;
}) {
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = (application: Application) => {
    onCreate(application);
    setShowCreate(false);
  };

  return { showCreate, setShowCreate, handleCreate };
}
