"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface HeroProps {
  locale?: Locale
}

export default function Hero({ locale = "pt" }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const t = getTranslations(locale)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Different technical themes with specific versions and technologies
  const technicalThemes = [
    {
      name: locale === "pt" ? "Desenvolvimento Frontend" : "Frontend Development",
      code: [
        "// ========================================",
        "// FRONTEND ARCHITECTURE - REACT ECOSYSTEM",
        "// ========================================",
        "// React 18.2.0 + Next.js 14.1.0 + TypeScript 5.3.3",
        "",
        "import React, { useState, useEffect, useCallback } from 'react'",
        "import { NextPage, GetStaticProps } from 'next'",
        "import { motion, AnimatePresence } from 'framer-motion'",
        "import { useQuery, useMutation } from '@tanstack/react-query'",
        "",
        "// State Management with Zustand 4.4.7",
        "interface AppState {",
        "  theme: 'light' | 'dark' | 'cyberpunk'",
        "  user: User | null",
        "  isLoading: boolean",
        "}",
        "",
        "// Custom Hooks & Performance Optimization",
        "const useOptimizedRender = () => {",
        "  const [renderCount, setRenderCount] = useState(0)",
        "  return useCallback(() => {",
        "    setRenderCount(prev => prev + 1)",
        "  }, [])",
        "}",
        "",
        "// Tailwind CSS 3.4.1 + CSS-in-JS",
        "const StyledComponent = styled.div`",
        "  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
        "  box-shadow: 0 10px 30px rgba(0,0,0,0.3);",
        "  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);",
        "`",
        "",
        "// PWA + Service Worker Implementation",
        "if ('serviceWorker' in navigator) {",
        "  navigator.serviceWorker.register('/sw.js')",
        "}",
        "",
        "console.log('🎨 Frontend stack initialized!')"
      ]
    },
    {
      name: locale === "pt" ? "Desenvolvimento Backend" : "Backend Development",
      code: [
        "// ========================================",
        "// BACKEND ARCHITECTURE - NODE.JS ECOSYSTEM",
        "// ========================================",
        "// Node.js 20.11.0 + Express 4.18.2 + TypeScript",
        "",
        "import express, { Request, Response, NextFunction } from 'express'",
        "import { PrismaClient } from '@prisma/client'",
        "import Redis from 'ioredis'",
        "import jwt from 'jsonwebtoken'",
        "import bcrypt from 'bcryptjs'",
        "",
        "// Database Configuration - PostgreSQL 15.5",
        "const prisma = new PrismaClient({",
        "  log: ['query', 'info', 'warn', 'error'],",
        "  datasources: {",
        "    db: { url: process.env.DATABASE_URL }",
        "  }",
        "})",
        "",
        "// Redis Cache Layer - Redis 7.2.4",
        "const redis = new Redis({",
        "  host: process.env.REDIS_HOST,",
        "  port: parseInt(process.env.REDIS_PORT || '6379'),",
        "  retryDelayOnFailover: 100",
        "})",
        "",
        "// JWT Authentication Middleware",
        "const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {",
        "  const token = req.header('Authorization')?.replace('Bearer ', '')",
        "  if (!token) return res.status(401).json({ error: 'Access denied' })",
        "  ",
        "  try {",
        "    const decoded = jwt.verify(token, process.env.JWT_SECRET!)",
        "    req.user = decoded",
        "    next()",
        "  } catch (error) {",
        "    res.status(403).json({ error: 'Invalid token' })",
        "  }",
        "}",
        "",
        "console.log('🚀 Backend services running on port 3001')"
      ]
    },
    {
      name: "DevOps & Cloud",
      code: [
        "# ========================================",
        "# DEVOPS PIPELINE - AWS CLOUD INFRASTRUCTURE",
        "# ========================================",
        "# Docker 24.0.7 + Kubernetes 1.29.1 + Terraform 1.7.0",
        "",
        "# Dockerfile - Multi-stage build",
        "FROM node:20-alpine AS builder",
        "WORKDIR /app",
        "COPY package*.json ./",
        "RUN npm ci --only=production",
        "",
        "FROM node:20-alpine AS runner",
        "WORKDIR /app",
        "COPY --from=builder /app/node_modules ./node_modules",
        "COPY . .",
        "EXPOSE 3000",
        "CMD [\"npm\", \"start\"]",
        "",
        "# Kubernetes Deployment",
        "apiVersion: apps/v1",
        "kind: Deployment",
        "metadata:",
        "  name: tutankhamal-portfolio",
        "spec:",
        "  replicas: 3",
        "  selector:",
        "    matchLabels:",
        "      app: portfolio",
        "  template:",
        "    spec:",
        "      containers:",
        "      - name: portfolio",
        "        image: tutankhamal/portfolio:latest",
        "        ports:",
        "        - containerPort: 3000",
        "",
        "# AWS ECS + CloudFormation",
        "aws ecs create-cluster --cluster-name production",
        "aws ecs register-task-definition --cli-input-json file://task-def.json",
        "",
        "echo '☁️ Cloud infrastructure deployed successfully!'"
      ]
    },
    {
      name: "Database & APIs",
      code: [
        "-- ========================================",
        "-- DATABASE ARCHITECTURE - POSTGRESQL + MONGODB",
        "-- ========================================",
        "-- PostgreSQL 15.5 + MongoDB 7.0.5 + Prisma ORM",
        "",
        "-- User Management Schema",
        "CREATE TABLE users (",
        "  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),",
        "  email VARCHAR(255) UNIQUE NOT NULL,",
        "  password_hash VARCHAR(255) NOT NULL,",
        "  profile JSONB,",
        "  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),",
        "  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()",
        ");",
        "",
        "-- Indexes for Performance",
        "CREATE INDEX idx_users_email ON users(email);",
        "CREATE INDEX idx_users_created_at ON users(created_at);",
        "",
        "// MongoDB Aggregation Pipeline",
        "db.projects.aggregate([",
        "  { $match: { status: 'active' } },",
        "  { $lookup: {",
        "      from: 'technologies',",
        "      localField: 'tech_stack',",
        "      foreignField: '_id',",
        "      as: 'technologies'",
        "    }",
        "  },",
        "  { $group: {",
        "      _id: '$category',",
        "      count: { $sum: 1 },",
        "      projects: { $push: '$$ROOT' }",
        "    }",
        "  }",
        "])",
        "",
        "// GraphQL Schema Definition",
        "type Query {",
        "  projects(filter: ProjectFilter): [Project!]!",
        "  user(id: ID!): User",
        "}",
        "",
        "console.log('🗄️ Database connections established!')"
      ]
    }
  ]

  const currentTheme = technicalThemes[currentThemeIndex]
  const complexCode = currentTheme.code

  // Animate through lines of current theme
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % complexCode.length)
    }, 200)

    return () => clearInterval(interval)
  }, [complexCode.length])

  // Switch between themes every 15 seconds
  useEffect(() => {
    const themeInterval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % technicalThemes.length)
      setCurrentLineIndex(0) // Reset line index when switching themes
    }, 15000)

    return () => clearInterval(themeInterval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-20"
      style={{
        background: "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%), #0a0a0a",
      }}
    >
      {/* Cyber Grid Background */}
      <div className="cyber-grid"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={`text-center lg:text-left ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 hero-glitch-fix">
              <span className="text-white glitch-matrix glitch-scanlines" data-text={`${t.hero.title} ${t.hero.subtitle}`}>
                {t.hero.title} <span className="text-gradient">{t.hero.subtitle}</span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#cccccc] mb-6 font-light tracking-wide">{t.hero.role}</p>

            <p className="text-lg text-[#888888] mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">{t.hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.viewProjects}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide bg-transparent"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.contact}
              </Button>
            </div>
          </div>

          {/* Cyberpunk Console Terminal */}
          <div className={`flex justify-center ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative w-full max-w-lg">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-cyan)] via-[var(--primary-magenta)] to-[var(--primary-cyan)] rounded-lg blur-sm opacity-75 animate-pulse"></div>
              
              {/* Terminal Container */}
              <div className="relative">
                <div
                    className="w-full h-96 border-2 border-[var(--primary-cyan)] rounded-lg overflow-hidden cyber-border"
                    style={{
                      background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
                      backdropFilter: "blur(15px)",
                      boxShadow: "inset 0 0 50px var(--primary-cyan)/10, 0 0 50px var(--primary-cyan)/30, 0 0 100px var(--primary-magenta)/20"
                    }}
                  >
                  {/* Terminal Header */}
                  <div className="bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border-b-2 border-[var(--primary-cyan)]/50 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgb(239,68,68)] animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--primary-yellow)] shadow-[0_0_10px_var(--primary-yellow)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--accent-green)] shadow-[0_0_10px_var(--accent-green)] animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                    <div className="flex-1 text-center">
                       <div className="flex flex-col items-center">
                         <span className="text-[var(--primary-cyan)] text-sm font-mono font-bold tracking-wider">TUTANKHAMAL_DEV_TERMINAL_v2.0</span>
                         <span className="text-[var(--primary-magenta)] text-xs font-mono animate-pulse mt-1">
                           [{currentTheme.name.toUpperCase()}]
                         </span>
                       </div>
                     </div>
                    <div className="text-[var(--accent-green)] text-xs font-mono animate-pulse">●ONLINE</div>
                  </div>
                  
                  {/* Scanlines Effect */}
                   <div className="absolute inset-0 pointer-events-none opacity-20">
                     <div className="h-full w-full" style={{
                       background: "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--primary-cyan)/10 2px, var(--primary-cyan)/10 4px)"
                     }}></div>
                   </div>
                  
                  {/* Terminal Content */}
                  <div className="relative p-4 h-full overflow-hidden">
                    <div className="font-mono text-xs leading-relaxed h-full overflow-hidden">
                      {complexCode.map((line, index) => {
                        const isVisible = index <= currentLineIndex
                        const isCurrentLine = index === currentLineIndex
                        
                        return (
                          <div
                            key={index}
                            className={`transition-all duration-300 transform ${
                               isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                             } ${
                               line.startsWith('//') ? 'text-[var(--text-muted)]' :
                               line.includes('interface') || line.includes('class') || line.includes('async') ? 'text-[var(--primary-magenta)] font-semibold' :
                               line.includes('private') || line.includes('readonly') || line.includes('const') ? 'text-[var(--primary-cyan)]' :
                               line.includes('function') || line.includes('return') ? 'text-[var(--accent-purple)]' :
                               line.includes(':') && !line.includes('//') ? 'text-[var(--accent-blue)]' :
                               line.includes('{') || line.includes('}') ? 'text-[var(--primary-yellow)]' :
                               line.includes('[') || line.includes(']') ? 'text-[var(--accent-green)]' :
                               'text-[var(--text-secondary)]'
                             } ${
                               isCurrentLine ? 'scale-105' : ''
                             }`}
                             style={{
                               textShadow: isCurrentLine ? '0 0 10px var(--primary-cyan)' : 'none',
                               boxShadow: isCurrentLine ? '0 0 10px var(--primary-cyan)/50' : 'none',
                               transitionDelay: `${index * 20}ms`
                             }}
                          >
                            <span className="inline-block w-8 text-[var(--text-muted)] text-right mr-2 select-none">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {line || '\u00A0'}
                            {isCurrentLine && (
                               <span className="inline-block w-2 h-4 bg-gradient-to-b from-[var(--primary-cyan)] to-[var(--primary-magenta)] ml-1 animate-pulse" style={{boxShadow: '0 0 10px var(--primary-cyan)'}}></span>
                             )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Matrix Rain Effect */}
                    <div className="absolute top-0 right-0 w-8 h-full opacity-30 pointer-events-none">
                      <div className="h-full flex flex-col justify-around text-[var(--primary-cyan)] text-xs font-mono animate-pulse">
                        <span>01</span>
                        <span>10</span>
                        <span>11</span>
                        <span>00</span>
                        <span>01</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#888888] animate-bounce-slow">
        <span className="text-xs tracking-widest mb-2">{t.hero.scroll}</span>
        <ChevronDown size={20} />
      </div>
    </section>
  )
}
