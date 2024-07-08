import React, { useEffect } from "react";
import { setSideBarFullSize } from "../features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useChannelStats } from "../hooks/studio.hook";
import { VideoStats, UploadVideo, EditVideo } from "../components/index.js";
import { setShowUploadVideo } from "../features/uiSlice";

import { FaRegEye } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { IconContext } from "react-icons";

function MyStudio() {
  const dispatch = useDispatch();
  const channelInfo = useSelector((state) => state.auth.user);
  const showEdit = useSelector((state) => state.ui.showEditVideo);
  const showUpload = useSelector((state) => state.ui.showUploadVideo);
  const videoForEdit = useSelector((state) => state.video.videoForEdit);

  useEffect(() => {
    dispatch(setSideBarFullSize(false));

    return () => {
      dispatch(setSideBarFullSize(true));
    };
  }, [dispatch]);

  const { data: channelStats, isLoading: statsLoading } = useChannelStats();

  const channelStatsItems = [
    {
      icon: <FaRegEye />,
      title: "Total views",
      value: channelStats?.totalViews,
    },
    {
      icon: <FaUserFriends />,
      title: "Total subscribers",
      value: channelStats?.totalSubscribers,
    },
    {
      icon: <FaHeart />,
      title: "Total likes",
      value: channelStats?.totalLikes,
    },
    {
      icon: <BiSolidVideos />,
      title: "Total videos",
      value: channelStats?.totalVideos,
    },
  ];

  const handleUploadVideoClick = () => {
    dispatch(setShowUploadVideo(true));
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 sm:px-6 lg:px-8 bg-[#0e0e0e] text-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Welcome Back, {channelInfo?.fullName}
            </h1>
            <p className="text-sm text-gray-400">
              Seamless Video Management, Elevated Results.
            </p>
          </div>
          <button
            onClick={handleUploadVideoClick}
            className="inline-flex items-center gap-x-2 bg-blue-800 px-4 py-2 font-semibold text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            <CiSquarePlus className="text-xl sm:text-2xl" />
            Upload Video
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <IconContext.Provider value={{ className: "text-xl sm:text-2xl" }}>
            {channelStatsItems.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[#131313] flex flex-col items-center hover:bg-[#0e0e0e] transition-colors duration-300"
              >
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 text-blue-600">
                  {item.icon}
                </div>
                <h6 className="text-gray-400">{item.title}</h6>
                <p className="text-2xl sm:text-3xl font-semibold">{item.value}</p>
              </div>
            ))}
          </IconContext.Provider>
        </div>

        {showUpload && <UploadVideo />}
        {showEdit && videoForEdit && <EditVideo />}

        <VideoStats />
      </div>
    </>
  );
}

export default MyStudio;
