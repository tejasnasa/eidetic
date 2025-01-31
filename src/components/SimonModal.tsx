"use client";

import { simonSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveSimonRecord } from "@/actions/saveRecord";

interface ModalProps {
  value: number;
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const SimonModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  value,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<z.infer<typeof simonSchema>>({
    resolver: zodResolver(simonSchema),
    defaultValues: {
      name: "",
      level: value,
    },
  });

  async function onSubmit(values: z.infer<typeof simonSchema>) {
    try {
      await saveSimonRecord(values);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving record:", error.message);
      } else {
        console.error("Unexpected error saving record:", error);
      }
    }
  }

  const handleAnonymousSubmit = async () => {
    setValue("name", "Anonymous", { shouldValidate: true });
    await handleSubmit(onSubmit)();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button
          onClick={handleAnonymousSubmit}
          className="absolute top-2 right-2 text-white bg-gray-700 p-2 rounded-full"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            {...register("name", { required: true })}
            className="text-black px-2 py-1 rounded"
            placeholder="Enter your name"
          />
          <button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Name"}
          </button>
        </form>
        <button
          onClick={handleAnonymousSubmit}
          className="mt-3 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SimonModal;
