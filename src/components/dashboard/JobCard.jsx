
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Briefcase, DollarSign, ArrowRight, Target, CheckCircle, MessageSquare, FileText } from 'lucide-react';

export default function JobCard({ job }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Simulate AI-generated job suitability analysis
  const getJobSuitability = () => {
    const suitabilityReasons = {
      "Web Development": {
        whySuitable: "Your Computer Science background and technical skills align perfectly with this role. The company values fresh graduates with strong fundamentals.",
        skillsMatch: ["JavaScript", "Problem-solving", "Technical learning ability"],
        softSkillsNeeded: ["Team collaboration", "Communication with clients", "Adaptability to new technologies"],
        careerGrowth: "This entry-level position offers mentorship programs and clear advancement to Senior Developer within 2-3 years."
      },
      "Cybersecurity": {
        whySuitable: "Your analytical mindset and technical foundation make you ideal for cybersecurity work. Gulf companies prioritize fresh talent for comprehensive training programs.",
        skillsMatch: ["Analytical thinking", "Technical documentation", "Security awareness"],
        softSkillsNeeded: ["Attention to detail", "Risk assessment", "Clear incident reporting"],
        careerGrowth: "High demand field with rapid salary progression and opportunity to become a Security Architect or CISO."
      },
      "Data Science": {
        whySuitable: "Your mathematical background and programming experience position you well for data analysis roles in the expanding Gulf tech market.",
        skillsMatch: ["Statistical analysis", "Programming logic", "Research methodology"],
        softSkillsNeeded: ["Data storytelling", "Business communication", "Project presentation"],
        careerGrowth: "Fast-growing field with potential to advance to Lead Data Scientist or Chief Data Officer roles."
      }
    };

    return suitabilityReasons[job.category] || {
      whySuitable: "Your educational background and technical skills align well with this role's requirements and company culture.",
      skillsMatch: ["Technical expertise", "Learning ability", "Professional attitude"],
      softSkillsNeeded: ["Communication", "Teamwork", "Problem-solving"],
      careerGrowth: "Excellent opportunity for professional growth in a dynamic work environment."
    };
  };

  const suitability = getJobSuitability();

  const handleApply = async () => {
    setIsApplying(true);
    // Simulate application submission
    setTimeout(() => {
      setIsApplying(false);
      setIsOpen(false);
      setCoverLetter('');
      // You could show a success message here
    }, 2000);
  };

  return (
    <>
      <Card className="bridgeit-card flex flex-col h-64 md:h-72">
        <CardHeader className="pb-2 px-3 pt-3">
          <div className="flex items-start justify-between mb-1">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">{job.category}</Badge>
            {job.company_logo && (
              <img src={job.company_logo} alt={job.company} className="w-8 h-8 rounded-lg object-contain" />
            )}
          </div>
          <CardTitle className="text-base md:text-lg font-bold bridgeit-text-primary line-clamp-2 leading-tight">{job.title}</CardTitle>
          <p className="text-xs text-gray-500">{job.company}</p>
        </CardHeader>
        <CardContent className="flex-grow px-3 py-2 space-y-1">
          <div className="flex items-center text-xs text-gray-600 gap-2">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.work_type}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ${job.salary_min}k - ${job.salary_max}k</span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{job.description}</p>
        </CardContent>
        <CardFooter className="px-3 pb-3 pt-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bridgeit-btn-primary group text-sm py-2">
                View Details
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto mx-2">
              <DialogHeader>
                <DialogTitle className="text-2xl bridgeit-text-primary">{job.title}</DialogTitle>
                <p className="text-gray-600">{job.company} • {job.location}</p>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Job Info */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">{job.work_type}</p>
                    <p className="text-xs text-gray-500">Work Type</p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">{job.experience_level}</p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">${job.salary_min}K - ${job.salary_max}K</p>
                    <p className="text-xs text-gray-500">Salary</p>
                  </div>
                </div>

                {/* Why This Job Suits You */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Why This Job Suits You</h3>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">{suitability.whySuitable}</p>
                </div>

                {/* Skills Match */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold bridgeit-text-primary">Your Matching Skills</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {suitability.skillsMatch.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h3 className="font-semibold bridgeit-text-primary mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required?.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills Needed */}
                <div>
                  <h3 className="font-semibold bridgeit-text-primary mb-3">Soft Skills for Success</h3>
                  <div className="flex flex-wrap gap-2">
                    {suitability.softSkillsNeeded.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Growth */}
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Career Growth Potential</h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">{suitability.careerGrowth}</p>
                </div>

                {/* Job Description */}
                <div>
                  <h3 className="font-semibold bridgeit-text-primary mb-2">Job Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                </div>

                {/* Requirements */}
                {job.requirements && (
                  <div>
                    <h3 className="font-semibold bridgeit-text-primary mb-2">Requirements</h3>
                    <ul className="space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CV Information */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Your CV Will Be Sent</h3>
                  </div>
                  <p className="text-blue-700 text-sm">
                    When you apply, your CV and profile information will be automatically sent to {job.company}'s hiring team. 
                    Make sure your profile is up-to-date for the best impression.
                  </p>
                </div>

                {/* Application Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 bridgeit-accent" />
                    <h3 className="font-semibold bridgeit-text-primary">Apply for This Position</h3>
                  </div>
                  <Textarea
                    placeholder="Add an optional cover letter or introduction message..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="mb-4 rounded-xl"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleApply} 
                      disabled={isApplying}
                      className="flex-1 bridgeit-btn-primary"
                    >
                      {isApplying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Sending CV to {job.company}...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Send CV & Apply
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      Save Job
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
