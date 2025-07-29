
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Sparkles } from "lucide-react";

const JOB_SEARCH_CHALLENGES = [
  "Lack of available jobs",
  "Limited remote work opportunities", 
  "Work permit/visa issues",
  "Language barriers",
  "Poor internet connectivity",
  "Lack of relevant experience",
  "Skills gap",
  "Geographic limitations",
  "Salary expectations not met"
];

const JOB_INTERESTS = [
  "Technology/IT",
  "Business/Finance", 
  "Design/Creative",
  "Education/Training",
  "Healthcare",
  "Manual/Physical work"
];

export default function SurveyStep({ data, onNext, onBack, isSubmitting }) {
  const [formData, setFormData] = useState({
    // Section 1: Background
    age_range: data.age_range || "",
    education_level: data.education_level || "",
    field_of_study: data.field_of_study || "",
    current_employment: data.current_employment || "",
    unemployment_duration: data.unemployment_duration || "",
    
    // Section 2: Job Search Challenges
    job_search_challenges: data.job_search_challenges || [],
    applied_abroad: data.applied_abroad || "",
    job_interests: data.job_interests || [],
    
    // Section 3: Platform Use
    would_use_app: data.would_use_app || "",
    online_interview_comfort: data.online_interview_comfort || [3],
    open_to_freelance: data.open_to_freelance || "",
    preferred_language: data.preferred_language || "",
    verified_jobs_likelihood: data.verified_jobs_likelihood || [4],
    helpful_features: data.helpful_features || "",
    platform_usefulness: data.platform_usefulness || [7],
    
    ...data
  });

  const handleArrayToggle = (item, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].includes(item)
        ? prev[arrayName].filter(i => i !== item)
        : prev[arrayName].length < 3 
          ? [...prev[arrayName], item]
          : prev[arrayName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="h-[70vh] md:h-[60vh] overflow-y-auto px-1">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#11523D' }}>Career & Platform Survey</h2>
        <p className="text-sm text-gray-600">Help our AI understand your needs for personalized recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Background */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold" style={{ color: '#11523D' }}>Background Information</h3>
          
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-sm">Age Range</Label>
              <Select value={formData.age_range} onValueChange={(value) => setFormData({...formData, age_range: value})}>
                <SelectTrigger className="rounded-xl h-9">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-22">18-22</SelectItem>
                  <SelectItem value="23-26">23-26</SelectItem>
                  <SelectItem value="27-30">27-30</SelectItem>
                  <SelectItem value="30+">30+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Education Level</Label>
              <Select value={formData.education_level} onValueChange={(value) => setFormData({...formData, education_level: value})}>
                <SelectTrigger className="rounded-xl h-9">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High school">High school</SelectItem>
                  <SelectItem value="Vocational">Vocational</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                  <SelectItem value="Master's+">Master's+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Field of Study</Label>
              <Input
                value={formData.field_of_study}
                onChange={(e) => setFormData({...formData, field_of_study: e.target.value})}
                placeholder="e.g., Computer Science"
                className="rounded-xl h-9"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Current Employment Status</Label>
              <Select value={formData.current_employment} onValueChange={(value) => setFormData({...formData, current_employment: value})}>
                <SelectTrigger className="rounded-xl h-9">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Unemployed before">Unemployed (worked before)</SelectItem>
                  <SelectItem value="Never employed">Never employed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.current_employment === "Unemployed before" || formData.current_employment === "Never employed") && (
            <div className="space-y-1">
              <Label className="text-sm">If unemployed, for how long?</Label>
              <Select value={formData.unemployment_duration} onValueChange={(value) => setFormData({...formData, unemployment_duration: value})}>
                <SelectTrigger className="rounded-xl h-9 w-full md:w-1/2">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<3 months">Less than 3 months</SelectItem>
                  <SelectItem value="3-6 months">3-6 months</SelectItem>
                  <SelectItem value="6-12 months">6-12 months</SelectItem>
                  <SelectItem value="1+ years">1+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Section 2: Job Search Challenges */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold" style={{ color: '#11523D' }}>Job Search Experience</h3>
          
          <div className="space-y-2">
            <Label className="text-sm">What are your main job search challenges? (Select up to 3)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {JOB_SEARCH_CHALLENGES.map((challenge) => (
                <div key={challenge} className="flex items-center space-x-2">
                  <Checkbox
                    id={`challenge-${challenge}`}
                    checked={formData.job_search_challenges.includes(challenge)}
                    onCheckedChange={() => handleArrayToggle(challenge, 'job_search_challenges')}
                    disabled={!formData.job_search_challenges.includes(challenge) && formData.job_search_challenges.length >= 3}
                  />
                  <Label htmlFor={`challenge-${challenge}`} className="text-xs cursor-pointer">
                    {challenge}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Have you applied for jobs abroad before?</Label>
            <RadioGroup value={formData.applied_abroad} onValueChange={(value) => setFormData({...formData, applied_abroad: value})}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes-hired" id="abroad-hired" />
                <Label htmlFor="abroad-hired" className="text-sm">Yes, and was hired</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes-not-hired" id="abroad-not-hired" />
                <Label htmlFor="abroad-not-hired" className="text-sm">Yes, but not hired</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No-but-want" id="abroad-want" />
                <Label htmlFor="abroad-want" className="text-sm">No, but want to</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Not-interested" id="abroad-not-interested" />
                <Label htmlFor="abroad-not-interested" className="text-sm">Not interested</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Job interests (Select up to 3)</Label>
            <div className="grid grid-cols-2 gap-1">
              {JOB_INTERESTS.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={formData.job_interests.includes(interest)}
                    onCheckedChange={() => handleArrayToggle(interest, 'job_interests')}
                    disabled={!formData.job_interests.includes(interest) && formData.job_interests.length >= 3}
                  />
                  <Label htmlFor={`interest-${interest}`} className="text-xs cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Platform Use */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold" style={{ color: '#11523D' }}>Platform Preferences</h3>
          
          <div className="space-y-2">
            <Label className="text-sm">Would you use an app connecting you to international employers?</Label>
            <RadioGroup value={formData.would_use_app} onValueChange={(value) => setFormData({...formData, would_use_app: value})}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="app-yes" />
                <Label htmlFor="app-yes" className="text-sm">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Maybe" id="app-maybe" />
                <Label htmlFor="app-maybe" className="text-sm">Maybe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="app-no" />
                <Label htmlFor="app-no" className="text-sm">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Comfort with online interviews (1 = Very uncomfortable, 5 = Very comfortable)</Label>
            <div className="px-2">
              <Slider
                value={formData.online_interview_comfort}
                onValueChange={(value) => setFormData({...formData, online_interview_comfort: value})}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Open to freelance/part-time work?</Label>
            <RadioGroup value={formData.open_to_freelance} onValueChange={(value) => setFormData({...formData, open_to_freelance: value})}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="freelance-yes" />
                <Label htmlFor="freelance-yes" className="text-sm">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="freelance-no" />
                <Label htmlFor="freelance-no" className="text-sm">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Maybe" id="freelance-maybe" />
                <Label htmlFor="freelance-maybe" className="text-sm">Maybe</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Preferred language for the platform</Label>
            <Select value={formData.preferred_language} onValueChange={(value) => setFormData({...formData, preferred_language: value})}>
              <SelectTrigger className="rounded-xl h-9">
                <SelectValue placeholder="Select language preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arabic">Arabic</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">How likely would you apply if jobs were verified? (1 = Not likely, 5 = Very likely)</Label>
            <div className="px-2">
              <Slider
                value={formData.verified_jobs_likelihood}
                onValueChange={(value) => setFormData({...formData, verified_jobs_likelihood: value})}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm">What features would help or prevent you from using this platform?</Label>
            <Textarea
              value={formData.helpful_features}
              onChange={(e) => setFormData({...formData, helpful_features: e.target.value})}
              placeholder="Describe features that would be helpful or concerning..."
              className="rounded-xl h-16 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">How useful would this platform be for you? (1 = Not useful, 10 = Extremely useful)</Label>
            <div className="px-2">
              <Slider
                value={formData.platform_usefulness}
                onValueChange={(value) => setFormData({...formData, platform_usefulness: value})}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>3</span><span>5</span><span>7</span><span>10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 sticky bottom-0 bg-white border-t mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
            className="rounded-xl px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="rounded-xl px-6 py-2 font-semibold"
            style={{ backgroundColor: '#11523D' }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Completing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Complete Registration
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
