import "./styles.css"
import * as Dialog from "@radix-ui/react-dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useMutation } from "react-query";
import { api } from "../../providers/api";
import { queryClient } from "../../providers/QueryClient";

const postFormSchema = z.object({
  title: z.string().nonempty("O post precisa de um título"),
  text: z.string().max(1000, { message: "O texto do post não pode conter mais do que 1000 caracteres."}).nonempty("O post precisa ter um texto."),
});

type registerPostFormData = z.infer<typeof postFormSchema>;

const CreatePostModal = () => {
  const { reset, register, handleSubmit, formState: { errors } } = useForm<registerPostFormData>({
    resolver: zodResolver(postFormSchema),
  });
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open != true) {
      reset();
    }
  }, [open, reset]);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (data: registerPostFormData) => {
      await api.post("/posts", {
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-all-posts"] });
      if (isLoading != true) {
        setOpen(false);
        reset();
      }
    },
  });

  const onSubmit = (data: registerPostFormData) => {
    mutate(data);
  };

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger className="w-[164px] h-10 border border-slate-300 rounded-lg font-medium text-base text-slate-700 bg-white hover:border-none hover:text-neutral-50 hover:bg-blue-500">
        Criar novo post
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed z-20" />
        <Dialog.Content className="w-[720px] rounded-lg border-none bg-white fixed overflow-hidden pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-full px-6 pb-4 border-b-[1px] border-slate-300 flex items-center flex-row justify-between">
            <Dialog.Title className="font-semibold text-2xl text-slate-700">
              Criar novo post
            </Dialog.Title>
            <Dialog.Close className="h-8 bg-transparent flex justify-center items-center">
              <Cross1Icon
                className="text-slate-400 hover:text-slate-500"
                width={24}
                height={24}
              />
            </Dialog.Close>
          </div>
          <div
            id="modal-scroll"
            className="w-full max-h-[516px] px-6 py-6 overflow-y-scroll"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col h-360 gap-6"
            >
              <div className="w-full flex flex-col gap-6">
                <div className="w-full flex flex-row gap-3">
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-3">
                      <label
                        htmlFor="title"
                        className="w-full font-medium text-sm text-slate-900"
                      >
                        Título
                      </label>
                      <input
                        type="text"
                        className={`w-full block p-2.5 font-normal text-sm text-slate-900 bg-white rounded-lg border ${
                          errors.title
                            ? "border-red-300 hover:border-red-400 focus:outline-none placeholder:text-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-300 hover:border-slate-400 focus:outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        }`}
                        {...register("title")}
                      />
                    </div>
                    {errors.title && (
                      <span className="font-normal text-xs text-red-400">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex flex-col gap-3">
                    <label
                      htmlFor="text"
                      className="flex font-medium text-sm text-slate-900"
                    >
                      Texto
                    </label>
                    <textarea
                      rows={12}
                      placeholder="Digite o seu relatório"
                      className={`resize-none block w-full rounded-lg border-0 p-[12px] text-sm text-slate-900 ring-1 ring-inset ${
                        errors.text
                          ? "ring-red-300 placeholder:text-red-400 focus:outline-red-500 focus:ring-1 focus:ring-inset focus:ring-red-500"
                          : "ring-slate-300 placeholder:text-slate-400 focus:outline-slate-500 focus:ring-1 focus:ring-inset focus:ring-slate-500"
                      }`}
                      {...register("text")}
                    ></textarea>
                  </div>
                  {errors.text && (
                    <span className="font-normal text-xs text-red-400">
                      {errors.text.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full h-10 flex justify-end">
                <button
                  type="submit"
                  className="w-[132px] h-10 flex justify-center items-center rounded-lg font-medium text-base text-neutral-50 bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}  
                >
                  Criar Postagem
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreatePostModal;