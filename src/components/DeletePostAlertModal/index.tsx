import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { useMutation } from "react-query";
import { FormEvent } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { api } from '../../providers/api';
import { queryClient } from '../../providers/QueryClient';

type DeleteReportModalProps = {
  id: string;
};

const DeletePostAlertModal: React.FC<DeleteReportModalProps> = ({ id }) => {

  const { mutate } = useMutation({
    mutationKey: ["delete-post-by-id"],
    mutationFn: async () => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-all-posts"] });
    },
  });

  const acceptedDeletePost = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate()
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="w-full p-1 flex items-center text-center justify-center text-[12px] leading-none text-slate-700 font-normal hover:font-semibold hover:text-[14px]">
        Excluir
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 inset-0 fixed z-20" />
        <AlertDialog.Content className="w-[360px] rounded-lg fixed z-20 pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-hidden">
          <div className="w-full px-6 pb-4 border-b-[1px] border-slate-300 flex items-center gap-4 flex-row justify-start">
            <ExclamationTriangleIcon color="#0f172a" width={24} height={24} />
            <AlertDialog.Title className="font-semibold text-2xl text-slate-900">
              Aviso
            </AlertDialog.Title>
          </div>
          <div className="w-full flex flex-col justify-center text-center gap-4 px-6 py-6">
            <AlertDialog.Description className="font-normal text-sm text-slate-700">
              Tem certeza que você quer remover este registro?
            </AlertDialog.Description>
            <div className="flex justify-center gap-6">
              <AlertDialog.Cancel asChild>
                <button className="w-[124px] h-10 rounded-lg font-medium text-base text-neutral-50 bg-red-500 hover:bg-red-600">
                  Não
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <button
                  onClick={acceptedDeletePost}
                  className="w-[124px] h-10 flex justify-center items-center rounded-lg font-medium text-base text-neutral-50 bg-blue-500 hover:bg-blue-600"
                >
                  Sim
                </button>
              </AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeletePostAlertModal;