import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text="No Videos Found" />
      )}
    </div>
  );
};

// It server side renders the page(NextJS will pre-render this page on each request using the data returned by `getServerSideProps` function)
// Only use if you need to render a page that data must be fetched at request time, in TikTik, we need to fetch new videos each time we load
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  // console.log("response: ", response.data.name);

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
