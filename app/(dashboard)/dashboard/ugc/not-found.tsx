"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-800">
            Oops! Page not found
          </h2>
        </motion.div>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </motion.p>

        {/* Animated Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-8"
        >
          <div className="relative w-64 h-64 mx-auto">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-slate-400"
              >
                <path
                  d="M13 14H11V12H13V14ZM13 18H11V16H13V18ZM1 22H23L12 3L1 22ZM13 10H11V8H13V10Z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M12 3L1 22H23L12 3ZM12 6.7L19.1 19H4.9L12 6.7ZM11 10H13V8H11V10ZM11 14H13V12H11V14ZM11 18H13V16H11V18Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Back to Dashboard
          </Button>
          
          <p className="text-sm text-slate-500">
            Lost? Contact{" "}
            <a href="mailto:support@reelfarm.com" className="text-blue-600 hover:underline">
              support@reelfarm.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 