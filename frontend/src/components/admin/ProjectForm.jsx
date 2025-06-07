import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { createProject, getProjects, updateProject } from '../../api/projects.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-hot-toast';

function ProjectForm({ onSave }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    }
  };

  const onSubmit = async (data) => {
    try {
      const projectData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      };
      let project;
      if (editingId) {
        project = await updateProject({ id: editingId, ...projectData });
      } else {
        project = await createProject(projectData);
      }
      setProjects((prev) =>
        editingId
          ? prev.map((p) => (p._id === editingId ? project : p))
          : [...prev, project]
      );
      reset();
      setEditingId(null);
      onSave(project);
      toast.success('Project saved');
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleEdit = (project) => {
    reset({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags?.join(', '),
      liveUrl: project.liveUrl,
      codeUrl: project.codeUrl,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      // Add deleteProject API if needed
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
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
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
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              {...register('image')}
            />
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
          <Button type="submit" className="bg-primary text-white">
            {editingId ? 'Update' : 'Add'} Project
          </Button>
        </form>
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project._id} className="flex justify-between p-3 border rounded">
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm">{project.description}</p>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project._id)}
                  className="ml-2"
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