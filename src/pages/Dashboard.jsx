import React, { useState, useEffect } from "react";
import { User, Course, Job } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Briefcase, User as UserIcon, Sparkles } from "lucide-react";
import CourseCard from "../components/dashboard/CourseCard";
import JobCard from "../components/dashboard/JobCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        
        // Check if profile is complete (only university required now)
        if (!currentUser.university) {
          navigate(createPageUrl("Registration"));
          return;
        }

        setUser(currentUser);
        
        // Fetch courses and jobs - limit to 6 for mobile optimization
        const [fetchedCourses, fetchedJobs] = await Promise.all([
          Course.list("-created_date", 6),
          Job.list("-posted_date", 6)
        ]);

        setCourses(fetchedCourses);
        setJobs(fetchedJobs);

      } catch (error) {
        console.error("Authentication error, redirecting:", error);
        navigate(createPageUrl("Welcome"));
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="p-3 md:p-6 min-h-screen">
        <Skeleton className="h-12 w-full rounded-2xl mb-4" />
        <div className="flex space-x-4 mb-4">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold bridgeit-text-primary">
            Welcome, {user?.full_name?.split(' ')[0] || "Graduate"}!
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Your career hub is ready.
          </p>
        </header>

        <Tabs defaultValue="jobs" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1 h-12">
            <TabsTrigger value="jobs" className="rounded-lg flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Job Matches</span>
              <span className="sm:hidden">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="rounded-lg flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
              <span className="sm:hidden">Courses</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}