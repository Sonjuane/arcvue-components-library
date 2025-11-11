/**
 * Development API Server for ArcVue Components
 * Full-featured Express.js server with CORS, WebSocket, file upload, and auth mock
 */

import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = createServer(app)
const io = new SocketIOServer(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:6006"],
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:6006"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })

// In-memory data store for development
let mockData = {
    users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
    ],
    posts: [
        { id: 1, title: 'First Post', content: 'This is the first post', userId: 1 },
        { id: 2, title: 'Second Post', content: 'This is the second post', userId: 2 },
        { id: 3, title: 'Third Post', content: 'This is the third post', userId: 1 }
    ],
    notifications: []
}

// Authentication mock middleware
const mockAuth = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    // Mock token validation
    if (token === 'mock-admin-token') {
        req.user = { id: 1, role: 'admin' }
    } else if (token === 'mock-user-token') {
        req.user = { id: 2, role: 'user' }
    } else {
        return res.status(401).json({ error: 'Invalid token' })
    }

    next()
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        server: 'ArcVue Development API'
    })
})

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body

    // Mock authentication
    if (email === 'admin@example.com' && password === 'admin') {
        res.json({
            token: 'mock-admin-token',
            user: { id: 1, email, role: 'admin' }
        })
    } else if (email === 'user@example.com' && password === 'user') {
        res.json({
            token: 'mock-user-token',
            user: { id: 2, email, role: 'user' }
        })
    } else {
        res.status(401).json({ error: 'Invalid credentials' })
    }
})

app.post('/api/auth/logout', mockAuth, (req, res) => {
    res.json({ message: 'Logged out successfully' })
})

// Users CRUD
app.get('/api/users', mockAuth, (req, res) => {
    const { page = 1, limit = 10, search } = req.query
    let users = [...mockData.users]

    if (search) {
        users = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + parseInt(limit)
    const paginatedUsers = users.slice(startIndex, endIndex)

    res.json({
        users: paginatedUsers,
        total: users.length,
        page: parseInt(page),
        totalPages: Math.ceil(users.length / limit)
    })
})

app.get('/api/users/:id', mockAuth, (req, res) => {
    const user = mockData.users.find(u => u.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
})

app.post('/api/users', mockAuth, (req, res) => {
    const newUser = {
        id: Math.max(...mockData.users.map(u => u.id)) + 1,
        ...req.body
    }
    mockData.users.push(newUser)
    res.status(201).json(newUser)
})

// Posts CRUD
app.get('/api/posts', (req, res) => {
    const { userId, limit = 10 } = req.query
    let posts = [...mockData.posts]

    if (userId) {
        posts = posts.filter(post => post.userId === parseInt(userId))
    }

    posts = posts.slice(0, parseInt(limit))
    res.json(posts)
})

app.post('/api/posts', mockAuth, (req, res) => {
    const newPost = {
        id: Math.max(...mockData.posts.map(p => p.id)) + 1,
        userId: req.user.id,
        ...req.body,
        createdAt: new Date().toISOString()
    }
    mockData.posts.push(newPost)

    // Emit to WebSocket clients
    io.emit('newPost', newPost)

    res.status(201).json(newPost)
})

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    res.json({
        message: 'File uploaded successfully',
        file: {
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            url: `/uploads/${req.file.filename}`
        }
    })
})

// WebSocket notifications
app.post('/api/notifications', mockAuth, (req, res) => {
    const notification = {
        id: Date.now(),
        userId: req.user.id,
        message: req.body.message,
        type: req.body.type || 'info',
        timestamp: new Date().toISOString()
    }

    mockData.notifications.push(notification)
    io.emit('notification', notification)

    res.status(201).json(notification)
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join-room', (room) => {
        socket.join(room)
        console.log(`Client ${socket.id} joined room: ${room}`)
    })

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            ...data,
            timestamp: new Date().toISOString()
        })
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
server.listen(PORT, () => {
    console.log(`🚀 ArcVue Development API Server running on http://localhost:${PORT}`)
    console.log(`📚 Available endpoints:`)
    console.log(`   GET  /api/health`)
    console.log(`   POST /api/auth/login`)
    console.log(`   GET  /api/users`)
    console.log(`   GET  /api/posts`)
    console.log(`   POST /api/upload`)
    console.log(`   WebSocket support enabled`)
})