
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, BarChart, DollarSign, ArrowRight, Lightbulb, Target, TrendingUp, Globe } from 'lucide-react';

export default function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false);

  // Simulate AI-generated recommendations based on course
  const getPersonalizedRecommendation = () => {
    const recommendations = {
      "Web Development": {
        whyHelp: "Based on your Computer Science background, this course will bridge the gap between theory and practical web development skills that employers in the Gulf are actively seeking.",
        skillsGain: ["Modern JavaScript frameworks", "Full-stack development", "API integration", "Responsive design"],
        careerImpact: "Opens doors to Frontend Developer, Full Stack Developer, and Web Application Developer roles with salaries ranging $3,000-6,500 in the Gulf region.",
        softSkills: ["Problem-solving", "Project management", "Client communication"]
      },
      "Cybersecurity": {
        whyHelp: "Given the increasing digital transformation in Gulf countries, cybersecurity expertise is in extremely high demand. Your technical background makes you a perfect fit.",
        skillsGain: ["Network security protocols", "Threat assessment", "Incident response", "Security compliance"],
        careerImpact: "Positions you for Cybersecurity Analyst roles with starting salaries of $4,000-6,000 in Qatar and UAE, with rapid career advancement potential.",
        softSkills: ["Critical thinking", "Attention to detail", "Risk assessment"]
      },
      "Data Science": {
        whyHelp: "Your analytical skills and mathematical foundation align perfectly with data science. Gulf companies are investing heavily in data-driven decision making.",
        skillsGain: ["Statistical analysis", "Machine learning algorithms", "Data visualization", "Business intelligence"],
        careerImpact: "Leads to Data Scientist positions with competitive salaries $3,500-7,500 in Saudi Arabia and UAE tech hubs.",
        softSkills: ["Analytical thinking", "Storytelling with data", "Business acumen"]
      }
    };

    return recommendations[course.category] || {
      whyHelp: "This course complements your technical background and addresses current market demands in the Gulf region.",
      skillsGain: course.skills_taught || ["Technical expertise", "Industry best practices", "Practical application"],
      careerImpact: "Enhances your qualifications for specialized roles in growing tech markets across the Gulf.",
      softSkills: ["Professional development", "Communication", "Team collaboration"]
    };
  };

  const recommendation = getPersonalizedRecommendation();

  return (
    <>
      <Card className="bridgeit-card flex flex-col min-h-[320px]">
        <CardHeader className="pb-3">
          {course.image_url && (
            <img src={course.image_url} alt={course.title} className="rounded-xl aspect-video object-cover mb-3" />
          )}
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 w-fit text-xs">{course.category}</Badge>
          <CardTitle className="text-lg font-bold pt-1 bridgeit-text-primary line-clamp-2">{course.title}</CardTitle>
          <p className="text-sm text-gray-500">{course.provider}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Remote</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
            <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {course.level}</span>
            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {course.price === 0 ? 'Free' : `$${course.price}`}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
        </CardContent>
        <CardFooter>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bridgeit-btn-primary group">
                View Details
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl bridgeit-text-primary">{course.title}</DialogTitle>
                <p className="text-gray-600">{course.provider}</p>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Globe className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">Remote</p>
                    <p className="text-xs text-gray-500">Delivery</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">{course.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                  <div className="text-center">
                    <BarChart className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">{course.level}</p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-semibold">{course.price === 0 ? 'Free' : `$${course.price}`}</p>
                    <p className="text-xs text-gray-500">Price</p>
                  </div>
                </div>

                {/* Why This Course */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Why This Course Will Help You</h3>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">{recommendation.whyHelp}</p>
                </div>

                {/* Skills You'll Gain */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 bridgeit-accent" />
                    <h3 className="font-semibold bridgeit-text-primary">Skills You'll Develop</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {recommendation.skillsGain.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-blue-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Impact */}
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">Career Impact</h3>
                  </div>
                  <p className="text-yellow-700 text-sm leading-relaxed">{recommendation.careerImpact}</p>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="font-semibold bridgeit-text-primary mb-3">Soft Skills Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.softSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Description */}
                <div>
                  <h3 className="font-semibold bridgeit-text-primary mb-2">Course Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                </div>

                {/* Action Button */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bridgeit-btn-primary">
                    Enroll Now - ${course.price}
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Save for Later
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
