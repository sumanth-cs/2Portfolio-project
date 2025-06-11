import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { updateBio, getBio } from "../../api/bio.js";
import { uploadFile } from "../../api/upload.js";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { Button } from "../ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { toast } from "react-hot-toast";
import { ThemeContext } from '@/contexts/ThemeContext.jsx';

function BioForm({ onSave }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", level: "Basic" });
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    period: "",
  });
  const [experience, setExperience] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
  });
  const [social, setSocial] = useState([]);
  const [newSocial, setNewSocial] = useState({ name: "", link: "" });
  const [resumeFile, setResumeFile] = useState(null);

  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bio = await getBio();
        setValue("name", bio.name || "");
        setValue("title", bio.title || "");
        setValue("bio", bio.bio || "");
        setValue("email", bio.email || "");
        setValue("phone", bio.phone || "");
        setSkills(bio.skills || []);
        setEducation(bio.education || []);
        setExperience(bio.experience || []);
        setSocial(bio.social || []);
        setValue("resume", bio.resume || "");
      } catch (error) {
        console.error("Failed to fetch bio:", error);
      }
    };
    fetchBio();
  }, [setValue]);

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: "", level: "Basic" });
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    if (
      newEducation.degree.trim() &&
      newEducation.institution.trim() &&
      newEducation.period.trim()
    ) {
      setEducation([...education, newEducation]);
      setNewEducation({ degree: "", institution: "", period: "" });
    }
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    if (
      newExperience.title.trim() &&
      newExperience.company.trim() &&
      newExperience.period.trim()
    ) {
      setExperience([...experience, newExperience]);
      setNewExperience({ title: "", company: "", period: "", description: "" });
    }
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleAddSocial = () => {
    if (newSocial.name.trim() && newSocial.link.trim()) {
      setSocial([...social, newSocial]);
      setNewSocial({ name: "", link: "" });
    }
  };

  const handleRemoveSocial = (index) => {
    setSocial(social.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let resumeUrl = data.resume;
      if (resumeFile) {
        resumeUrl = await uploadFile(resumeFile);
      }
      const bioData = {
        ...data,
        skills,
        education,
        experience,
        social,
        resume: resumeUrl,
      };
      await updateBio(bioData);
      toast.success("Bio updated successfully!");
      onSave(bioData);
    } catch (error) {
      toast.error(`Failed to update bio: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-6 rounded-lg "
    >
      <h3 className="text-2xl font-bold">Bio Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="bio">Bio Description</Label>
          <Textarea
            id="bio"
            {...register("bio", { required: "Bio is required" })}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="resume">Resume (PDF)</Label>
          <Input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
          <p className="text-sm text-gray-500 mt-1">
            Current resume: {resumeFile ? resumeFile.name : "None"}
          </p>
        </div>
        <div>
          <Label>Skills</Label>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={skill.name}
                  onChange={(e) => {
                    const newSkills = [...skills];
                    newSkills[index].name = e.target.value;
                    setSkills(newSkills);
                  }}
                  placeholder="Skill name"
                />
                <Select
                  value={skill.level}
                  onValueChange={(value) => {
                    const newSkills = [...skills];
                    newSkills[index].level = value;
                    setSkills(newSkills);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveSkill(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                placeholder="Skill name"
              />
              <Select
                value={newSkill.level}
                onValueChange={(value) =>
                  setNewSkill({ ...newSkill, level: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddSkill}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
              >
                Add Skill
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Label>Education</Label>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].degree = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="Degree"
                />
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].institution = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="Institution"
                />
                <Input
                  value={edu.period}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].period = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="Period (e.g., 2014-2018)"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                placeholder="Degree"
              />
              <Input
                value={newEducation.institution}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    institution: e.target.value,
                  })
                }
                placeholder="Institution"
              />
              <Input
                value={newEducation.period}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, period: e.target.value })
                }
                placeholder="Period"
              />
              <Button
                onClick={handleAddEducation}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
              >
                Add Education
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Label>Experience</Label>
          <div className="space-y-2">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-2 border p-2 rounded">
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].title = e.target.value;
                    setExperience(newExperience);
                  }}
                  placeholder="Job Title"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].company = e.target.value;
                    setExperience(newExperience);
                  }}
                  placeholder="Company"
                />
                <Input
                  value={exp.period}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].period = e.target.value;
                    setExperience(newExperience);
                  }}
                  placeholder="Period (e.g., 2020-Present)"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].description = e.target.value;
                    setExperience(newExperience);
                  }}
                  placeholder="Description"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="space-y-2 border p-2 rounded">
              <Input
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
                placeholder="Job Title"
              />
              <Input
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                placeholder="Company"
              />
              <Input
                value={newExperience.period}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, period: e.target.value })
                }
                placeholder="Period"
              />
              <Textarea
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              />
              <Button
                onClick={handleAddExperience}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
              >
                Add Experience
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Label>Social Links</Label>
          <div className="space-y-2">
            {social.map((soc, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={soc.name}
                  onChange={(e) => {
                    const newSocial = [...social];
                    newSocial[index].name = e.target.value;
                    setSocial(newSocial);
                  }}
                  placeholder="Platform (e.g., GitHub)"
                />
                <Input
                  value={soc.link}
                  onChange={(e) => {
                    const newSocial = [...social];
                    newSocial[index].link = e.target.value;
                    setSocial(newSocial);
                  }}
                  placeholder="URL"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveSocial(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newSocial.name}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, name: e.target.value })
                }
                placeholder="Platform"
              />
              <Input
                value={newSocial.link}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, link: e.target.value })
                }
                placeholder="URL"
              />
              <Button
                onClick={handleAddSocial}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
              >
                Add Social Link
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: colors.primary,
            color: colors.buttonText,
          }}
        >
          {loading ? "Saving..." : "Save Bio"}
        </Button>
      </form>
    </motion.section>
  );
}

export default BioForm;
