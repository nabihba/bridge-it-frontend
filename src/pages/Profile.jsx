import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Edit, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        navigate(createPageUrl("Registration"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await User.logout();
    navigate(createPageUrl("Welcome"));
  };

  const handleRetakeSurvey = () => {
    navigate(createPageUrl("Registration") + "?retake=true");
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bridgeit-text-primary">Your Profile</h1>
            <p className="text-lg text-gray-600 mt-2">Manage your information and preferences.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-xl">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Details */}
          <Card className="bridgeit-card md:col-span-2">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="bridgeit-text-primary text-2xl">Personal Details</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-lg"
                onClick={() => navigate(createPageUrl("Registration"))}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-lg">{user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-lg">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-lg">{user.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">University</p>
                  <p className="font-semibold text-lg">{user.university}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Degree</p>
                  <p className="font-semibold text-lg">{user.degree}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">ICT Specialization</p>
                  <p className="font-semibold text-lg">{user.ict_specialization}</p>
                </div>
              </div>
              {user.job_interests && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Job Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {user.job_interests.map(interest => (
                      <span key={interest} className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-800 font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-6">
            <Card className="bridgeit-card">
              <CardHeader>
                <CardTitle className="bridgeit-text-primary text-xl">AI Analyst</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Retake the survey or refresh your recommendations based on your latest profile updates.
                </p>
                <Button className="w-full bridgeit-btn-primary mb-3">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh AI Suggestions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={handleRetakeSurvey}
                >
                  Retake Questionnaire
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}