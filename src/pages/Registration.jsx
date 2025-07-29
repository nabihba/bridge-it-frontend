import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import PersonalInfoStep from "../components/registration/PersonalInfoStep";
import EducationStep from "../components/registration/EducationStep";
import SurveyStep from "../components/registration/SurveyStep";

const STEPS = [
  { id: 1, title: "Personal Info", component: PersonalInfoStep },
  { id: 2, title: "Education", component: EducationStep },
  { id: 3, title: "Survey", component: SurveyStep }
];

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isRetaking, setIsRetaking] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await User.me();
        
        // Check if user is coming to retake survey
        const urlParams = new URLSearchParams(window.location.search);
        const retakeSurvey = urlParams.get('retake') === 'true';
        
        if (retakeSurvey && user.university) {
          // User is retaking survey, start from survey step
          setIsRetaking(true);
          setCurrentStep(3);
          setFormData({
            full_name: user.full_name || "",
            email: user.email || "",
            ...user
          });
          setIsReady(true);
        } else if (user.university && user.age_range) {
          // Profile complete, redirect to dashboard
          navigate(createPageUrl("Dashboard"));
        } else {
          // Start registration flow
          setFormData({
            full_name: user.full_name || "",
            email: user.email || "",
            ...user
          });
          setIsReady(true);
        }
      } catch (e) {
        // User just signed up, start registration flow
        setIsReady(true);
      }
    };
    checkAuth();
  }, [navigate]);

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = (stepData) => {
    updateFormData(stepData);
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !isRetaking) {
      setCurrentStep(currentStep - 1);
    } else if (isRetaking) {
      navigate(createPageUrl("Profile"));
    }
  };

  const handleSubmit = async (finalStepData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const completeData = { 
        ...formData, 
        ...finalStepData,
        ai_profile_updated: new Date().toISOString()
      };
      await User.updateMyUserData(completeData);
      navigate(createPageUrl("Dashboard"));
    } catch (err) {
      setError("Failed to complete registration. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F5' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-700" />
          <p className="text-lg text-gray-700">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const displaySteps = isRetaking ? [STEPS[2]] : STEPS;
  const displayCurrentStep = isRetaking ? 1 : currentStep;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {(currentStep > 1 || isRetaking) && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleBack}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#11523D' }}>
                {isRetaking ? "Update Your Profile" : "Complete Your Profile"}
              </h1>
              <p className="text-gray-600">
                {isRetaking ? "Retake the survey to refresh your recommendations" : `Step ${displayCurrentStep} of ${displaySteps.length}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #11523D 0%, #BB9704 100%)' }}>
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#11523D' }}>BridgeIT</span>
          </div>
        </div>

        {!isRetaking && (
          /* Progress Bar */
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step.id < currentStep
                        ? 'text-white'
                        : step.id === currentStep
                        ? 'text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={{
                      backgroundColor: step.id <= currentStep ? '#11523D' : undefined
                    }}
                  >
                    {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  {step.id < STEPS.length && (
                    <div
                      className={`h-1 w-16 mx-2 transition-all ${
                        step.id < currentStep ? '' : 'bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: step.id < currentStep ? '#11523D' : undefined
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              {STEPS.map((step) => (
                <span key={step.id} className={step.id === currentStep ? 'font-semibold' : ''}>
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Step Content */}
        <Card className="bg-white border-none shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <CurrentStepComponent
              data={formData}
              onNext={currentStep === STEPS.length ? handleSubmit : handleNext}
              onBack={(currentStep > 1 || isRetaking) ? handleBack : null}
              isSubmitting={isSubmitting}
              isLastStep={currentStep === STEPS.length}
              isRetaking={isRetaking}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}