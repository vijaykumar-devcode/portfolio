import type { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single project by slug
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (project) {
      res.status(200).json({
        success: true,
        message: 'Project fetched successfully',
        data: project,
      });
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = new Project(req.body);
    const createdProject = await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: createdProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject,
      });
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
        data: {},
      });
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  } catch (error) {
    next(error);
  }
};
