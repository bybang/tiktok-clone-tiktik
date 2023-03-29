import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="absolute flex w-full h-full justify-center left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8]">
      <div className="flex flex-wrap items-center justify-between gap-6 p-14 pt-6 bg-white rounded-lg xl:h-[80vh] w-[60%]">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-base text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border-dashed border-gray-200 border-4 rounded-xl outline-none mt-10 w-[260px] h-[460px] p-10 hover:border-red-300 hover:bg-gray-100 cursor-pointer">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="mt-16 bg-black rounded-xl h-[450px]"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xl font-bold">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="mt-10 text-sm text-center text-gray-400 leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="text-white text-base text-center font-medium mt-10 bg-[#F51977] rounded p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      onChange={uploadVideo}
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="mt-4 w-[250px] text-xl text-center text-red-400 font-semibold">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-base font-medium">Caption</label>
          <input
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            value={caption}
            className="border-2 border-gray-200 rounded outline-none text-base p-2"
          />
          <label className="text-base font-medium">Choose a Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-200 rounded outline-none text-base capitalize p-2 lg:p-4 cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                key={topic.name}
                className="text-gray-700 text-base bg-white outline-none capitalize p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="text-base font-medium border-2 border-gray-300 rounded p-2 outline-none w-28 lg:w-44"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="text-white text-base font-medium bg-[#F51997] rounded p-2 outline-none w-28 lg:w-44"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
