
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Bell, Settings, User, LogOut, Menu, BookOpen, Brain } from 'lucide-react';

export const ProfessionalHeader = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">NeuroLearn</h1>
                <p className="text-xs text-slate-500 font-medium">Educational Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Dashboard
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Learning Paths
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Resources
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Support
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-slate-100">
                  <Avatar className="h-10 w-10 border-2 border-slate-200">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      AS
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-slate-200 shadow-lg rounded-xl p-2" align="end">
                <div className="flex items-center space-x-3 p-3 border-b border-slate-100">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-800">Alex Student</p>
                    <p className="text-sm text-slate-500">Grade 8</p>
                  </div>
                </div>
                <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-700">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-700">My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <Settings className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-700">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-slate-100" />
                <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu trigger */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100">
              <Menu className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
