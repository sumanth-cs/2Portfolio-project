import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { updateBio } from "../../api/bio.js";
import { uploadFile } from "../../lib/appwrite/storage.js";
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
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { usePortfolio } from "../../contexts/PortfolioContext.jsx";

function BioForm({ onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
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
  const { portfolioData, refetch } = usePortfolio();

  // Save form data to localStorage with debouncing
  const saveFormToLocalStorage = () => {
    const formValues = {
      name: getValues("name"),
      title: getValues("title"),
      bio: getValues("bio"),
      email: getValues("email"),
      phone: getValues("phone"),
      resume: getValues("resume"),
    };

    const formData = {
      version: 1,
      lastSaved: new Date().toISOString(),
      formValues,
      skills,
      education,
      experience,
      social,
      resumeFile: resumeFile ? resumeFile.name : null,
    };

    localStorage.setItem("bioFormData", JSON.stringify(formData));
  };

  // Debounce function to limit how often we save to localStorage
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSave = debounce(saveFormToLocalStorage, 500);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = () => {
      const savedFormData = localStorage.getItem("bioFormData");
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          if (parsedData.version === 1) {
            reset(parsedData.formValues);
            setSkills(parsedData.skills || []);
            setEducation(parsedData.education || []);
            setExperience(parsedData.experience || []);
            setSocial(parsedData.social || []);
          }
        } catch (e) {
          localStorage.removeItem("bioFormData");
        }
      }
    };

    // First try to load from portfolio data
    if (portfolioData?.bio) {
      reset({
        name: portfolioData.bio.name || "",
        title: portfolioData.bio.title || "",
        bio: portfolioData.bio.bio || "",
        email: portfolioData.bio.email || "",
        phone: portfolioData.bio.phone || "",
        resume: portfolioData.bio.resume || "",
      });
      setSkills(portfolioData.bio.skills || []);
      setEducation(portfolioData.bio.education || []);
      setExperience(portfolioData.bio.experience || []);
      setSocial(portfolioData.bio.social || []);
    } else {
      // Fall back to localStorage if no portfolio data
      loadSavedData();
    }

    // Set up beforeunload handler
    const handleBeforeUnload = () => {
      saveFormToLocalStorage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveFormToLocalStorage();
    };
  }, [portfolioData, reset]);

  // Form field handlers with auto-save
  const handleInputChange = () => {
    debouncedSave();
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: "", level: "Basic" });
      debouncedSave();
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
    debouncedSave();
  };

  const handleAddEducation = () => {
    if (
      newEducation.degree.trim() &&
      newEducation.institution.trim() &&
      newEducation.period.trim()
    ) {
      setEducation([...education, newEducation]);
      setNewEducation({ degree: "", institution: "", period: "" });
      debouncedSave();
    }
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
    debouncedSave();
  };

  const handleAddExperience = () => {
    if (
      newExperience.title.trim() &&
      newExperience.company.trim() &&
      newExperience.period.trim()
    ) {
      setExperience([...experience, newExperience]);
      setNewExperience({ title: "", company: "", period: "", description: "" });
      debouncedSave();
    }
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
    debouncedSave();
  };

  const handleAddSocial = () => {
    if (newSocial.name.trim() && newSocial.link.trim()) {
      setSocial([...social, newSocial]);
      setNewSocial({ name: "", link: "" });
      debouncedSave();
    }
  };

  const handleRemoveSocial = (index) => {
    setSocial(social.filter((_, i) => i !== index));
    debouncedSave();
  };

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    try {
      let resumeUrl = data.resume;
      if (resumeFile) {
        resumeUrl = await uploadFile(resumeFile);
      }

      const bioData = {
        name: data.name,
        title: data.title,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        skills,
        education,
        experience,
        social,
        resume: resumeUrl,
      };

      const response = await updateBio(bioData);
      if (response.success) {
        localStorage.removeItem("bioFormData");
        await refetch();
        toast.success("Bio updated successfully!");
        onSave(bioData);
      } else {
        throw new Error(response.message || "Failed to update bio");
      }
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
      className="space-y-6 bg-gray-100 dark:bg-white p-3 md:p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold">Bio Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full"
              onChange={handleInputChange}
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
              className="w-full"
              onChange={handleInputChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio Description</Label>
          <Textarea
            id="bio"
            {...register("bio", { required: "Bio is required" })}
            className="w-full"
            onChange={handleInputChange}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="w-full"
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              {...register("phone")} 
              className="w-full" 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        <div>
          <Label htmlFor="resume">Resume (PDF)</Label>
          <Input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setResumeFile(e.target.files[0]);
              debouncedSave();
            }}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1 truncate">
            Current resume:{" "}
            {resumeFile
              ? resumeFile.name
              : portfolioData?.bio?.resume?.split("/").pop() || "None"}
          </p>
        </div>

        <div className="space-y-4">
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
                    debouncedSave();
                  }}
                  placeholder="Skill name"
                  className="flex-1"
                />
                <Select
                  value={skill.level}
                  onValueChange={(value) => {
                    const newSkills = [...skills];
                    newSkills[index].level = value;
                    setSkills(newSkills);
                    debouncedSave();
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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
                className="flex-1"
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
                <SelectContent className="bg-white">
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

        <div className="space-y-4">
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
                    debouncedSave();
                  }}
                  placeholder="Degree"
                  className="flex-1"
                />
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].institution = e.target.value;
                    setEducation(newEducation);
                    debouncedSave();
                  }}
                  placeholder="Institution"
                  className="flex-1"
                />
                <Input
                  value={edu.period}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].period = e.target.value;
                    setEducation(newEducation);
                    debouncedSave();
                  }}
                  placeholder="Period (e.g., 2014-2018)"
                  className="flex-1"
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
                className="flex-1"
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
                className="flex-1"
              />
              <Input
                value={newEducation.period}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, period: e.target.value })
                }
                placeholder="Period"
                className="flex-1"
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

        <div className="space-y-4">
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
                    debouncedSave();
                  }}
                  placeholder="Job Title"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].company = e.target.value;
                    setExperience(newExperience);
                    debouncedSave();
                  }}
                  placeholder="Company"
                />
                <Input
                  value={exp.period}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].period = e.target.value;
                    setExperience(newExperience);
                    debouncedSave();
                  }}
                  placeholder="Period (e.g., 2020-Present)"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].description = e.target.value;
                    setExperience(newExperience);
                    debouncedSave();
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

        <div className="space-y-4">
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
                    debouncedSave();
                  }}
                  placeholder="Platform (e.g., GitHub)"
                  className="flex-1"
                />
                <Input
                  value={soc.link}
                  onChange={(e) => {
                    const newSocial = [...social];
                    newSocial[index].link = e.target.value;
                    setSocial(newSocial);
                    debouncedSave();
                  }}
                  placeholder="URL"
                  className="flex-1"
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
                className="flex-1"
              />
              <Input
                value={newSocial.link}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, link: e.target.value })
                }
                placeholder="URL"
                className="flex-1"
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
          className="w-full"
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