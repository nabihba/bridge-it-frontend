import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const WEST_BANK_CITIES = [
  "Ramallah", "Nablus", "Hebron", "Bethlehem", "Jenin", "Tulkarm", "Qalqilya", 
  "Salfit", "Jericho", "Tubas", "East Jerusalem"
];

export default function PersonalInfoStep({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    full_name: data.full_name || "",
    email: data.email || "",
    phone: data.phone || "",
    location: data.location || "",
    ...data
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.full_name && formData.phone && formData.location;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#11523D' }}>Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              placeholder="Enter your full name"
              className="rounded-xl border-gray-200 focus:border-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              placeholder="your.email@example.com"
              className="rounded-xl border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              readOnly
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+970 XX XXX XXXX"
              className="rounded-xl border-gray-200 focus:border-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => setFormData({...formData, location: value})}
            >
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {WEST_BANK_CITIES.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            onClick={onBack}
            variant="outline"
            className="rounded-xl px-8 py-3 font-semibold"
          >
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