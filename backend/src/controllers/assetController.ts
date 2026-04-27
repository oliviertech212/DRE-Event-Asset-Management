import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllAssets = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { type, status, search } = req.query;

    const where: any = { published: true };

    if (type && type !== 'All') {
      where.type = type as string;
    }

    if (status) {
      where.status = status as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { project: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [assets, total] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { name: true, email: true }
          }
        }
      }),
      prisma.asset.count({ where })
    ]);

    res.json({
      data: assets,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllAssetsAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { type, status, search } = req.query;

    const where: any = {};

    if (type && type !== 'All') {
      where.type = type as string;
    }

    if (status) {
      where.status = status as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { project: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [assets, total] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { name: true, email: true }
          }
        }
      }),
      prisma.asset.count({ where })
    ]);

    res.json({
      data: assets,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAssetById = async (req: Request, res: Response) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: req.params.id },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json(asset);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createAsset = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type,
      project,
      thumbnailUrl,
      assetUrl,
      fileSize,
      status,
      published,
    } = req.body;

    if (!title || !description || !type || !project || !thumbnailUrl) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const asset = await prisma.asset.create({
      data: {
        title,
        description,
        type,
        project,
        thumbnailUrl,
        assetUrl,
        fileSize,
        status: status || 'Draft',
        published: published || false,
        createdById: req.user!.id,
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(asset);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type,
      project,
      thumbnailUrl,
      assetUrl,
      fileSize,
      status,
      published,
    } = req.body;

    const asset = await prisma.asset.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        type,
        project,
        thumbnailUrl,
        assetUrl,
        fileSize,
        status,
        published,
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    res.json(asset);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    await prisma.asset.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Asset deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
