import { getCurrentUser } from "@/lib/action/auth.action";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/action/general.action";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({ interviewId: id, userId: user?.id });
  console.log(feedback);
  const formattedDate = feedback?.createdAt
    ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
    : "N/A";
  console.log(feedback?.createdAt)

  return (
    <>
      <div>
        <Link href={"/"}>
          <div className="text-2xl font-semibold text-white flex items-center justify-center px-4">
            <span className="text-purple-400">🧠 Mock</span>
            <span className="text-white">Mate</span>
          </div>
        </Link>
      </div>
      <div className="min-h-screen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Header Section */}
          <div className="mb-6">
            <div className="border-b border-gray-800 pb-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                Interview Feedback Report
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h2 className="text-base sm:text-lg lg:text-xl text-gray-300 font-medium">
                  {interview?.role} Interview
                </h2>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Link href="/" className="flex-1">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
                Go to Dashboard
              </button>
            </Link>
            <Link href={`/interview/${id}`} className="flex-1">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
                Retake Interview
              </button>
            </Link>
          </div>

          {/* Score Overview */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 mb-6 border border-gray-700 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                  <Image
                    src="/star.svg"
                    alt="Star Rating"
                    height={24}
                    width={24}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Overall Performance
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {feedback?.totalScore}
                    </p>
                    <span className="text-base text-gray-400 font-medium">/ 100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600">
                  <Image
                    src="/calendar.svg"
                    alt="Calendar"
                    height={24}
                    width={24}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Assessment Date
                  </h3>
                  <p className="text-sm text-gray-200 font-medium mt-1">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Assessment */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 mb-6 border border-gray-700 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Executive Summary
              </h3>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {feedback?.finalAssessment}
              </p>
            </div>
          </div>

          {/* Evaluation Report */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 mb-6 border border-gray-700 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Detailed Evaluation
              </h3>
            </div>
            <div className="grid gap-4">
              {feedback?.categoryScores.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h4 className="text-sm sm:text-base font-medium text-white">
                        {item.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 sm:w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent min-w-[60px]">
                        {item.score}
                      </span>
                      <span className="text-sm text-gray-400 font-medium">/100</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Strengths */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full"></div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Strengths
                </h3>
              </div>
              <div className="space-y-3">
                {feedback?.strengths.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full text-white font-bold text-xs mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-red-400 rounded-full"></div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Areas for Improvement
                </h3>
              </div>
              <div className="space-y-3">
                {feedback?.areasForImprovement.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white font-bold text-xs mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Verdict */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Final Verdict
                </h3>
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              </div>

              <div className="inline-block">
                {feedback?.totalScore! < 50 ? (
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl border-2 border-red-500/50 bg-gradient-to-r from-red-500/20 to-red-600/20 shadow-lg">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-lg sm:text-xl font-bold text-red-400">
                      Not Recommended
                    </span>
                  </div>
                ) : feedback?.totalScore! > 50 && feedback?.totalScore! < 70 ? (
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl border-2 border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-amber-600/20 shadow-lg">
                    <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-lg sm:text-xl font-bold text-amber-400">
                      Needs Improvement
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 to-green-600/20 shadow-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-lg sm:text-xl font-bold text-green-400">
                      Recommended
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed">
                  This assessment reflects the candidate's performance across all evaluation criteria.
                  The final recommendation is based on industry standards and role-specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;