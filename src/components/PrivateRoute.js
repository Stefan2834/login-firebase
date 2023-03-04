import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element}) {
  const { currentUser } = useAuth()

  return currentUser ? (
    <Element />
  ) : (
    <Navigate to="/" replace />
  );
}
