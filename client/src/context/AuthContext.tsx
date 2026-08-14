import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role | 'Guest';
  login: (userData: User) => void;
  switchRole: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<Role, User> = {
  CEO: {
    id: 'usr-ceo-1',
    name: 'Subhasis Roy (CEO)',
    email: 'ceo@websums.com',
    role: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98000 00001'
  },
  Mentor: {
    id: 'usr-mentor-1',
    name: 'Dr. Rajesh Verma',
    email: 'mentor@websums.com',
    role: 'Mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98000 11122',
    domain: 'MERN Stack Development'
  },
  Student: {
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'student@websums.com',
    role: 'Student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    domain: 'MERN Stack Development',
    batch: 'Batch W-2026-A'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('websums_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('websums_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('websums_user');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const switchRole = (newRole: Role) => {
    setUser(DEMO_USERS[newRole]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'Guest',
        login,
        switchRole,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
