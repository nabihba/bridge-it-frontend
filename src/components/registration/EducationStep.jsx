import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft } from "lucide-react";

const UNIVERSITIES = [
  "Birzeit University",
  "An-Najah National University",
  "Palestine Polytechnic University",
  "Bethlehem University",
  "Al-Quds University",
  "Hebron University",
  "Palestine Technical University - Kadoorie",
  "Arab American University",
  "Al-Azhar University - Gaza",
  "Islamic University of Gaza",
  "University College of Applied Sciences",
  "Other"
];

const ICT_SPECIALIZATIONS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Computer Engineering",
  "Information Systems",
  "Cyber Security",
  "Network Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Web Development",
  "Mobile Development",
  "Database Management",
  "Other"
];

export default function EducationStep({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    university: data.university || "",
    degree: data.degree || "",
    ict_specialization: data.ict_specialization || "",
    ...data
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Omit fields that are no longer in this form to avoid saving them
    const { gpa, graduation_year, ...stepData } = formData;
    onNext(stepData);
  };

  const isValid = formData.university && formData.degree && formData.ict_specialization;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#11523D' }}>Education Background</h2>
        <p className="text-gray-600">Tell us about your ICT education</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="university">University *</Label>
            <Select 
              value={formData.university} 
              onValueChange={(value) => setFormData({...formData, university: value})}
            >
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((uni) => (
                  <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Select 
              value={formData.degree} 
              onValueChange={(value) => setFormData({...formData, degree: value})}
            >
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Select your degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                <SelectItem value="Master's">Master's Degree</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
                <SelectItem value="Diploma">Diploma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ict_specialization">ICT Specialization *</Label>
            <Select 
              value={formData.ict_specialization} 
              onValueChange={(value) => setFormData({...formData, ict_specialization: value})}
            >
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Select your specialization" />
              </SelectTrigger>
              <SelectContent>
                {ICT_SPECIALIZATIONS.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="rounded-xl px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!isValid}
            className="rounded-xl px-8 py-3 font-semibold"
            style={{ backgroundColor: '#11523D' }}
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}