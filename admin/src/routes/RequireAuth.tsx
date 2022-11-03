import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
	component: React.ComponentType<any>;
}

export default function RequireAuth({ component: Component }: RequireAuthProps) {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	return isLoggedIn ? <Component /> : <Navigate to='/auth' replace />;
}
