import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { createProject, getProjects, updateProject, deleteProject } from '../../api/projects.js';
import { uploadFile } from '../../api/upload.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-hot-toast';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';
import { AuthContext } from '@/contexts/AuthContext.jsx';

function ProjectForm({ onSave }) {
  const { colors } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.projects || []);
    } catch (error) {
      toast.error('Failed to load projects');
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = data.image || '';
      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }
      const projectData = {
        ...data,
        image: imageUrl,
        tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [],
      };
      let response;
      if (editingId) {
        response = await updateProject({ id: editingId, ...projectData });
      } else {
        response = await createProject(projectData);
      }
      setProjects((prev) =>
        editingId
          ? prev.map((p) => (p._id === editingId ? response.project : p))
          : [...prev, response.project]
      );
      reset();
      setEditingId(null);
      setImageFile(null);
      onSave(response.project);
      toast.success('Project saved');
    } catch (error) {
      toast.error(`Failed to save project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setValue('title', project.title || '');
    setValue('description', project.description || '');
    setValue('image', project.image || '');
    setValue('tags', project.tags?.join(', ') || '');
    setValue('liveUrl', project.liveUrl || '');
    setValue('codeUrl', project.codeUrl || '');
    setEditingId(project._id);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Project Title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Project Description"
              {...register('description')}
            />
          </div>
          <div>
            <Label htmlFor="image">Project Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {editingId && (
              <p className="text-sm text-gray-500 mt-1">
                Current image: {projects.find((p) => p._id === editingId)?.image}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="React, Node.js, MongoDB"
              {...register('tags')}
            />
          </div>
          <div>
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              placeholder="https://project.com"
              {...register('liveUrl')}
            />
          </div>
          <div>
            <Label htmlFor="codeUrl">Code URL</Label>
            <Input
              id="codeUrl"
              placeholder="https://github.com/project"
              {...register('codeUrl')}
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              color: colors.buttonText,
            }}
          >
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'} Project
          </Button>
        </form>
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex justify-between p-3 border rounded"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm">{project.description}</p>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.buttonText,
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project._id)}
                  className="ml-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.buttonText,
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectForm;