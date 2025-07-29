import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/api/entities";
import { ArrowRight, Users, BookOpen, Briefcase } from "lucide-react";

export default function Welcome() {
  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl("Registration"));
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
      background: 'linear-gradient(135deg, #0f5132 0%, #11523D 30%, #1a6b47 70%, #22805a 100%)'
    }}>
      <div className="max-w-md w-full mx-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white/30 overflow-hidden">
           <img src="/path/to/your/logo.jpg" 
              alt="BridgeIT Logo"
              className="w-20 h-20 object-cover rounded-full"
            />
            </div>
          <h1 className="text-5xl font-bold mb-3 text-white drop-shadow-lg">BridgeIT</h1>
          <div className="mb-4">
            <p className="text-xl text-white/90 font-medium italic">"A bridge to your life"</p>
          </div>
          <p className="text-lg text-white/80 mb-2">ICT Career Platform</p>
          <p className="text-sm text-white/70">Connecting ICT graduates in the West Bank with opportunities</p>
        </div>

        {/* Features Preview */}
        <Card className="bg-white/15 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Job Matching</h3>
                  <p className="text-sm text-white/80">Personalized job recommendations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Skill Development</h3>
                  <p className="text-sm text-white/80">Curated remote courses for your career</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Local Network</h3>
                  <p className="text-sm text-white/80">Connect with West Bank opportunities</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleSignup}
            className="w-full py-4 text-lg font-semibold rounded-xl group bg-white text-green-800 hover:bg-white/90 hover:text-green-900 shadow-lg"
          >
            Sign Up & Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={handleLogin}
            variant="outline" 
            className="w-full py-4 text-lg font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
          >
            I Already Have an Account
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/60">
            For ICT graduates in the West Bank
          </p>
        </div>
      </div>
    </div>
  );
}