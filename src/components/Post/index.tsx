import * as locale from 'date-fns/locale';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { format } from 'date-fns';
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import EditPostModal from '../EditPostModal';
import DeletePostAlertModal from '../DeletePostAlertModal';

type PostProps = {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

const Post: React.FC<PostProps> = ({ id, title, text, createdAt, updatedAt }) => {
  const formattedCreatedAt = createdAt ? format(new Date(createdAt), 'dd MMMM yyyy', { locale: locale.ptBR }) : '';
  const formattedTimeItCreated = createdAt ? format(new Date(createdAt), 'HH:mm', { locale: locale.ptBR }) : '';

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-between items-center mb-[13px]">
        <div className="w-full flex flex-col"> 
          <div className="w-full flex flex-row items-center text-center gap-1">
            {createdAt && (
              <>
                <span className="font-base text-sm leading-6 text-slate-400">
                  {formattedCreatedAt}
                </span>
                <span className="text-[10px] leading-6 font-light text-slate-400">
                  •
                </span>
                <span className="font-base text-sm leading-6 text-slate-400">
                  {formattedTimeItCreated}
                </span>
              </>
            )}
            {updatedAt !== createdAt && (
              <>
                <span className="text-[10px] leading-6 font-light text-slate-400">
                  •
                </span>
                <span className="font-base text-sm leading-6 text-slate-400">
                  Editado
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Options postId={id} />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col mb-[13px]">  
          <span className="break-words font-semibold text-2xl text-slate-700">
            {title}
          </span>
        </div>
        <div className="w-full flex flex-col">
          <p className="whitespace-pre-line font-normal text-sm text-slate-700">
            {text}
          </p>    
        </div>
      </div>
    </div>
  )
}

export default Post;

type OptionsProps = {
  postId: string;
}

const Options: React.FC<OptionsProps> = ({ postId }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <DotsHorizontalIcon width={18} height={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-20 border rounded-md flex flex-col bg-white shadow-md z-10 py-2 px-2">
          <ul role="list" className="divide-y divide-slate-200">
            <li className="p-1 first:pt-0 last:pb-0">
              <EditPostModal id={postId} />
            </li>
            <li className="p-1 first:pt-0 last:pb-0">
              <DeletePostAlertModal id={postId} />
            </li>
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}