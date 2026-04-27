import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { category, status, search } = req.query;

    const where: any = { published: true };

    if (category && category !== 'All') {
      where.category = category as string;
    }

    if (status) {
      where.status = status as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
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
      prisma.event.count({ where })
    ]);

    res.json({
      data: events,
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

export const getAllEventsAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { category, status, search } = req.query;

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category as string;
    }

    if (status) {
      where.status = status as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
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
      prisma.event.count({ where })
    ]);

    res.json({
      data: events,
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

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      gallery,
      startDate,
      endDate,
      time,
      location,
      venue,
      address,
      email,
      phone,
      website,
      maxParticipants,
      status,
      published,
    } = req.body;

    if (!title || !description || !category || !imageUrl || !startDate || !endDate || !time || !location || !venue || !address || !email || !phone) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        gallery: gallery || [],
        startDate,
        endDate,
        time,
        location,
        venue,
        address,
        email,
        phone,
        website,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
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

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      gallery,
      startDate,
      endDate,
      time,
      location,
      venue,
      address,
      email,
      phone,
      website,
      maxParticipants,
      participants,
      status,
      published,
    } = req.body;

    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        category,
        imageUrl,
        gallery,
        startDate,
        endDate,
        time,
        location,
        venue,
        address,
        email,
        phone,
        website,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
        participants: participants ? parseInt(participants) : undefined,
        status,
        published,
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await prisma.event.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
