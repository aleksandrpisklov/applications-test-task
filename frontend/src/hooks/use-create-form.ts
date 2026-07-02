import { useState, type FormEvent } from "react";
import type { Status } from "../types/status";
import type { Priority } from "../types/priority";
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from "../constants/create-application-limit";
import { getErrorMessage } from "../lib/get-error-message";
import type { ApplicationCreate } from "../api/generated";

export function useCreateForm({
  onCreate,
}: {
  onCreate: (application: ApplicationCreate) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("new");
  const [priority, setPriority] = useState<Priority>("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleErr =
    title.length > 0 &&
    (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH) {
      setError(
        `Название: от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов.`,
      );
      return;
    }
    if (description.length > DESCRIPTION_MAX_LENGTH) {
      setError(`Описание: не более ${DESCRIPTION_MAX_LENGTH} символов.`);
      return;
    }
    setError("");
    setLoading(true);
    try {
      onCreate({
        title,
        description,
        status,
        priority,
      });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    loading,
    error,
    titleErr,
    submit,
  };
}
