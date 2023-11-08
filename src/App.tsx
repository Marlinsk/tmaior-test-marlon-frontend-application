import { useQuery } from "react-query";
import CreatePostModal from "./components/CreatePostModal";
import Post from "./components/Post";
import { api } from "./providers/api";

interface PostResultResponse {
  _id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

function App() {
  const { data } = useQuery<PostResultResponse[]>(
    ["list-all-posts"],
    async () => {
      const response = await api.get<PostResultResponse[]>("/posts");
      return response.data;
    },
    {
      onError: (err) => {
        console.error("Erro na consulta:", err);
      },
    }
  );

  const postData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-[564px] flex flex-col gap-6">
        <div className="w-full h-14 mt-12 flex items-center justify-center">
          <CreatePostModal />
        </div>
        <div className="w-full">
          <ul role="list" className="divide-y divide-slate-300">
            {postData.map((data, index) => {
              return (
                <li key={index} className="py-6 first:pt-0 last:pb-0">
                  <Post
                    id={data._id}
                    title={data.title}
                    text={data.text}
                    createdAt={data.createdAt}
                    updatedAt={data.updatedAt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
